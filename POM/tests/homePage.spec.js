import { test, expect } from "../helpers/fixtures";
import Footer from "../pageObject/footer";
import HomePage from "../pageObject/homePage";
import { loginToYourAccountForm } from "../helpers/testData";

test.describe("Verify Subscription in home page", () => {
  test("TC_10 | Verify subscription in home page", async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const footer = new Footer(page);
    await footer.scrollToBottom();
    
    await expect(footer.subscribtionText()).toBeVisible();
    await footer.fillYourEmailAddressField(loginToYourAccountForm.emailAddress);
    await footer.clickSubscribeButton();
    await expect(footer.getSubscriptionSuccessMessage()).toBeVisible();
  });
});
