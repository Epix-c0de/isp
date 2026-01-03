const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const logs = [];

  page.on('console', (msg) => {
    logs.push({ type: 'console', level: msg.type(), text: msg.text() });
    console.log('[CONSOLE]', msg.type(), msg.text());
  });

  page.on('pageerror', (err) => {
    logs.push({ type: 'pageerror', message: err.message, stack: err.stack });
    console.log('[PAGE_ERROR]', err.message);
    console.log(err.stack);
  });

  page.on('requestfailed', (req) => {
    const url = req.url();
    const status = req.failure() ? req.failure().errorText : 'unknown';
    logs.push({ type: 'requestfailed', url, status });
    console.log('[REQUEST_FAILED]', url, status);
  });

  page.on('response', (res) => {
    if (res.status() >= 400) {
      logs.push({ type: 'response', url: res.url(), status: res.status() });
      console.log('[RESPONSE_ERROR]', res.status(), res.url());
    }
  });

  // Capture unhandledrejection and window errors inside the page
  await page.addInitScript(() => {
    window.addEventListener('error', (e) => {
      // This will show up as a console.error in Playwright
      console.error('window.error', e.message, e.filename + ":" + e.lineno + ":" + e.colno);
    });
    window.addEventListener('unhandledrejection', (e) => {
      console.error('unhandledrejection', e.reason && e.reason.stack ? e.reason.stack : e.reason);
    });
  });

  try {
    const url = process.argv[2] || process.env.URL || 'http://localhost:3000'
    console.log('Navigating to', url);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    // Wait a bit to allow runtime errors to show up
    await page.waitForTimeout(3000);
  } catch (err) {
    console.log('[NAV_ERROR]', err.message);
    console.log(err.stack);
  }

  await browser.close();

  // Optionally, write logs to stdout as JSON for later parsing
  console.log('\n--- CAPTURED LOGS (JSON) ---');
  console.log(JSON.stringify(logs, null, 2));

  // Exit with non-zero code if we captured errors
  const hadErrors = logs.some((l) => l.type === 'pageerror' || (l.type === 'console' && /error|createUnhandledError|Unhandled/i.test(l.text)));
  process.exit(hadErrors ? 2 : 0);
})();
