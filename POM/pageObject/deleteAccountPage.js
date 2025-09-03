import HomePage from "./homePage";

class DeleteAccountPage {
  constructor(page) {
    this.page = page;
  }

  locatros = {
    getContinueButton: () => this.page.locator("a[data-qa='continue-button']"),
  };

  getAccountDeleted() {
    return this.page.getByText("Account Deleted!");
  }

  async clickContinueButton() {
    await this.locatros.getContinueButton().click();
    return new HomePage(this.page);
  }
}
export default DeleteAccountPage;
