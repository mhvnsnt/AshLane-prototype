import { chromium } from 'playwright';

const OUT = '/home/hatch/workspace/ashlane-proof';
const browser = await chromium.launch({
  executablePath: '/home/hatch/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 200)));

async function shot(name, waitMs = 2000) {
  await page.waitForTimeout(waitMs);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('SHOT:', name);
}

async function clickBack() {
  const btn = page.getByRole('button', { name: /← back/i });
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
}

await page.goto('http://localhost:8902/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(8000);

// --- CUSTOMIZE (character select) ---
await page.getByRole('button', { name: /^customize$/i }).click();
await shot('05-menu-customize', 3000);
await clickBack();

// --- ARENAS ---
await page.getByRole('button', { name: /^arenas$/i }).first().click();
await shot('06-menu-arenas', 2000);

// --- Start EXHIBITION bout ---
await page.getByRole('button', { name: /exhibition here/i }).click();
await shot('07-combat-start', 10000);

// --- Fight ---
await page.keyboard.down('KeyW');
await page.waitForTimeout(1500);
await page.keyboard.up('KeyW');
await page.keyboard.press('KeyJ');
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/08-combat-attack.png` });
console.log('SHOT: 08-combat-attack');
await page.keyboard.press('KeyJ');
await page.waitForTimeout(800);
await page.keyboard.press('KeyK');
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/09-combat-mid.png` });
console.log('SHOT: 09-combat-mid');

for (let i = 0; i < 8; i++) {
  await page.keyboard.press('KeyJ');
  await page.waitForTimeout(600);
  if (i % 3 === 0) await page.keyboard.press('KeyL');
}
await page.screenshot({ path: `${OUT}/10-combat-brawl.png` });
console.log('SHOT: 10-combat-brawl');

const canvasInfo = await page.evaluate(() => {
  const c = document.querySelector('canvas');
  return c ? { w: c.width, h: c.height } : null;
});
console.log('CANVAS:', JSON.stringify(canvasInfo));
console.log('ERRORS:', errors.length ? errors.slice(0, 12) : 'none');
await browser.close();
console.log('DONE');
