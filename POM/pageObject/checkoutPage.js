import { expect } from "@playwright/test";
import PaymentPage from "./paymentPage";

class CheckoutPge {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getAddCommentTextField: () => this.page.locator("textarea.form-control"),
    getPlaceOrederButton: () =>
      this.page.locator("a.btn.btn.btn-default.check_out"),
    getAddressDelivery: () => this.page.locator("#address_delivery"),
    getAddressInvoice: () => this.page.locator("#address_invoice"),
  };

  async getAddressDetails() {
    // We expect that the addresses are visible
    await expect(this.locators.getAddressDelivery()).toBeVisible();
    await expect(this.locators.getAddressInvoice()).toBeVisible();

    // We receive address texts
    const deliveryText = await this.locators.getAddressDelivery().textContent();
    const invoiceText = await this.locators.getAddressInvoice().textContent();

    // Cleaning texts
    const cleanDelivery = deliveryText
      .replace("Your delivery address", "")
      .trim();
    const cleanInvoice = invoiceText.replace("Your billing address", "").trim();

    // Check that the addresses match
    expect(cleanDelivery).toBe(cleanInvoice);
  }

  async enterAddCommentField(addCommentText) {
    await this.locators.getAddCommentTextField().fill(addCommentText);
    return this;
  }

  async clickPlaceOrderButton() {
    await this.locators.getPlaceOrederButton().click();
    return new PaymentPage(this.page);
  }
}
export default CheckoutPge;
