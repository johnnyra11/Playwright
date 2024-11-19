// Include Playwright module
const { test, expect } = require('@playwright/test');

// Write a test case
test('Locators Test', async ({ page }) => {
    //ByRole
    // // Navigate to the Google search results page with a query
    // await page.goto('https://www.google.com/search?q=cypress+by+testers+talk');

    // // Click on the "Videos" link using the locator identified by role
    // await page.getByRole('link', { name: 'Imagini' }).click();

    // //ByLabel
    // await page.goto('https://www.google.com/');
    // await page.getByLabel('Caută', {exact:true}).fill('api testing by testers talk');    
    // await page.getByLabel('Caută', { exact: true }).press('Enter');
    // //await page.pause();

    // By alt text
    // await page.goto('https://github.com/BakkappaN');
    // await page.getByAltText("View BakkappaN's full-sized avatar").click();

    // By test id
    // await page.goto('https://github.com/login');
    // await page.getByTestId('username').fill('testers talk');

    // By text
    // await page.goto('https://www.youtube.com/@testerstalk');
    // await page.getByText('Cypress by Testers Talk', { exact: true }).click();
    // OR
    // const textElement = await page.getByText('Cypress by Testers Talk', { exact: true });
    // await page.waitForTimeout(7000);
    // await expect(textElement).toBeVisible(); // Verifies visibility before clicking
    // await textElement.click();

    // By title
    // await page.goto('https://www.youtube.com/@testerstalk');
    // await page.getByTitle('Cypress by Testers Talk').click();

    //By xpath
    // await page.goto('https://www.youtube.com/');
    // await page.locator("xpath=//*[@name='search_query']").click();
    // await page.locator("xpath=//*[@name='search_query']").fill('javascript by testers talk');
    // await page.locator("xpath=//*[@name='search_query']").press('Enter');

    // By css selector
    await page.goto('https://www.youtube.com/');
    //await page.locator("[name='search_query']").toBeVisible();
    await page.locator("css=[name='search_query']").click();
    await page.locator("css=[name='search_query']").fill('javascript by testers talk');
    await page.locator("css=[name='search_query']").press('Enter');


    // Wait for 7 seconds to allow the page content to load (not recommended for production; consider using `waitForSelector` or other methods)
    await page.waitForTimeout(7000);

});

