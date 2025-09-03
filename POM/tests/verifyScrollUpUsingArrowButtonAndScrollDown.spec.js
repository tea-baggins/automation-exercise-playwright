import { test, expect } from "../helpers/fixtures";
import HomePage from "../pageObject/homePage";

test.describe("Verify Scroll Up using 'Arrow' button and Scroll Down functionality", () => {
  test("TC_25 |Verify scroll up using 'Arrow' button and scroll down functionality", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    await homePage.scrollDown();
    await expect(homePage.getSubscriptionText()).toBeVisible();

    await homePage.clickScrollUpArrow();
    await expect(homePage.getFullFledgedText()).toBeVisible();
  });
});
