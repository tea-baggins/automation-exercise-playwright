import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import HomePage from "../pageObject/homePage";
import LoginPage from "../pageObject/loginPage";
import { loginToYourAccountForm } from "../helpers/testData";

test.describe("Login User with correct email and password", () => {
  test("TC_02 |Verify login user with correct email and password", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickSignupLoginLink();

    const loginPage = new LoginPage(page);
    await loginPage.getLoginToYourAccount();
    await expect(loginPage.getLoginToYourAccount()).toBeVisible();

    await loginPage.fillEmailAddressFieldLogin(
      loginToYourAccountForm.emailAddress
    );
    await loginPage.fillPasswordField(loginToYourAccountForm.password);
    await loginPage.clickLoginButton();
    await expect(header.getLoggedInAs()).toBeVisible();
  });
});
