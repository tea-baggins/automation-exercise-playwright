import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import LoginPage from "../pageObject/loginPage";
import SignupPage from "../pageObject/signupPage";
import AccountCreatedPage from "../pageObject/accountCreatedPage";
import ProductsPage from "../pageObject/productsPage";
import ViewCartPage from "../pageObject/viewCartPage";
import CheckoutPge from "../pageObject/checkoutPage";
import { newUserSignUp, SignupData } from "../helpers/testData";
import { generateUniqueEmail } from "../helpers/utils";

test.describe("Verify address details in checkout page", () => {
  test("TC_23 |Verify address details in checkout page", async ({
    homePage,
    page
  }) => {
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
      "Account Created!",
    );
    await accountCreatedPage.clickContinueButton();
    await expect(header.getLoggedInAs()).toBeVisible();
    await header.clickProductsLink();

    const productsPage = new ProductsPage(page);
    await productsPage.hoverAndAddToCart(1);
    await productsPage.clickViewCart();

    const viewCartPage = new ViewCartPage(page);
    await expect(viewCartPage.getTableInfo()).toBeVisible();
    await viewCartPage.clickProceedToCheckoutButton();

    const checkoutPage = new CheckoutPge(page);
    await checkoutPage.getAddressDetails();
  });
});
