describe('addItemForm', () => { //обозначаем, что это группа тестов

    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer

        //какой-то код собранный по помойкам интеренета
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();


        //из методы
        //await page.goto('http://localhost:9009/iframe.html?id=additemform-component--add-item-form-base-example');

        //вроде нужный url
        await page.goto('http://localhost:6006//iframe.html?id=appwithredux-component--editable-span-base-example');

        //iz metodi
        const image = await page.screenshot();
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

