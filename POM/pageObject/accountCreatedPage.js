import HomePage from "./homePage";

class AccountCreatedPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getContinueButton: () => this.page.locator("a[data-qa='continue-button']"),
  };

  getMessageAccountCreated() {
    return this.page.getByText("Account Created!");
  }

  async clickContinueButton() {
    await this.locators.getContinueButton().click();
    return new HomePage(this.page);
  }
}
export default AccountCreatedPage;
