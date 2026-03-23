import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import LoginPage from "../pageObject/loginPage";
import { loginToYourAccountForm } from "../helpers/testData";

test.describe("Logout User", () => {
  test("TC_04 |Verify logout user", async ({ homePage, page }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickSignupLoginLink();

    const loginPage = new LoginPage(page);
    await loginPage.getLoginToYourAccount();
    await expect(loginPage.getLoginToYourAccount()).toBeVisible();
    await loginPage.fillEmailAddressFieldLogin(
      loginToYourAccountForm.emailAddress,
    );
    await loginPage.fillPasswordField(loginToYourAccountForm.password);
    await loginPage.clickLoginButton();

    await expect(header.getLoggedInAs()).toBeVisible();
    await header.clickLogoutLink();
    await expect(loginPage.getLoginToYourAccount()).toBeVisible();
  });
});
