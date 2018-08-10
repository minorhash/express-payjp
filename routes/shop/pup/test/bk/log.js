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
    const arr = ['adr', 'cart', 'history', 'my'];

    for (let i = 0; i < 3; i++) {
      console.log(arr[i]);
      await page.goto('http://localhost:3023/shop/' + arr[i], {
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

      await page.screenshot({
        path: 'test/img/' + arr[i] + '.png',
        fullPage: 'true',
      });
    } //for
  }).timeout(30000); //it
}); //desc

after(async () => {
  await browser.close();
});
