import { test, expect } from "../helpers/fixtures";
import HomePage from "../pageObject/homePage";

test.describe("Verify Scroll Up without 'Arrow' button and Scroll Down functionality", () => {
  test("TC_26 |Verify scroll up without 'Arrow' button and scroll down functionality", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    await homePage.scrollDown();
    await expect(homePage.getSubscriptionText()).toBeVisible();

    await homePage.scrollUp();
    await expect(homePage.getFullFledgedText()).toBeVisible();
  });
});
