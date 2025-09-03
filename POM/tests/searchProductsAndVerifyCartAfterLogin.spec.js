import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import HomePage from "../pageObject/homePage";
import LoginPage from "../pageObject/loginPage";
import ProductsPage from "../pageObject/productsPage";
import ViewCartPage from "../pageObject/viewCartPage";
import { loginToYourAccountForm } from "../helpers/testData";

test.describe("Search Products and Verify Cart After Login", () => {
  test("TC_20 |Verify search products and verify cart after login", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickProductsLink();

    const productsPage = new ProductsPage(page);
    await expect(productsPage.allProductsHeader()).toBeVisible();
    await productsPage.searchProductField();
    await productsPage.clickSubmitSearchButton();
    await expect(productsPage.searchedProductsHeader()).toBeVisible();
    await expect(productsPage.searchedProductsFirstItem()).toBeVisible();

    const count = await productsPage.searchedProductsCount();
    expect(count).toBeGreaterThan(0);

    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShoppingButton();
    await productsPage.hoverAndAddToCart(1);
    await productsPage.clickViewCart();

    const viewCartPage = new ViewCartPage(page);
    await expect(viewCartPage.getTableInfo()).toBeVisible();

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

    await header.clickCartLink();
    await expect(viewCartPage.getTableInfo()).toBeVisible();
  });
});
