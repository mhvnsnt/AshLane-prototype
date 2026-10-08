import { chromium } from 'playwright';

const OUT = '/home/hatch/workspace/ashlane-proof';
const browser = await chromium.launch({
  executablePath: '/home/hatch/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 960, height: 600 } });
page.on('pageerror', e => console.log('PAGEERROR:', String(e).slice(0, 150)));
page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE:', m.text().slice(0, 150)); });

await page.goto('http://localhost:8902/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(8000);

// Go to arenas, start exhibition
await page.getByRole('button', { name: /^arenas$/i }).first().click({ noWaitAfter: true });
await page.waitForTimeout(1500);
const exhBtn = page.getByRole('button', { name: /exhibition here/i });
await exhBtn.scrollIntoViewIfNeeded();
await exhBtn.click({ noWaitAfter: true });
console.log('Bout started, waiting for 3D load...');
await page.waitForTimeout(15000);

// Check canvas and WebGL state
const gl = await page.evaluate(() => {
  const c = document.querySelector('canvas');
  if (!c) return 'NO CANVAS';
  return `canvas ${c.width}x${c.height}`;
});
console.log('GL:', gl);

await page.screenshot({ path: `${OUT}/15-combat-3d.png`, timeout: 90000 });
console.log('SHOT: 15-combat-3d');

// Try moving and attacking
await page.keyboard.down('KeyW');
await page.waitForTimeout(1200);
await page.keyboard.up('KeyW');
await page.keyboard.press('KeyJ');
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/16-combat-attack.png`, timeout: 90000 });
console.log('SHOT: 16-combat-attack');

await browser.close();
console.log('DONE');
