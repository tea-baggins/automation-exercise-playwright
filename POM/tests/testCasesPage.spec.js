import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import HomePage from "../pageObject/homePage";
import TestCasesPage from "../pageObject/testCasesPage";

test.describe("Test Cases Page", () => {
  test("TC_07 |Verify test cases page", async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickTetsCasesLink();

    const testCasesPage = new TestCasesPage(page);
    await expect(testCasesPage.testCasesText()).toBeVisible();
  });
});
