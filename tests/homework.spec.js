
const {test, expect} = require('@playwright/test');
const { log } = require('console');
const { Cipher } = require('crypto');

test.only ('Homework', async({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();

const email = page.locator("#userEmail");
const password = page.locator("#userPassword");
const signIn = page.locator("#login");
const itemsName = page.locator("#products .row > div b");

await page.goto('https://rahulshettyacademy.com/client');
await email.fill('budemposmotreti11@gmail.com');
await password.fill('Curent37*');
await signIn.click();
await expect(page.locator(`.toast-success`)).toContainText("Login Successfully");

console.log(await page.title());
console.log(await itemsName.nth(1).textContent());

await page.pause()
});