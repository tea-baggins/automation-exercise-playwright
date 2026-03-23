import { test, expect } from "../helpers/fixtures";
import AccountCreatedPage from "../pageObject/accountCreatedPage";
import CheckoutPge from "../pageObject/checkoutPage";
import Header from "../pageObject/header";
import LoginPage from "../pageObject/loginPage";
import ProductsPage from "../pageObject/productsPage";
import SignupPage from "../pageObject/signupPage";
import ViewCartPage from "../pageObject/viewCartPage";
import {
  newUserSignUp,
  SignupData,
  checkoutMessage,
  paymentInfo,
} from "../helpers/testData";
import { generateUniqueEmail } from "../helpers/utils";
import PaymentPage from "../pageObject/paymentPage";
import PaymentDonePage from "../pageObject/paymentDonePage";

test.describe("Download Invoice after purchase order", () => {
  test("TC_24 |Verify download invoice after purchase order", async ({
    homePage,
    page
  }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickProductsLink();

    const productsPage = new ProductsPage(page);
    await productsPage.hoverAndAddToCart(1);
    await productsPage.clickViewCart();

    const viewCartPage = new ViewCartPage(page);
    await expect(viewCartPage.getTableInfo()).toBeVisible();
    await viewCartPage.clickProceedToCheckoutButton();
    await viewCartPage.clickRegisterLoginLinkModalLink();

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

    await header.clickCartLink();
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

    const paymentDonePage = new PaymentDonePage(page);
    await expect(paymentDonePage.getSuccessMessage()).toBeVisible();

    // Download the invoice and check
    const savePath = await paymentDonePage.downloadFile();
    console.log(`Invoice downloaded on the path: ${savePath}`);

    await paymentDonePage.clickContinueButton();
  });
});
