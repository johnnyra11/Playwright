const {test, expect,request} = require("@playwright/test");

let context;
let page;
let token;
let apiContext;

test.beforeAll(async ({browser}) => {
    context = await browser.newContext({viewport: {height: 900, width: 1600}});
    apiContext = await request.newContext();
    page = await context.newPage();

    const response = await page.request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: {
            userEmail: 'budemposmotreti11@gmail.com',
            userPassword: "Curent37*"
        }
    });
    token = await response.json();
    token = token.token;
})

test.only('6-5', async () => {
    console.log(token);

    await page.addInitScript((value) => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");

    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: {
            orders: [{
                "country": "Moldova, Republic of",
                "productOrderedId": "6581ca399fd99c85e8ee7f45"
            }]
        },
        headers: { Authorization: token, "Content-Type": "application/json" },
    });

    const orderBody = await orderResponse.json();

    await page.locator('nav > ul > li:nth-child(3) > button').click();
    await expect(page.locator('.table > tbody > tr >th:nth-child(1)').first()).toHaveText(orderBody.orders);
});