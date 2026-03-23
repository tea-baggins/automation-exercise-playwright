import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import LoginPage from "../pageObject/loginPage";
import SignupPage from "../pageObject/signupPage";
import AccountCreatedPage from "../pageObject/accountCreatedPage";
import { newUserSignUp, SignupData } from "../helpers/testData";
import { generateUniqueEmail } from "../helpers/utils";
import DeleteAccountPage from "../pageObject/deleteAccountPage";

test.describe("Register User", () => {
  test("TC_01 |Verify register user", async ({ homePage, page }) => {
    const header = new Header(page);
    await header.clickSignupLoginLink();

    const loginPage = new LoginPage(page);
    await expect(loginPage.getNewUserSignup()).toBeVisible();
    const uniqueEmail = generateUniqueEmail();
    await loginPage.fillNameField(newUserSignUp.name);
    await loginPage.fillEmaiAddresslFieldSignup(uniqueEmail);
    await loginPage.clickSignupButton();

    const signupPage = new SignupPage(page);
    const accountInformation =
      await signupPage.getEnterAccountInformationText();
    expect(accountInformation).toHaveText("Enter Account Information");

    await signupPage.clickGenderRadioButton();
    await signupPage.fillPasswordField(SignupData.password);
    await signupPage.selectDate(SignupData.dateOfBirth);

    await signupPage.clickSignupForNewsletterCheckbox();
    await signupPage.clickReceiveSpecialOffersCheckbox();

    await signupPage.fillFirstNameField(SignupData.firstName);
    await signupPage.fillLastNameField(SignupData.lastName);
    await signupPage.fillAddressField(SignupData.address);
    await signupPage.selectCountryDropDown(SignupData.country);
    await signupPage.fillStateField(SignupData.state);
    await signupPage.fillCityField(SignupData.city);
    await signupPage.fillZipcodeField(SignupData.zipcode);
    await signupPage.fillMobileNumberField(SignupData.mobileNumber);
    await signupPage.clickCreateAccountButton();

    const accountCreatedPage = new AccountCreatedPage(page);
    await expect(accountCreatedPage.getMessageAccountCreated()).toBeVisible();
    await expect(accountCreatedPage.getMessageAccountCreated()).toHaveText(
      "Account Created!",
    );
    await accountCreatedPage.clickContinueButton();
    await expect(header.getLoggedInAs()).toBeVisible();

    await header.clickDeleteAccounLinkt();
    const deleteAccounPage = new DeleteAccountPage(page);
    await expect(
      deleteAccounPage.getAccountDeleted("Account Dleted!"),
    ).toBeVisible();
    await deleteAccounPage.clickContinueButton();

    await homePage.loadHomePage();
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();
  });
});
