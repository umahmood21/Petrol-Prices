<div align="center">

# @umahmood21/Petrol-Prices

**A tool that fetches the top 10 cheapest fuel prices in the area.**

This project utilises [Petrol Prices](https://www.petrolprices.com/), a community driven fuel price comparison website.

</div>

# Inspiration
I programmed this tool during the fuel crisis of 2022 which saw fuel prices reaching record heights with the average price of petrol being 166.8p, and diesel being 180.1p.
After conducting some research, I found Petrol Prices, a community driven fuel comparison website. I initiated a search and lo and behold, the cheapest petrol prices in my area were presented to me.
Astonished, I wondered if I could automate this process by using my skills. You'll see the result of that in this repository.

# How it works
This repository lays the foundation for searching for the cheapest fuel prices, the possibilities of what you could do with this are endless.
I personally use this solely for identifying the cheapest fuel station in my area (and it has saved me a lot of money) but an example of what you could modify this code for is data analysis.

Since Petrol Prices has no official API, I had to resort to browser emulation via [Puppeteer](https://github.com/puppeteer/puppeteer). This script will perform a search via browser emulation and scrape the results.

To set up this script, you will need to edit config.json:

```json
{
    "loginPage": "https://app.petrolprices.com/",
    "searchFilterInfo": "POST_CODE",
    "fuelType": "FUEL_TYPE_UNLEADED_OR_DIESEL",
    "email": "EMAIL",
    "password": "PASSWORD"
}
```
`loginPage` must not be changed as it is the starting point for the script.

`searchFilterInfo` must contain the post code used to conduct the search.

`fuelType` must contain the type of fuel you are looking for the cheapest price for. Only unleaded and diesel are supported at the moment.

`email` is your email registered with petrol prices.

`password` is the password connected to your petrol prices account.
