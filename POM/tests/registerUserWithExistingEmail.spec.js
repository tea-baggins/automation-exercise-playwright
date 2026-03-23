import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import { existingUser } from "../helpers/testData";
import LoginPage from "../pageObject/loginPage";

test.describe("Register User with existing email", () => {
  test("TC_05 |Verify register user with existing email", async ({
    homePage,
    page
  }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickSignupLoginLink();

    const loginPage = new LoginPage(page);
    await expect(loginPage.getNewUserSignup()).toBeVisible();

    await loginPage.fillNameField(existingUser.name);
    await loginPage.fillEmaiAddresslFieldSignup(existingUser.emailAddress);
    await loginPage.clickSignupButton();
    await loginPage.getErrorMessageEmailAddressExistText();
    await expect(
      loginPage.getErrorMessageEmailAddressExistText(),
    ).toBeVisible();
  });
});
