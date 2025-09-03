import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import HomePage from "../pageObject/homePage";
import LoginPage from "../pageObject/loginPage";
import ProductsPage from "../pageObject/productsPage";
import SignupPage from "../pageObject/signupPage";
import ViewCartPage from "../pageObject/viewCartPage";
import AccountCreatedPage from "../pageObject/accountCreatedPage";
import { generateUniqueEmail } from "../helpers/utils";
import {
  checkoutMessage,
  newUserSignUp,
  SignupData,
  paymentInfo,
  loginToYourAccountForm,
} from "../helpers/testData";
import CheckoutPge from "../pageObject/checkoutPage";
import PaymentPage from "../pageObject/paymentPage";
import PaymentDonePage from "../pageObject/paymentDonePage";
import DeleteAccountPage from "../pageObject/deleteAccountPage";

test.describe("Place Order: Register while Checkout", () => {
  test("TC_14 |Verify Place Order: register while checkout", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickProductsLink();

    const productsPage = new ProductsPage(page);
    await productsPage.hoverAndAddToCart(0);

    const viewCartPage = new ViewCartPage(page);
    await viewCartPage.clickViewCart();

    await header.clickCartLink();

    await expect(viewCartPage.getTableInfo()).toBeVisible();
    await viewCartPage.getClickProceedToCheckoutButton();
    await viewCartPage.clicKRegisterLogin();

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
      "Account Created!"
    );
    await accountCreatedPage.clickContinueButton();
    await expect(header.getLoggedInAs()).toBeVisible();

    await header.clickCartLink();
    await viewCartPage.getClickProceedToCheckoutButton();
    const checkoutPage = new CheckoutPge(page);
    checkoutPage.getAddressDetails();
    await checkoutPage.enterAddCommentField(checkoutMessage.addCommentText);
    await checkoutPage.clickPlaceOrderButton();

    const paymentPage = new PaymentPage(page);
    await paymentPage.fillNameOncardField(paymentInfo.nameOnCard);
    await paymentPage.fillCardNumberField(paymentInfo.cardNumber);
    await paymentPage.fillCVCField(paymentInfo.cvc);
    await paymentPage.fillExpirationMonthField(paymentInfo.expirationMonth);
    await paymentPage.fillExpirationYearField(paymentInfo.expirationYear);
    await paymentPage.clickPayAndConfirmOrderButton();

    const paymentDone = new PaymentDonePage(page);
    await expect(paymentDone.getSuccessMessage()).toBeVisible();

    await header.clickDeleteAccounLinkt();

    const deleteAccountPage = new DeleteAccountPage(page);
    expect(deleteAccountPage.getAccountDeleted()).toBeVisible();
    await deleteAccountPage.clickContinueButton();

    await expect(homePage.getLogoAutomationExercise()).toBeVisible();
  });

  test("TC_15 |Verify Place Order: register before checkout", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

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
      "Account Created!"
    );
    await accountCreatedPage.clickContinueButton();
    await expect(header.getLoggedInAs()).toBeVisible();

    await header.clickProductsLink();

    const productsPage = new ProductsPage(page);
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickViewCart();

    const viewCartPage = new ViewCartPage(page);
    await expect(viewCartPage.getTableInfo()).toBeVisible();

    await viewCartPage.clickProceedToCheckoutButton();
    const checkoutPage = new CheckoutPge(page);
    checkoutPage.getAddressDetails();
    await checkoutPage.enterAddCommentField(checkoutMessage.addCommentText);
    await checkoutPage.clickPlaceOrderButton();

    const paymentPage = new PaymentPage(page);
    await paymentPage.fillNameOncardField(paymentInfo.nameOnCard);
    await paymentPage.fillCardNumberField(paymentInfo.cardNumber);
    await paymentPage.fillCVCField(paymentInfo.cvc);
    await paymentPage.fillExpirationMonthField(paymentInfo.expirationMonth);
    await paymentPage.fillExpirationYearField(paymentInfo.expirationYear);
    await paymentPage.clickPayAndConfirmOrderButton();

    const paymentDone = new PaymentDonePage(page);
    await expect(paymentDone.getSuccessMessage()).toBeVisible();

    await header.clickDeleteAccounLinkt();

    const deleteAccountPage = new DeleteAccountPage(page);
    expect(deleteAccountPage.getAccountDeleted()).toBeVisible();
    await deleteAccountPage.clickContinueButton();

    await expect(homePage.getLogoAutomationExercise()).toBeVisible();
  });

  test("TC_16 |Verify Place Order: login before checkout", async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickSignupLoginLink();

    const loginPage = new LoginPage(page);
    await loginPage.fillEmailAddressFieldLogin(
      loginToYourAccountForm.emailAddress
    );
    await loginPage.fillPasswordField(loginToYourAccountForm.password);
    await loginPage.clickLoginButton();
    await expect(header.getLoggedInAs()).toBeVisible();

    await header.clickProductsLink();
    const productsPage = new ProductsPage(page);
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickViewCart();
    const viewCartPage = new ViewCartPage(page);
    await expect(viewCartPage.getTableInfo()).toBeVisible();
    await viewCartPage.clickProceedToCheckoutButton();

    const checkoutPage = new CheckoutPge(page);
    await checkoutPage.getAddressDetails();
    await checkoutPage.enterAddCommentField(checkoutMessage.addCommentText);
    await checkoutPage.clickPlaceOrderButton();

    const paymentPage = new PaymentPage(page);
    await paymentPage.fillNameOncardField(paymentInfo.nameOnCard);
    await paymentPage.fillCardNumberField(paymentInfo.cardNumber);
    await paymentPage.fillCVCField(paymentInfo.cvc);
    await paymentPage.fillExpirationMonthField(paymentInfo.expirationMonth);
    await paymentPage.fillExpirationYearField(paymentInfo.expirationYear);
    await paymentPage.clickPayAndConfirmOrderButton();

    const paymentDone = new PaymentDonePage(page);
    await expect(paymentDone.getSuccessMessage()).toBeVisible();
  });
});
