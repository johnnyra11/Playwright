const { test, expect } = require("@playwright/test");
//Login to the website
test.only("tt", async ({ page }) => {
const productName = "ZARA COAT 3";
const products = page.locator(".card-body");
const email = "budemposmotreti11@gmail.com";
await page.goto("https://rahulshettyacademy.com/client/");
await page.locator("#userEmail").fill("budemposmotreti11@gmail.com");
await page.locator("#userPassword").fill('Curent37*');
await page.locator('[value="Login"]').click();
await page.waitForLoadState("networkidle");
// await page.locator(".card-body b").first().waitFor();
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);

// Get the total number of products
const productCount = await products.count();
for (let i = 0; i < productCount; i++) {
    const productText = await products.locator("b").nth(i).textContent(); // Get product name

    if (productText.trim() === productName) { // Trim to avoid whitespace issues
        await products.nth(i).locator("text= Add To Cart").click(); // Click 'Add To Cart'
        console.log(`Added ${productName} to the cart.`);
        break; // Exit loop after adding product
    }
}


// Click on the cart icon
await page.locator('[routerLink*="cart"]').click();
await page.locator("div li").first().waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();

await page.locator("text=Checkout").click();
await page.locator('[placeholder*="Country"]').pressSequentially("uni",{delay:100}
);
//await page.pause();

const dropdown = page.locator(".ta-results");
await dropdown.waitFor();
const optionsCount = await dropdown.locator("button").count();
for (let i =0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " United States Minor Outlying Islands") {
    await dropdown.locator("button").nth(i).click();
    console.log(`Selected ${text}`);
    break;
    }
}
//await page.pause();
await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.locator(".action__submit").click();

await expect(page.locator("h1")).toHaveText('Thankyou for the order.');
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);

// Navigate to the My Orders page
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows = page.locator("tbody tr");

for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
                console.log(`Found order ${orderId}`);
        break;
    }
}
const orderIdDetails = await page.locator(".col-text").textContent();
expect(orderId.includes(orderIdDetails)).toBeTruthy();
});