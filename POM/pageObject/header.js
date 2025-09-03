import CartPage from "./cartPage";
import ContactUsPage from "./contactUsPage";
import DeleteAccountPage from "./deleteAccountPage";
import LoginPage from "./loginPage";
import ProductsPage from "./productsPage";
import TestCasesPage from "./testCasesPage";

class Header {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getHomePageLink: () => this.page.locator('.navbar-nav a[href="/"]'),
    getProductLink: () => this.page.locator("a[href='/products']"),
    getSignupLoginLink: () =>
      this.page.getByRole("link", { name: "Signup / Login" }),
    getContactUsLink: () => this.page.getByText("Contact us"),
    getDeleteAccountLink: () => this.page.locator("a[href='/delete_account']"),
    getLogoutLink: () => this.page.locator("a[href='/logout']"),
    getTestCasesLink: () => this.page.locator("li a[href='/test_cases']"),
    getCartLink: () =>
      this.page.locator("div.shop-menu.pull-right a[href='/view_cart']"),
  };

  async clickContactUsLink() {
    await this.locators.getContactUsLink().click();
    return new ContactUsPage(this.page);
  }

  async clickProductsLink() {
    await this.locators.getProductLink().click();
    return new ProductsPage(this.page);
  }

  async clickSignupLoginLink() {
    await this.locators.getSignupLoginLink().click();
    return new LoginPage(this.page);
  }

  getLoggedInAs() {
    return this.page.getByText("Logged in as Sue");
  }

  async clickDeleteAccounLinkt() {
    await this.locators.getDeleteAccountLink().click();
    return new DeleteAccountPage(this.page);
  }

  async clickLogoutLink() {
    await this.locators.getLogoutLink().click();
    return new LoginPage(this.page);
  }

  async clickTetsCasesLink() {
    await this.locators.getTestCasesLink().click();
    return new TestCasesPage(this.page);
  }

  async clickCartLink() {
    await this.locators.getCartLink().click();
    return new CartPage(this.page);
  }
}
export default Header;
