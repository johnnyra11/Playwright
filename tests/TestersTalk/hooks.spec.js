// Include Playwright module
const { test, expect } = require('@playwright/test');

test.beforeEach('Run before each test', async({page}) =>{
// Go to URL
await page.goto('https://youtube.com');
})

test.beforeAll('Run before all tests', async({}) =>{
// Display message in console
console.log('Running before all tests ...')

})
// Write a test
test('Hooks in Playwright', async ({page}) => {
    

    // Search with a keyword
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('cypress by testers talk');
    await page.getByRole('button', { name: 'Search', exact: true }).click();

    // Wait for search results to load
    await page.waitForTimeout(5000); // Consider replacing with proper waiting for specific elements

    // Click on the playlist
    await page.getByRole('link', { name: 'Cypress by Testers Talk' }).click();

    // Validate the title
    await expect(page).toHaveTitle('Cypress Tutorial Full Course 2023 | Learn Cypress in 5 Hrs - YouTube');
})

test('Hooks in Playwright2', async ({page}) => {
    

        // Search with a keyword
        await page.getByPlaceholder('Search').click();
        await page.getByPlaceholder('Search').fill('api testing by testers talk');
        await page.getByRole('button', { name: 'Search', exact: true }).click();
    
        // Wait for search results to load
        await page.waitForTimeout(5000); // Consider replacing with proper waiting for specific elements
    
        // Click on the playlist
        await page.getByRole('link', { name: 'API Testing by Testers Talk' }).click();
    
        // Validate the title
        await expect(page).toHaveTitle('API Testing by Testers Talk');
})
