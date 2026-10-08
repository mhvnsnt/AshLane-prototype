import { chromium } from 'playwright';

const OUT = '/home/hatch/workspace/ashlane-proof';
const browser = await chromium.launch({
  executablePath: '/home/hatch/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', e => console.log('PAGEERROR:', String(e).slice(0, 150)));

await page.goto('http://localhost:8902/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(8000);

await page.getByRole('button', { name: /^customize$/i }).click({ noWaitAfter: true });
await page.waitForTimeout(2000);

// Find the scrollable menu sheet and scroll it
const scroller = await page.evaluateHandle(() => {
  const els = [...document.querySelectorAll('*')].filter(el => {
    const s = getComputedStyle(el);
    return (s.overflowY === 'auto' || s.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 50;
  });
  // pick the one containing the roster
  return els.find(el => el.textContent.includes('WHO YOU ARE')) || els[0] || null;
});

for (let i = 0; i < 6; i++) {
  await page.evaluate(el => { if (el) el.scrollBy(0, 700); }, scroller);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/14-roster-scroll-${i}.png`, timeout: 60000 });
  console.log('SHOT: 14-roster-scroll-' + i);
}
await browser.close();
console.log('DONE');
