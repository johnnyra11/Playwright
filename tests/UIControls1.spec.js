const { test, expect } = require('@playwright/test');

test.only("UI Controls Test", async ({ page }) => {
    // Locators
    const radioButton = page.locator(".customradio");
    const dropdown = page.locator("select.form-control");
    const termsOfConditions = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");
    const okayButton = page.locator("#okayBtn");

    // Navigate to the page
    const url = "https://rahulshettyacademy.com/loginpagePractise/";
    console.log(`Navigating to: ${url}`);
    await page.goto(url);

    // Select an option from the dropdown
    const dropdownOption = "consult";
    await dropdown.selectOption(dropdownOption);
    console.log(`Dropdown option selected: ${dropdownOption}`);

    // Click on the last radio button
    await radioButton.last().click();
    console.log(`Last radio button clicked.`);

    // Confirm the selection using the "Okay" button
    await okayButton.click();
    const isRadioButtonChecked = await radioButton.last().isChecked();
    console.log(`Is last radio button checked: ${isRadioButtonChecked}`);
    await expect(radioButton.last()).toBeChecked();

    // Interact with the Terms and Conditions checkbox
    await termsOfConditions.check();
    console.log("Terms and Conditions checkbox checked.");
    await expect(termsOfConditions).toBeChecked();

    await termsOfConditions.uncheck();
    console.log("Terms and Conditions checkbox unchecked.");
    await expect(termsOfConditions).not.toBeChecked();

    // Additional check to verify if the checkbox is deselected
    const isTermsChecked = await termsOfConditions.isChecked();
    expect(isTermsChecked).toBeFalsy();
    console.log(`Terms and Conditions checkbox is checked: ${isTermsChecked}`);

    // Validate the "Documents Request" link has the expected class attribute
    const expectedClass = "blinkingText";
    await expect(documentLink).toHaveAttribute("class", expectedClass);
    console.log(`Verified "Documents Request" link has class: ${expectedClass}`);
});
