import ViewCartPage from "./viewCartPage";

class ProductDetailsPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getProductName: () => this.page.locator(".product-information h2"),
    getProductCategory: () =>
      this.page
        .locator(".product-information p")
        .filter({ hasText: "Category" }),
    getProductPrice: () => this.page.locator(".product-information span span"),
    getProductAvailability: () =>
      this.page
        .locator(".product-information p")
        .filter({ hasText: "Availability" }),
    getProductCondition: () =>
      this.page
        .locator(".product-information p")
        .filter({ hasText: "Condition" }),
    getProductBrand: () =>
      this.page.locator(".product-information p").filter({ hasText: "Brand" }),
    getInputQuantity: () => this.page.locator("input#quantity"),
    getAddToCartButton: () => this.page.locator("button.btn.btn-default.cart"),
    getInputYourNameField: () => this.page.locator("input#name"),
    getInputEmailAddressField: () => this.page.locator("input#email"),
    getInputAddReviewHereTextField: () => this.page.locator("textarea#review"),
    getSubmitButton: () => this.page.locator("button#button-review"),
  };

  getProductName() {
    return this.page.locator(".product-information h2");
  }

  getProductCategory() {
    return this.page.locator(".product-information p", { hasText: "Category" });
  }

  getProductPrice() {
    return this.page.locator(".product-information span span");
  }

  getProductAvailability() {
    return this.page.locator(".product-information p", {
      hasText: "Availability",
    });
  }

  getProductCondition() {
    return this.page.locator(".product-information p", {
      hasText: "Condition",
    });
  }

  getProductBrand() {
    return this.page.locator(".product-information p", { hasText: "Brand" });
  }

  getQuantityInput() {
    return this.page.locator("input#quantity");
  }

  async clickAddToCartButton() {
    await this.locators.getAddToCartButton().click();
    return new ViewCartPage(this.page);
  }

  getWriteYourReviewText() {
    return this.page.getByText("Write Your Review");
  }

  async fillYourNameField(name) {
    await this.locators.getInputYourNameField().fill(name);
    return this;
  }
  async fillEmailaddressField(email) {
    await this.locators.getInputEmailAddressField().fill(email);
    return this;
  }

  async fillAddReviewHereField(text) {
    await this.locators.getInputAddReviewHereTextField().fill(text);
    return this;
  }

  async clickSubmitButton() {
    await this.locators.getSubmitButton().click();
    return this;
  }

  async acceptConfirmationPopup() {
    await this.page.on("dialog", async (alert) => await alert.accept());
  }

  getSuccessMessage(message) {
    return this.page.getByText(message);
  }
}
export default ProductDetailsPage;
