import { test, expect } from "../helpers/fixtures";


test.describe("Verify Scroll Up without 'Arrow' button and Scroll Down functionality", () => {
  test("TC_26 |Verify scroll up without 'Arrow' button and scroll down functionality", async ({homePage }) => {
    
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    await homePage.scrollDown();
    await expect(homePage.getSubscriptionText()).toBeVisible();

    await homePage.scrollUp();
    await expect(homePage.getFullFledgedText()).toBeVisible();
  });
});
