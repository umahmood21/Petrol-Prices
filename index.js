const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const config = require("./config.json");
puppeteer.use(StealthPlugin());

function fetchPrices() {
  puppeteer.launch({ headless: false }).then(async (browser) => {
    const page = await browser.newPage();
    await page.goto(config.loginPage);
    await page.waitForTimeout(2000);
    emailInput = await page.$x('/html/body/div[1]/section/div/div/div[2]/div/form/div[1]/input');
    emailInput[0].type(config.email, { delay: 20 });
    await page.waitForTimeout(2000);
    passwordInput = await page.$x('/html/body/div[1]/section/div/div/div[2]/div/form/div[2]/input');
    passwordInput[0].type(config.password, { delay: 20 });
    await page.waitForTimeout(2000);
    loginButton = await page.$x('/html/body/div[1]/section/div/div/div[2]/div/form/div[3]/button');
    loginButton[0].click();
    await page.waitForTimeout(2000);

    const fuelType = config.fuelType.toLowerCase()

    if (!["unleaded", "diesel"].includes(fuelType)) {
      browser.close();
      return console.error(`Error: ${fuelType} is not a recognised fuel type.\nOnly unleaded and diesel are supported at the moment.`)
    }

    searchInput = await page.$x('/html/body/div[1]/section/div/div/div[1]/div[1]/div/div[1]/div[1]/div/input');
    searchInput[0].type(config.searchFilterInfo, { delay: 20 })
    await page.waitForTimeout(2000);
    page.keyboard.press('Enter');
    await page.waitForTimeout(2000);

    if (fuelType == "diesel") {
      filterButton = await page.$x('/html/body/div[1]/section/div/div/div[1]/div[1]/div/div[2]/div[1]');
      filterButton[0].click();
      await page.waitForTimeout(2000);
      dieselButton = await page.$x('/html/body/div[1]/div[1]/div/div[2]/div[1]/div/div[2]')
      dieselButton[0].click();
      await page.waitForTimeout(2000);
      applyButton = await page.$x('/html/body/div[1]/div[1]/div/div[3]/div')
      applyButton[0].click();
      await page.waitForTimeout(2000);
    } 

    const stations = await page.$$('.station-name')
    const stations_price = await page.$$('.station-price');

    console.log(`\n--- LOADING TOP 10 RESULTS FOR ${fuelType} ---\n`);

    for (let i = 0; i < 10; i++) {
      let name = await stations[i].evaluate(el => el.textContent);
      let price = await stations_price[i].evaluate(el => el.textContent)
      console.log(`${name} | ${price}`)
    }

    browser.close();
  });
};

// The code below can be used to fetchPrices at an interval, 10000 (10s) is the interval the prices will be fetched at.
/* const fetchInterval = setInterval(() => { 
  fetchStatus();
}, 10000); */

fetchPrices();