const { test, expect } = require('@playwright/test');

// Set browser context
test.only('Browser Context Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Locators
    const username = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const errorMessage = page.locator('div[style*="block"]');
    const productLinks = page.locator('.card-body a');
    const cardTitles = page.locator('.card-body a');
    const allTitles = await cardTitles.allTextContents();


    // Navigate to the page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Verify the page title
    await expect(page).toHaveTitle(/Login/);
    console.log(await page.title());
   //wait page.pause()

//    // Interact with elements
//    await username.fill('rahulshetty');
//    await page.locator('#password').fill('learning');
//    await signIn.click();
//
//    // Verify error message (uncomment if needed)
//    // await expect(errorMessage).toContainText("Incorrect");
//
//    // Interact with specific product link
//   // console.log(await productLinks.first().allTitles); // Logs the text of the first product link
//    console.log(allTitles);

    const dropdown = page.locator("select.form-control");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await dropdown.selectOption("consult")
   // await page.pause()

//// Click on the radio button using class selector
//  const radioButton = page.locator('.radiotextsty');
//  await radioButton.click();
//
//  // Verify the radio button is selected
//  await expect(radioButton).toBeChecked();

const radioButton =
page.locator(".customradio");
await radioButton.last().click();
await page.locator("#okayBtn").click()
// Verify the radio button is selected

console.log("is checked" + await radioButton.last().isChecked());
await expect(radioButton.last()).toBeChecked();
//Declaring the locator for the checkbox
const termsOfConditions = page.locator("#terms");
// Tick the checkbox
await page.locator("#terms").click();
// Await the checkbox to be checked
await termsOfConditions.click();
//   Check if the checkbox is selected
await expect(termsOfConditions).toBeChecked(); //verificăm că este selectat
await termsOfConditions.uncheck(); // deselectăm
await expect(termsOfConditions).not.toBeChecked(); // verificăm că este deselectat metoda nr 1
expect(await termsOfConditions.isChecked()).toBeFalsy();
});

