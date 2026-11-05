// Run with the dev server: node .freebuff/mobile-scroll-check.js
const assert = require('node:assert/strict');
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.querySelector('web-music-ipod')?.shadowRoot?.querySelector('.menu-items'));
    assert.equal(await page.evaluate(() => scrollY), 0, 'fresh mobile entry stays at the hero');
    await page.waitForFunction(() => document.querySelector('web-music-ipod').shadowRoot.querySelector('.select-button')?.getAttribute('aria-disabled') !== 'true');

    // The old page-wide guard only worked at exactly scrollY === 0.
    await page.evaluate(() => {
      window.scrollTo({ top: 1, behavior: 'instant' });
      document.querySelector('web-music-ipod').shadowRoot.querySelector('.menu-items').focus({ preventScroll: true });
    });
    await page.keyboard.press('ArrowDown');
    await page.waitForFunction(() => document.querySelector('web-music-ipod').shadowRoot.querySelector('[aria-selected="true"]').textContent.includes('LinkedIn'));
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.equal(await page.evaluate(() => scrollY), 1, 'menu selection does not scroll the page');

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('web-music-ipod').shadowRoot.querySelector('.menu-items').textContent.includes('Steve'));
    const rows = await page.evaluate(() => document.querySelector('web-music-ipod').shadowRoot.querySelector('.menu-items').children.length);
    for (let index = 1; index < rows; index++) await page.keyboard.press('ArrowDown');
    const lastRow = await page.evaluate(() => {
      const list = document.querySelector('web-music-ipod').shadowRoot.querySelector('.menu-items');
      const row = list.querySelector('[aria-selected="true"]');
      return { pageY: scrollY, menuY: list.scrollTop, visible: row.getBoundingClientRect().bottom <= list.getBoundingClientRect().bottom + 1 };
    });
    assert.equal(lastRow.pageY, 1);
    assert.ok(lastRow.menuY > 0, 'long menus still scroll internally');
    assert.ok(lastRow.visible, 'the selected last row is visible');
    for (let index = 1; index < rows; index++) await page.keyboard.press('ArrowUp');
    assert.deepEqual(await page.evaluate(() => ({
      pageY: scrollY,
      menuY: document.querySelector('web-music-ipod').shadowRoot.querySelector('.menu-items').scrollTop,
    })), { pageY: 1, menuY: 0 }, 'returning to the first row scrolls only the menu');
    console.log('Mobile entry and iPod menu scroll regression passed.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
