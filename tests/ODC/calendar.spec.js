const { test, expect } = require("@playwright/test");
//Login to the website
test.only("tt", async ({ page }) => {

const monthNumber = "6";
const year = "2027";
const date = "15";

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
await page
.locator(".react-calendar__year-view__months__month")
.nth(Number(monthNumber) - 1)
.click();
await page.locator("//abbr[text()='" + date + "']").click();

//Verify the date is selected correctly in the input field
const expectedList = [monthNumber, date,year];// Declarăm un tabel cu elementele din data noastră așteptată
const inputs = await page.locator(".react-date-picker__inputGroup input"); // Identificăm elementele din dată cu un selector comun pentru zi/lună/an
for (let index = 0; index < inputs.length;index++) { // Parcurgem elementele identificate mai sus
const value = inputs[index].getAttribute("value");// Extragem din fiecare element parcurs atributul <value>
expect(value).toEqual(expectedList[index]);
}
});