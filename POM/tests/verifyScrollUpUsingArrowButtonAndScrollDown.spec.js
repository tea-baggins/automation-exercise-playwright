import { test, expect } from "../helpers/fixtures";

test.describe("Verify Scroll Up using 'Arrow' button and Scroll Down functionality", () => {
  test("TC_25 |Verify scroll up using 'Arrow' button and scroll down functionality", async ({
    homePage
  }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    await homePage.scrollDown();
    await expect(homePage.getSubscriptionText()).toBeVisible();

    await homePage.clickScrollUpArrow();
    await expect(homePage.getFullFledgedText()).toBeVisible();
  });
});
