import CheckoutPge from "./checkoutPage";
import LoginPage from "./loginPage";

class ViewCartPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getTableInfo: () =>
      this.page.locator("table#cart_info_table.table.table-condensed"),
    getProductName1: () =>
      this.page.locator("tr#product-1 td.cart_description h4 a"),
    getProduct1PriceText: () =>
      this.page.locator("tr#product-1 td.cart_price p"),
    getProduct1QuantityText: () =>
      this.page.locator("tr#product-1 td.cart_quantity button.disabled"),
    getProduct1TotalPriceText: () =>
      this.page.locator("tr#product-1 td.cart_total p.cart_total_price"),

    getProductName2: () =>
      this.page.locator("tr#product-2 td.cart_description h4 a"),
    getProduct2PriceText: () =>
      this.page.locator("tr#product-2 td.cart_price p"),
    getProduct2QuantityText: () =>
      this.page.locator("tr#product-2 td.cart_quantity button.disabled"),
    getProduct2TotalPriceText: () =>
      this.page.locator("tr#product-2 td.cart_total p.cart_total_price"),
    getProductCount: () => this.page.locator(".cart_product"),
    getQunatityDisplayed: () => this.page.locator("button.disabled"),
    getViewCartLinkModal: () =>
      this.page.locator(".modal-content a[href='/view_cart']"),

    getProceedeToCheckoutButton: () =>
      this.page.locator("a.btn.btn-default.check_out"),
    getRegisterLoginLinkModal: () =>
      this.page.locator(".modal-content a[href='/login']"),
    getDeleteProductButton: () =>
      this.page.locator("td.cart_delete a.cart_quantity_delete"),
    getRegisterLoginLinkModal: () =>
      this.page.locator(".modal-body a[href='/login']"),
  };

  async getProductCount() {
    return await this.page.locator(".cart_product").count();
  }

  getTableInfo() {
    return this.page.locator("table#cart_info_table.table.table-condensed");
  }

  // First product
  async getProductName1() {
    return await this.page
      .locator("tr#product-1 td.cart_description h4 a")
      .innerText();
  }

  async getProduct1PriceText() {
    return await this.page.locator("tr#product-1 td.cart_price p").innerText();
  }

  async getProduct1QuantityText() {
    return await this.page
      .locator("tr#product-1 td.cart_quantity button.disabled")
      .innerText();
  }

  async getProduct1TotalPriceText() {
    return await this.page
      .locator("tr#product-1 td.cart_total p.cart_total_price")
      .innerText();
  }

  // Second product
  async getProductName2() {
    return await this.page
      .locator("tr#product-2 td.cart_description h4 a")
      .innerText();
  }

  async getProduct2PriceText() {
    return await this.page.locator("tr#product-2 td.cart_price p").innerText();
  }

  async getProduct2QuantityText() {
    return await this.page
      .locator("tr#product-2 td.cart_quantity button.disabled")
      .innerText();
  }

  async getProduct2TotalPriceText() {
    return await this.page
      .locator("tr#product-2 td.cart_total p.cart_total_price")
      .innerText();
  }

  async getProductInfo(index) {
    // Use index-based selectors here:
    const rowSelector = `tr#product-${index + 1}`;
    const name = await this.page
      .locator(`${rowSelector} td.cart_description h4 a`)
      .innerText();
    const priceText = await this.page
      .locator(`${rowSelector} td.cart_price p`)
      .innerText();
    const quantityText = await this.page
      .locator(`${rowSelector} td.cart_quantity button.disabled`)
      .innerText();
    const totalText = await this.page
      .locator(`${rowSelector} td.cart_total p.cart_total_price`)
      .innerText();

    return { name, priceText, quantityText, totalText };
  }

  async clickViewCart() {
    const viewCartBtn = this.locators.getViewCartLinkModal();
    await viewCartBtn.waitFor({ state: "visible" });
    await viewCartBtn.click();
    return new ViewCartPage(this.page);
  }

  getDisplayedQuntityInCart() {
    return this.page.locator("button.disabled");
  }

  async clickDeleteProductButton(index = 0) {
    await this.locators.getDeleteProductButton().nth(index).click();
    // Waiting for UI to update (row to be deleted) after clicking
    await this.page
      .locator(`tr#product-${index + 1}`)
      .waitFor({ state: "detached" });
    return this;
  }

  getClickProceedToCheckoutButton() {
    return this.page.locator("a.btn.btn-default.check_out").click();
  }

  async clickProceedToCheckoutButton() {
    await this.locators.getProceedeToCheckoutButton().click();
    return new CheckoutPge(this.page);
  }

  async clicKRegisterLogin() {
    const registerLoginBtn = this.locators.getRegisterLoginLinkModal();
    await registerLoginBtn.waitFor({ state: "visible" });
    await registerLoginBtn.click();
    return new LoginPage(this.page);
  }

  async clickRegisterLoginLinkModalLink() {
    await this.locators.getRegisterLoginLinkModal().click();
    return new LoginPage(this.page);
  }
}
export default ViewCartPage;
