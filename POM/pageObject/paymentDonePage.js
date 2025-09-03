import HomePage from "./homePage";

const fs = require("fs");
const path = require("path");

class PaymentDonePage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getContinurButton: () =>
      this.page.locator("a.btn[data-qa='continue-button']"),
    getDownloadInvoiceButton: () =>
      this.page.locator("a[href^='/download_invoice/']"),
    downloadInvoiceLink: () => this.page.locator("a#invoice-download"),
  };

  getSuccessMessage() {
    return this.page.getByText(
      "Congratulations! Your order has been confirmed!"
    );
  }

  async clickContinueButton() {
    await this.locators.getContinurButton().click();
    return new HomePage(this.page);
  }

  async downloadFile(saveDirectory = "downloads") {
    try {
      // Create a folder
      fs.mkdirSync(saveDirectory, { recursive: true });

      // Waiting for download button to be visible
      await this.locators
        .getDownloadInvoiceButton()
        .waitFor({ state: "visible", timeout: 10000 });

      // Waiting for download and click
      const [download] = await Promise.all([
        this.page.waitForEvent("download", { timeout: 30000 }),
        this.locators.getDownloadInvoiceButton().click(),
      ]);

      // Path to save
      const savePath = path.join(saveDirectory, download.suggestedFilename());

      // Saving file
      await download.saveAs(savePath);
      console.log(`File saved: ${savePath}`);

      // Checking if a file exists
      if (!fs.existsSync(savePath)) {
        throw new Error("Failed to download invoice");
      }

      return savePath;
    } catch (error) {
      throw new Error(`Error downloading invoice: ${error.message}`);
    }
  }
}
export default PaymentDonePage;
