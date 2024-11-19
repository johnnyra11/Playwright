// Include Playwright module
const { test, expect } = require('@playwright/test');

// Write a test
test('Screenshots', async ({ page }) => {
    // Go to URL
    await page.goto('https://www.youtube.com/@testerstalk');

    // Take a screenshot of an element
    await page.locator('#page-header-container').screenshot({path:'./tests/TestersTalk/screenshots/element.png'});

    // Take a screenshot of a page
    await page.screenshot({path:'./tests/TestersTalk/screenshots/page.png'});
    // Take a screenshot of a full page
    await page.screenshot({path:'./tests/TestersTalk/screenshots/fullpage.png',fullPage : true});

    await page.waitForTimeout(5000);
   
});
