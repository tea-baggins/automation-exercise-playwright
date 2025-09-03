import path from "path";
import HomePage from "./homePage";

class ContactUsPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getInputFieldName: () => this.page.getByPlaceholder("Name"),
    getInputFieldEmail: () => this.page.locator("input[data-qa='email']"),
    getInputSubject: () => this.page.locator("input[data-qa='subject']"),
    getInputFieldMessage: () => this.page.locator("#message"),
    getUploadFileButton: () => this.page.locator("input[name='upload_file']"),
    getSubmitButton: () => this.page.locator("input[data-qa='submit-button']"),
    getSuccessSubmissionMessage: () =>
      this.page.locator("div.status.alert.alert-success"),
    getHomeButton: () => this.page.locator(".fa.fa-angle-double-left"),
  };

  getGetInTouchText() {
    return this.page.getByText("Get In Touch");
  }

  async fillNameField(name) {
    await this.locators.getInputFieldName().fill(name);
    return this;
  }

  async fillEmailField(email) {
    await this.locators.getInputFieldEmail().fill(email);
    return this;
  }

  async fillSubjectField(subject) {
    await this.locators.getInputSubject().fill(subject);
    return this;
  }

  async fillMessageField(message) {
    await this.locators.getInputFieldMessage().fill(message);
    return this;
  }

  async uploadFile(filePath) {
    const absolutePath = path.join(process.cwd(), filePath);
    await this.locators.getUploadFileButton().setInputFiles(absolutePath);
  }

  chooseFileButton() {
    return this.locators.getUploadFileButton();
  }

  async clickSubmitButton() {
    await this.locators.getSubmitButton().click();
    return this;
  }

  async acceptConfirmationPopup() {
    await this.page.on("dialog", async (alert) => await alert.accept());
  }

  async clickHomeButton() {
    await this.locators.getHomeButton().click();
    return new HomePage(this.page);
  }
}
export default ContactUsPage;
