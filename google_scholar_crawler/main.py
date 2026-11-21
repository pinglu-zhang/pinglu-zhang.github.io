#!/usr/bin/env python3
"""Refresh the public Scholar profile; publish only complete, validated data."""
import argparse
import json
import os
from pathlib import Path
import re
import time
from datetime import datetime, timezone
from urllib.parse import parse_qs, urlencode, urlparse
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup


def count(text):
    value = text.strip().replace(",", "").removesuffix("*")
    if not re.fullmatch(r"\d+", value):
        raise ValueError(f"Invalid citation count: {text!r}")
    return int(value)


def parse_page(html, author_id, first_page=True):
    soup = BeautifulSoup(html, "html.parser")
    author = {}
    if first_page:
        name = soup.select_one("#gsc_prf_in")
        rows = soup.select("#gsc_rsb_st tbody tr")
        if not name or len(rows) != 3:
            raise ValueError("Scholar profile/statistics missing (blocked or changed HTML)")
        author = {"scholar_id": author_id, "name": name.get_text(" ", strip=True)}
        for row, key in zip(rows, ("citedby", "hindex", "i10index")):
            cells = row.select(".gsc_rsb_std")
            if len(cells) != 2:
                raise ValueError("Incomplete Scholar statistics")
            author[key] = count(cells[0].get_text())
            author[key + "5y"] = count(cells[1].get_text())
    publications = {}
    for row in soup.select(".gsc_a_tr"):
        title = row.select_one(".gsc_a_at")
        citations = row.select_one(".gsc_a_ac")
        year = row.select_one(".gsc_a_y")
        details = row.select(".gs_gray")
        if title is None or citations is None or year is None or len(details) < 2:
            raise ValueError("Incomplete publication row")
        pub_id = parse_qs(urlparse(title.get("href", "")).query).get("citation_for_view", [""])[0]
        if not pub_id.startswith(author_id + ":") or pub_id in publications:
            raise ValueError("Wrong author or duplicate publication ID")
        cited_text = citations.get_text(strip=True)
        publications[pub_id] = {
            "author_pub_id": pub_id,
            "bib": {"title": title.get_text(" ", strip=True),
                    "author": details[0].get_text(" ", strip=True),
                    "citation": details[1].get_text(" ", strip=True),
                    "pub_year": year.get_text(strip=True)},
            # Scholar leaves the citation cell empty for uncited publications.
            "num_citations": count(cited_text) if cited_text else 0,
        }
    more = soup.select_one("#gsc_bpf_more")
    if not publications or more is None:
        raise ValueError("Publication list or pagination control missing")
    return author, publications, not more.has_attr("disabled")


def download(url):
    request = Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept-Language": "en-US,en;q=0.9"})
    with urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8")


def fetch_author(author_id, loader=download, sleep=time.sleep):
    errors = []
    for attempt in range(2):
        for host in ("scholar.google.com.hk", "scholar.google.com"):
            try:
                publications = {}
                for page in range(20):
                    query = urlencode({"user": author_id, "hl": "en", "pagesize": 100,
                                       "sortby": "pubdate", "cstart": page * 100})
                    url = f"https://{host}/citations?{query}"
                    basics, batch, more = parse_page(loader(url), author_id, first_page=page == 0)
                    if page == 0:
                        author = basics
                        author["source_url"] = url
                    if publications.keys() & batch.keys():
                        raise ValueError("Repeated pagination results; refusing partial data")
                    publications.update(batch)
                    if not more:
                        author["publications"] = publications
                        author["updated"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
                        return author
                    sleep(1)
                raise ValueError("Profile exceeds pagination limit; refusing partial data")
            except Exception as error:
                errors.append(f"{host}: {error}")
                print(f"Attempt {attempt + 1}: {errors[-1]}", flush=True)
        if attempt == 0:
            sleep(10)
    raise RuntimeError("Scholar refresh failed; previous data retained. " + "; ".join(errors))


def validate_previous(author, previous):
    if previous is None:
        return
    if previous.get("scholar_id") != author["scholar_id"]:
        raise ValueError("Previous data belongs to a different Scholar profile")
    old_count = len(previous.get("publications", {}))
    if len(author["publications"]) < old_count * 0.8:
        raise ValueError("Over 20% of publications disappeared; refusing to overwrite previous data")


def write_results(author, output):
    output.mkdir(parents=True, exist_ok=True)
    badge = {"schemaVersion": 1, "label": "citations", "message": str(author["citedby"]), "cacheSeconds": 3600}
    for filename, data in (("gs_data.json", author), ("gs_data_shieldsio.json", badge)):
        temp = output / (filename + ".tmp")
        temp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        temp.replace(output / filename)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=Path, default=Path("results"))
    parser.add_argument("--previous", type=Path)
    args = parser.parse_args()
    author_id = os.environ.get("GOOGLE_SCHOLAR_ID", "").strip()
    if not re.fullmatch(r"[A-Za-z0-9_-]+", author_id):
        parser.error("Set GOOGLE_SCHOLAR_ID to the public profile ID")
    previous = json.loads(args.previous.read_text(encoding="utf-8")) if args.previous else None
    author = fetch_author(author_id)
    validate_previous(author, previous)
    write_results(author, args.output_dir)
    print(f"Updated {author['name']}: {author['citedby']} citations, {len(author['publications'])} publications", flush=True)


if __name__ == "__main__":
    main()
