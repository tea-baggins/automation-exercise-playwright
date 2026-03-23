import CheckoutPage from "./checkoutPage";
import LoginPage from "./loginPage";

class ViewCartPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getTableInfo: () =>
      this.page.locator("table#cart_info_table.table.table-condensed"),
    getCartTable: () => this.page.locator("table#cart_info_table"),
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

  /**
   * Counts the number of products currently present in the cart table.
   * @returns {Promise<number>} The total count of product rows.
   */
  async getProductCount() {
    /**
     * 1. Wait for the table container to be attached to the DOM.
     * This ensures the shopping cart data has been loaded from the server
     * before we attempt to count the rows.
     */
    await this.getTableInfo().waitFor({ state: "attached", timeout: 15000 });

    /**
     * 2. Locate and count all table rows where the ID starts with 'product-'.
     * Using a prefix selector ensures we only count actual product entries.
     */
    return await this.page.locator('tr[id^="product-"]').count();
  }
  getTableInfo() {
    return this.locators.getCartTable();
  }

  /**
   * Verifies if the Cart page is correctly loaded and contains products.
   * Includes a debug screenshot and explicit error handling for empty states.
   * @returns {Promise<Locator>} The cart info table locator if successful.
   */
  async isCartPageLoaded() {
    // 1. Wait for the URL transition to the checkout/view_cart area
    await this.page.waitForURL("**/view_cart", { timeout: 15000 });

    /**
     * 2. Debugging Tool: Capture a screenshot of the current view.
     * This is crucial for CI/CD environments to visually confirm
     * why a test might have failed during the cart verification.
     */
    await this.page.screenshot({ path: "cart_debug.png" });

    const table = this.page.locator("table#cart_info_table");
    const emptyCartText = this.page.getByText("Cart is empty");

    /**
     * 3. Explicit Validation: Check if the "Cart is empty" message is visible.
     * If true, we throw a custom error to immediately identify that
     * the product addition step failed before reaching the cart.
     */
    if (await emptyCartText.isVisible()) {
      throw new Error(
        "Validation Failed: The cart is empty. Products were not added successfully!",
      );
    }

    // 4. Ensure the cart table is attached to the DOM before proceeding
    await table.waitFor({ state: "attached", timeout: 15000 });

    return table;
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
    return new CheckoutPage(this.page);
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
