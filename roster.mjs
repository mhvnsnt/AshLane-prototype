import { chromium } from 'playwright';

const OUT = '/home/hatch/workspace/ashlane-proof';
const browser = await chromium.launch({
  executablePath: '/home/hatch/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 200)));

await page.goto('http://localhost:8902/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(8000);

// Scroll customize menu to roster
await page.getByRole('button', { name: /^customize$/i }).click();
await page.waitForTimeout(2000);
// Scroll the "Who you are" section into view
const whoHeading = page.getByText('Who you are', { exact: false });
await whoHeading.scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/11-roster-top.png`, timeout: 60000 });
console.log('SHOT: 11-roster-top');

// Scroll further down through roster
await page.evaluate(() => window.scrollBy(0, 900));
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/12-roster-mid.png`, timeout: 60000 });
console.log('SHOT: 12-roster-mid');
await page.evaluate(() => window.scrollBy(0, 900));
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/13-roster-bottom.png`, timeout: 60000 });
console.log('SHOT: 13-roster-bottom');

console.log('ERRORS:', errors.length ? errors.slice(0, 8) : 'none');
await browser.close();
console.log('DONE');
