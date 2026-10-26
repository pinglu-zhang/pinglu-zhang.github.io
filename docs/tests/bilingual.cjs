// Run after `bundle exec jekyll build` and starting a local static server.
// Requires Playwright + a Chromium browser. Example:
// PREVIEW_URL=http://localhost:4000 node docs/tests/bilingual.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const origin = process.env.PREVIEW_URL || 'http://localhost:4000';
const repo = path.resolve(__dirname, '../..');
const paperIds = [...fs.readFileSync(path.join(repo, '_site/index.html'), 'utf8')
  .matchAll(/class=['"]show_paper_citations['"] data=['"]([^'"]+)/g)].map(m => m[1]);
const expectedSections = ['about-me', '-news', '-fundings', '-publications', '-awards', '-educations'];
const localFailures = [];
const jsErrors = [];
let passed = 0;

async function main() {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge' });
  async function context(options = {}) {
    const ctx = await browser.newContext({ locale: options.locale || 'en-US', javaScriptEnabled: options.js !== false,
      viewport: options.viewport || { width: 1440, height: 1000 } });
    await ctx.addInitScript(({ languages, saved, blocked }) => {
      if (languages) Object.defineProperty(navigator, 'languages', { get: () => languages });
      if (saved && /^https?:$/.test(location.protocol)) localStorage.setItem('pinglu-site-language', saved);
      if (blocked) Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage unavailable'); } });
    }, options);
    await ctx.route('**/*', async route => {
      if (new URL(route.request().url()).origin === new URL(origin).origin) return route.continue();
      if (route.request().url().endsWith('/gs_data.json')) {
        // Deliberately omit one entry: a missing paper must not break subsequent counts.
        const publications = Object.fromEntries(paperIds.slice(1).map((id, i) => [id, { num_citations: i }]));
        return route.fulfill({ json: { publications } });
      }
      if (route.request().resourceType() === 'image') return route.fulfill({
        contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>'
      });
      return route.fulfill({ body: '' });
    });
    ctx.on('page', page => {
      page.on('pageerror', e => jsErrors.push(e.message));
      page.on('response', response => {
        if (response.url().startsWith(origin) && response.status() >= 400) localFailures.push(response.url());
      });
    });
    return ctx;
  }
  async function atLanguage(page, language) {
    await page.waitForURL(url => url.pathname === (language === 'zh' ? '/zh/' : '/'));
    await page.waitForFunction(lang => document.documentElement.lang === lang &&
      document.querySelectorAll('.show_paper_citations').length === 17, language === 'zh' ? 'zh-CN' : 'en');
    await page.waitForLoadState('load');
  }
  async function check(name, test) {
    await test(); passed++; console.log('PASS ' + name);
  }
  try {
    assert.equal(paperIds.length, 17);
    const cases = [
      ['Chinese browser', { languages: ['zh-CN'] }, '/', 'zh'],
      ['Traditional Chinese preference uses Simplified Chinese', { languages: ['zh-TW'] }, '/', 'zh'],
      ['English browser', { languages: ['en-US'] }, '/', 'en'],
      ['First supported preference', { languages: ['fr-FR', 'zh-CN', 'en'] }, '/', 'zh'],
      ['English takes precedence when listed first', { languages: ['en-GB', 'zh-CN'] }, '/zh/', 'en'],
      ['Unsupported languages fall back to English', { languages: ['fr-FR', 'de-DE'] }, '/zh/', 'en'],
      ['Saved English overrides direct Chinese URL', { saved: 'en', languages: ['zh'] }, '/zh/', 'en'],
      ['Saved Chinese overrides English root', { saved: 'zh', languages: ['en'] }, '/', 'zh'],
      ['Explicit choice overrides saved preference', { saved: 'en', languages: ['en'] }, '/?lang=zh', 'zh'],
      ['Explicit English overrides Chinese browser', { languages: ['zh'] }, '/zh/?lang=en', 'en'],
      ['Invalid choice is ignored', { languages: ['zh'] }, '/?lang=invalid', 'zh'],
      ['Unavailable storage still permits automatic choice', { blocked: true, languages: ['zh'] }, '/', 'zh']
    ];
    for (const [name, opts, start, language] of cases) await check(name, async () => {
      const ctx = await context(opts); const page = await ctx.newPage();
      await page.goto(origin + start); await atLanguage(page, language);
      assert.equal(await page.locator('[data-language-switch][aria-current="true"]').getAttribute('data-language-switch'), language);
      if (!opts.saved && !opts.blocked && !start.includes('lang=zh') && !start.includes('lang=en')) {
        assert.equal(await page.evaluate(() => localStorage.getItem('pinglu-site-language')), null);
      }
      await ctx.close();
    });

    await check('Manual choice persists, stays in one tab and preserves query + anchor', async () => {
      const ctx = await context({ languages: ['zh'] }); const page = await ctx.newPage();
      await page.goto(origin + '/?source=review#-publications'); await atLanguage(page, 'zh');
      await page.locator('[data-language-switch="en"]').click(); await atLanguage(page, 'en');
      assert.equal(new URL(page.url()).searchParams.get('source'), 'review');
      assert.equal(new URL(page.url()).searchParams.get('lang'), 'en');
      assert.equal(new URL(page.url()).hash, '#-publications');
      assert.equal(ctx.pages().length, 1);
      await page.reload(); await atLanguage(page, 'en');
      await page.goto(origin + '/zh/'); await atLanguage(page, 'en');
      const next = await ctx.newPage(); await next.goto(origin); await atLanguage(next, 'en');
      await ctx.close();
    });
    await check('Manual choice survives unavailable storage and refresh', async () => {
      const ctx = await context({ blocked: true, languages: ['zh'] }); const page = await ctx.newPage();
      await page.goto(origin); await atLanguage(page, 'zh');
      await page.locator('[data-language-switch="en"]').click(); await atLanguage(page, 'en');
      await page.reload(); await atLanguage(page, 'en'); assert.equal(ctx.pages().length, 1);
      await ctx.close();
    });
    for (const section of ['-publications', '-educations']) await check('Scroll-derived section: ' + section, async () => {
      const ctx = await context(); const page = await ctx.newPage(); await page.goto(origin);
      await page.locator('#' + section).evaluate(el => el.scrollIntoView({ block: 'start' }));
      await page.locator('[data-language-switch="zh"]').click(); await atLanguage(page, 'zh');
      assert.equal(new URL(page.url()).hash, '#' + section);
      const position = await page.locator('#' + section).boundingBox();
      const header = await page.locator('.masthead').boundingBox();
      assert.ok(position.y >= header.height - 1 && position.y < 1000, 'Target section is visible below the sticky navigation');
      await ctx.close();
    });
    await check('Back does not enter an automatic redirect loop', async () => {
      const ctx = await context({ languages: ['zh'] }); const page = await ctx.newPage();
      await page.goto(origin); await atLanguage(page, 'zh');
      await page.locator('[data-language-switch="en"]').click(); await atLanguage(page, 'en');
      let navigations = 0; page.on('framenavigated', frame => { if (frame === page.mainFrame()) navigations++; });
      await page.goBack(); await atLanguage(page, 'en'); await page.waitForTimeout(200);
      assert.ok(navigations <= 2, 'Only the back navigation and one preference redirect are allowed');
      await ctx.close();
    });
    await check('No JavaScript: static content and same-tab language links', async () => {
      const ctx = await context({ js: false, locale: 'zh-CN' }); const page = await ctx.newPage();
      await page.goto(origin); assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      await page.locator('[data-language-switch="zh"]').click();
      assert.equal(await page.locator('html').getAttribute('lang'), 'zh-CN');
      await page.locator('[data-language-switch="en"]').click();
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      assert.equal(ctx.pages().length, 1); await ctx.close();
    });
    await check('Restoring a cached page rechecks the saved preference', async () => {
      const ctx = await context(); const page = await ctx.newPage(); await page.goto(origin);
      await page.evaluate(() => {
        localStorage.setItem('pinglu-site-language', 'zh');
        window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
      });
      await atLanguage(page, 'zh'); await ctx.close();
    });

    const data = {};
    for (const language of ['en', 'zh']) await check('Content, anchors, assets and citations: ' + language, async () => {
      const ctx = await context(); const page = await ctx.newPage();
      await page.goto(origin + '/?lang=' + language); await atLanguage(page, language);
      for (const id of expectedSections) assert.ok(await page.locator('[id="' + id + '"]').count());
      assert.equal(await page.locator('.page__content h1').count(), 6);
      const stats = page.locator('.show_paper_citations');
      await stats.nth(16).filter({ hasText: language === 'zh' ? '引用次数: 15' : 'Citations: 15' }).waitFor();
      assert.equal(await stats.first().textContent(), '');
      assert.match(await stats.nth(1).textContent(), /: 0$/);
      data[language] = await stats.evaluateAll(elements => elements.map(el => {
        const block = el.closest('.paper-box-text') || el.closest('li');
        const clone = block.cloneNode(true); clone.querySelectorAll('.show_paper_citations').forEach(n => n.remove());
        if (block.classList.contains('paper-box-text')) clone.querySelectorAll('ul').forEach(n => n.remove());
        return { id: el.getAttribute('data'), links: [...block.querySelectorAll('a')].map(a => a.getAttribute('href')),
          text: clone.textContent.replace(/Paper|Code|论文|代码/g, '').replace(/\s+/g, ' ').trim() };
      }));
      const cv = page.locator('.page__content a[href="/cv/Pinglu_Zhang_Academic_CV.pdf"]');
      assert.equal(await cv.count(), 1);
      assert.equal((await page.request.get(origin + await cv.getAttribute('href'))).status(), 200);
      assert.equal(await page.locator('a[href$=".docx"]').count(), 0);
      assert.equal(await page.locator('link[hreflang="en"]').count(), 1);
      assert.equal(await page.locator('link[hreflang="zh-CN"]').count(), 1);
      assert.equal(await page.locator('link[hreflang="en"]').getAttribute('href'), 'https://pinglu-zhang.github.io/');
      assert.equal(await page.locator('link[hreflang="zh-CN"]').getAttribute('href'), 'https://pinglu-zhang.github.io/zh/');
      const assets = await page.locator('img[src],script[src],link[rel="stylesheet"],link[rel="icon"]').evaluateAll(els =>
        els.map(el => el.src || el.href).filter(url => new URL(url).origin === location.origin));
      for (const url of new Set(assets)) assert.equal((await page.request.get(url)).status(), 200, url);
      assert.ok(await page.locator('.paper-box-image img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'Publication images must decode, not just return HTTP 200');
      if (language === 'en' && process.env.BASELINE_HTML) {
        const baseline = fs.readFileSync(process.env.BASELINE_HTML, 'utf8');
        const unchanged = await page.evaluate(html => {
          const clean = node => { const copy = node.cloneNode(true); copy.querySelectorAll('.show_paper_citations').forEach(n => n.remove()); return copy.textContent.replace(/\s+/g, ' ').trim(); };
          return clean(document.querySelector('.page__content')) === clean(new DOMParser().parseFromString(html, 'text/html').querySelector('.page__content'));
        }, baseline);
        assert.ok(unchanged, 'English body content must match the pre-change build');
      }
      await ctx.close();
    });
    assert.deepEqual(data.en, data.zh, 'Both languages must share all publication metadata in the same order');

    for (const width of [320, 390, 768, 1024, 1440]) await check('Navigation and switch at ' + width + 'px', async () => {
      const ctx = await context({ viewport: { width, height: 900 } }); const page = await ctx.newPage();
      await page.goto(origin); await atLanguage(page, 'en');
      for (const language of ['zh', 'en']) {
        const link = page.locator('[data-language-switch="' + language + '"]');
        const box = await link.boundingBox(); assert.ok(box && box.x >= 0 && box.x + box.width <= width);
        await link.click(); await atLanguage(page, language);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      }
      const menu = page.locator('#site-nav button');
      if (await menu.isVisible()) {
        await menu.click(); await page.locator('#navigation-overflow:not(.hidden)').waitFor();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        await page.locator('#navigation-overflow a[href="#-educations"]').click();
        assert.equal(ctx.pages().length, 1);
      }
      await ctx.close();
    });
    assert.deepEqual(localFailures, [], 'No local asset failures');
    assert.deepEqual(jsErrors, [], 'No browser script errors');
    console.log(`All ${passed} bilingual checks passed; 17 shared publications verified.`);
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
