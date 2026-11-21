import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from main import count, fetch_author, main, parse_page, validate_previous, write_results


def profile(pub_id="example:one", cited="1,234", more=False):
    return f'''<div id="gsc_prf_in">Example Author</div>
    <table id="gsc_rsb_st"><tbody>
    <tr><td class="gsc_rsb_std">1,234</td><td class="gsc_rsb_std">100</td></tr>
    <tr><td class="gsc_rsb_std">7</td><td class="gsc_rsb_std">6</td></tr>
    <tr><td class="gsc_rsb_std">5</td><td class="gsc_rsb_std">4</td></tr>
    </tbody></table><table><tr class="gsc_a_tr"><td>
    <a class="gsc_a_at" href="/citations?user=example&amp;citation_for_view={pub_id}">A &amp; B</a>
    <div class="gs_gray">A Author, B Author</div><div class="gs_gray">Journal, 2026</div>
    </td><td><a class="gsc_a_ac">{cited}</a></td><td class="gsc_a_y">2026</td></tr></table>
    <button id="gsc_bpf_more" {'' if more else 'disabled'}>Show more</button>'''


class ScholarTests(unittest.TestCase):
    def test_counts_and_profile(self):
        author, pubs, more = parse_page(profile(), "example")
        self.assertEqual(author["citedby"], 1234)
        self.assertEqual(pubs["example:one"]["bib"]["title"], "A & B")
        self.assertEqual(pubs["example:one"]["num_citations"], 1234)
        self.assertFalse(more)
        self.assertEqual(count("12*"), 12)
        with self.assertRaises(ValueError):
            count("unavailable")

    def test_uncited_and_wrong_profile(self):
        _, pubs, _ = parse_page(profile(cited=""), "example")
        self.assertEqual(pubs["example:one"]["num_citations"], 0)
        with self.assertRaises(ValueError):
            parse_page(profile(), "different")

    def test_blocked_and_partial_pages_rejected(self):
        for html in ("<html>Please complete CAPTCHA</html>", profile().replace('id="gsc_bpf_more"', ''),
                     profile().replace('class="gsc_a_ac"', '')):
            with self.assertRaises(ValueError):
                parse_page(html, "example")

    def test_pagination(self):
        urls = []
        def loader(url):
            urls.append(url)
            return profile("example:two", more=False) if "cstart=100" in url else profile(more=True)
        author = fetch_author("example", loader=loader, sleep=lambda _: None)
        self.assertEqual(set(author["publications"]), {"example:one", "example:two"})
        self.assertEqual(len(urls), 2)

    def test_repeated_page_and_bounded_retries(self):
        with self.assertRaises(RuntimeError):
            fetch_author("example", loader=lambda _: profile(more=True), sleep=lambda _: None)

    def test_failed_refresh_keeps_previous_files(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            original = '{"message": "226"}'
            (output / "gs_data_shieldsio.json").write_text(original, encoding="utf-8")
            with patch("sys.argv", ["main.py", "--output-dir", directory]), \
                 patch.dict("os.environ", {"GOOGLE_SCHOLAR_ID": "example"}), \
                 patch("main.fetch_author", side_effect=RuntimeError("blocked")):
                with self.assertRaises(RuntimeError):
                    main()
            self.assertEqual((output / "gs_data_shieldsio.json").read_text(), original)

    def test_consistent_outputs_and_missing_publication_guard(self):
        author = fetch_author("example", loader=lambda _: profile(), sleep=lambda _: None)
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            write_results(author, output)
            data = json.loads((output / "gs_data.json").read_text())
            badge = json.loads((output / "gs_data_shieldsio.json").read_text())
            self.assertEqual(str(data["citedby"]), badge["message"])
        with self.assertRaises(ValueError):
            validate_previous(author, {"scholar_id": "example", "publications": dict.fromkeys(range(10))})


if __name__ == "__main__":
    unittest.main()
