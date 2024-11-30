const { test, expect } = require("@playwright/test");

test("User Registration", async ({ page }) => {
  // Navigate to the "Create an Account" page
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.getByRole('link', { name: 'Register' }).click();

  // Fill in the registration form with valid details
  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('email@example.com').fill('johndoe1121_235@gmail.com'); 
  await page.getByPlaceholder('enter your number').fill('1234567890'); 
  await page.getByRole('combobox').selectOption('Doctor');
  await page.getByLabel('Male', { exact: true }).check();
  await page.getByRole('checkbox').check();
  await page.getByPlaceholder('Passsword', { exact: true }).fill('Curent37@*'); 
  await page.getByPlaceholder('Confirm Passsword').fill('Curent37@*'); 
  
  // Submit the registration form
  await page.getByRole('button', { name: 'Register' }).click();

  // Verify that the account is created successfully
  await page.getByText('Account Created Successfully').isVisible(); 

});
