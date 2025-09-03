import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import HomePage from "../pageObject/homePage";
import LoginPage from "../pageObject/loginPage";
import { incorrectCredentials } from "../helpers/testData";

test.describe("Login User with incorrect email and password", () => {
  test("TC_03 |Verify login user with incorrect email and password", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickSignupLoginLink();

    const loginPage = new LoginPage(page);
    await expect(loginPage.getLoginToYourAccount()).toBeVisible();

    await loginPage.fillEmailAddressFieldLogin(
      incorrectCredentials.emailAddress
    );
    await loginPage.fillPasswordField(incorrectCredentials.password);
    await loginPage.clickLoginButton();
    await loginPage.getErrorMessageText();
    await expect(loginPage.getErrorMessageText()).toBeVisible();
  });
});
