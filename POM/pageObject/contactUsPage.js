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
    getHomeButton: () => this.page.locator("#contact-page a.btn-success"),
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

  chooseFileButton() {
    return this.locators.getUploadFileButton();
  }

  /**
   * Uploads a file to the Contact Us form.
   * The relative path to the file from the project root.
   */
  async uploadFile(file) {
    // Resolve the relative file path to an absolute path based on the current working directory
    const absolutePath = path.resolve(process.cwd(), file);

    // Optional: Log the absolute path for debugging purposes during test execution
    // console.log(`Attempting to upload file from: ${absolutePath}`);

    const uploadLocator = this.locators.getUploadFileButton();

    // Attach the file to the input element using Playwright's setInputFiles
    await uploadLocator.setInputFiles(absolutePath);

    // Brief pause to ensure the UI updates the "No file chosen" label to the actual filename
    await this.page.waitForTimeout(1000);
  }

  /**
   * Cleans up the UI from ads, handles the browser confirmation dialog,
   * and submits the contact form.
   */
  async clickSubmitButton() {
    // 1. Remove intrusive ads that may overlay or obstruct the 'Submit' button
    await this.page.evaluate(() => {
      const selectors = "ins.adsbygoogle, #aswift_0_host, iframe, .grippy-host";
      document.querySelectorAll(selectors).forEach((el) => el.remove());
    });

    await this.page.waitForTimeout(1000);

    // 2. Set up a one-time listener to automatically accept the browser 'Confirm' dialog
    // This must be declared before the action that triggers the dialog
    this.page.once("dialog", async (dialog) => {
      // console.log(`Dialog detected: ${dialog.message()}`);
      await dialog.accept();
    });

    // 3. Perform the click action on the Submit button
    await this.locators.getSubmitButton().click();

    // 4. Wait for the page to reach a stable state after form submission
    // 'networkidle' ensures that no more network requests are being made
    await this.page.waitForLoadState("networkidle");
  }

  async clickHomeButton() {
    await this.locators.getHomeButton().click();
    return new HomePage(this.page);
  }
}
export default ContactUsPage;
