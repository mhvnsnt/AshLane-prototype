import { chromium } from 'playwright';

const OUT = '/home/hatch/workspace/ashlane-proof';
const browser = await chromium.launch({
  executablePath: '/home/hatch/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 960, height: 600 } });
page.on('pageerror', e => console.log('PAGEERROR:', String(e).slice(0, 150)));

await page.goto('http://localhost:8902/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(8000);

// Select HOLLOW as the fighter first (dark clown faction test)
await page.getByRole('button', { name: /^customize$/i }).click({ noWaitAfter: true });
await page.waitForTimeout(1500);
// Scroll to find HOLLOW
const found = await page.evaluate(() => {
  const els = [...document.querySelectorAll('*')].filter(el => {
    const s = getComputedStyle(el);
    return (s.overflowY === 'auto' || s.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 50;
  });
  return els.length;
});
console.log('Scrollables:', found);

// Find and click HOLLOW
const hollowBtn = page.getByRole('button', { name: /hollow/i });
await hollowBtn.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/17-hollow-select.png`, timeout: 60000 });
console.log('SHOT: 17-hollow-select');
await hollowBtn.click({ noWaitAfter: true });
await page.waitForTimeout(1000);
console.log('HOLLOW selected');

// Back to main, start exhibition
const backBtn = page.getByRole('button', { name: /← back/i });
await backBtn.scrollIntoViewIfNeeded();
await backBtn.click({ noWaitAfter: true });
await page.waitForTimeout(1000);
await page.getByRole('button', { name: /^arenas$/i }).first().click({ noWaitAfter: true });
await page.waitForTimeout(1500);
const exhBtn = page.getByRole('button', { name: /exhibition here/i });
await exhBtn.scrollIntoViewIfNeeded();
await exhBtn.click({ noWaitAfter: true });
console.log('Bout started as HOLLOW');
await page.waitForTimeout(15000);

// Rapid sequence to catch animation frames
for (let i = 0; i < 4; i++) {
  await page.keyboard.press('KeyJ');
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/18-hollow-fight-${i}.png`, timeout: 90000 });
  console.log('SHOT: 18-hollow-fight-' + i);
}

await browser.close();
console.log('DONE');
