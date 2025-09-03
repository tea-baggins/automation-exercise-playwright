import { test, expect } from "../helpers/fixtures";
import Footer from "../pageObject/footer";
import HomePage from "../pageObject/homePage";
import { loginToYourAccountForm } from "../helpers/testData";
import Header from "../pageObject/header";

test.describe("Verify Subscription in Cart page", () => {
  test("TC_11 | Verify subscription in cart page", async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickCartLink();

    const footer = new Footer(page);
    await footer.scrollToBottom();
    await expect(footer.subscribtionText()).toBeVisible();
    await footer.fillYourEmailAddressField(loginToYourAccountForm.emailAddress);
    await footer.clickSubscribeButton();
    await expect(footer.getSubscriptionSuccessMessage()).toBeVisible();
  });
});
