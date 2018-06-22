import * as puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            // see https://peter.sh/experiments/chromium-command-line-switches/
        ]
    });

    const items = ['週刊少年ジャンプ','週刊少年マガジン','週刊少年サンデー'];

    for(let item of items)
    {
        const page = await browser.newPage();
        await page.setViewport({ width: 1024, height: 768 });
        await page.goto('https://www.amazon.co.jp', {waitUntil:'networkidle2'});    
        await page.type('#twotabsearchtextbox', item);
        const submitButton = await page.$('input[type=submit]');
        submitButton.click();
        await page.waitForNavigation({waitUntil:'networkidle2', timeout:100000});
        await page.screenshot({path:`${item}.png`, fullPage:true});
    }

    await browser.close();
})();
