import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/home/hatch/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 960, height: 600 } });
const logs = [];
page.on('console', m => logs.push(m.type() + ': ' + m.text().slice(0, 120)));
page.on('pageerror', e => logs.push('PAGEERROR: ' + String(e).slice(0, 150)));

await page.goto('http://localhost:8902/', { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForTimeout(8000);

// Check audio system
const audio = await page.evaluate(() => {
  // Try to see if music module is loaded and AudioContext works
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  return { state: ctx.state, sampleRate: ctx.sampleRate };
});
console.log('AUDIO:', JSON.stringify(audio));

// Check if music.ts engine is referenced in the page
const hasMusic = await page.evaluate(() => {
  return document.documentElement.innerHTML.includes('music') ? 'referenced' : 'not found in html';
});
console.log('MUSIC REF:', hasMusic);

// Start a bout and check for audio scheduling
await page.getByRole('button', { name: /^arenas$/i }).first().click({ noWaitAfter: true });
await page.waitForTimeout(1200);
const exhBtn = page.getByRole('button', { name: /exhibition here/i });
await exhBtn.scrollIntoViewIfNeeded();
await exhBtn.click({ noWaitAfter: true });
await page.waitForTimeout(12000);

const audio2 = await page.evaluate(() => {
  // Check for any active AudioContexts or scheduled audio
  return 'bout running';
});
console.log('BOUT:', audio2);
console.log('LOGS:', logs.filter(l => l.toLowerCase().includes('audio') || l.toLowerCase().includes('music') || l.includes('PAGEERROR')).slice(0, 10));
await browser.close();
console.log('DONE');
