const assert = require('assert');
const dir = '/mnt/dat/exp/pup/node_modules';
const puppeteer = require(dir + '/puppeteer');
let browser;
let page;

before(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

describe('Check axell Homepage', async () => {
  it('login', async () => {
    await page.goto('http://localhost:3023/shop/cart', {
      waitUntil: 'networkidle0',
    });

    const email = 'successful.payment@paidy.com';
    const pss = '2112';

    await page.type('#ema', email);
    await page.type('#pss', pss);

    await page.evaluate(email => {
      $('input[name="ema"]')
        .parent('form')
        .submit();
    }, {});

    await page.evaluate(pss => {
      $('input[name="pss"]')
        .parent('form')
        .submit();
    }, {});

    await page.screenshot({ path: 'test/img/axe.png', fullPage: 'true' });

    //const arr=["cart","adr","agmt","guide","notation","sig"]
  }).timeout(30000);
}); //desc

after(async () => {
  await browser.close();
});
