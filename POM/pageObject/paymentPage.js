import PaymentDonePage from "./paymentDonePage";

class PaymentPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getInputNameOncardField: () =>
      this.page.locator("[data-qa='name-on-card']"),
    getInputCardNumberField: () =>
      this.page.locator(".form-control.card-number"),
    getInputCVCField: () => this.page.locator(".form-control.card-cvc"),
    getInputExpirationMonthField: () =>
      this.page.locator(".form-control.card-expiry-month"),
    getInputExpirationYearField: () =>
      this.page.locator(".form-control.card-expiry-year"),
    getPayAndConfirmOrderButton: () => this.page.locator("#submit"),
  };

  async fillNameOncardField(nameOnCard) {
    await this.locators.getInputNameOncardField().fill(nameOnCard);
    return this;
  }

  async fillCardNumberField(nameOnCard) {
    await this.locators.getInputCardNumberField().fill(nameOnCard);
    return this;
  }

  async fillCVCField(cvc) {
    await this.locators.getInputCVCField().fill(cvc);
    return this;
  }

  async fillExpirationMonthField(expirationMonth) {
    await this.locators.getInputExpirationMonthField().fill(expirationMonth);
    return this;
  }

  async fillExpirationYearField(expirationYear) {
    await this.locators.getInputExpirationYearField().fill(expirationYear);
    return this;
  }

  async clickPayAndConfirmOrderButton() {
    await this.locators.getPayAndConfirmOrderButton().click();
    return new PaymentDonePage(this.page);
  }
}
export default PaymentPage;
