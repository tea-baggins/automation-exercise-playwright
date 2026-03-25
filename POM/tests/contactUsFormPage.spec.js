import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import ContactUsPage from "../pageObject/contactUsPage";
import { contactUsData, filePath } from "../helpers/testData.js";

test.describe("Contact Us Form", () => {
  test("TC_06 |Verify contact us form", async ({ homePage, page }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickContactUsLink();

    const contactUsPage = new ContactUsPage(page);
    await expect(contactUsPage.getGetInTouchText()).toBeVisible();

    await contactUsPage.fillNameField(contactUsData.name);
    await contactUsPage.fillEmailField(contactUsData.email);
    await contactUsPage.fillSubjectField(contactUsData.subject);
    await contactUsPage.fillMessageField(contactUsData.message);

    await expect(contactUsPage.chooseFileButton()).toBeEnabled();

    // Upload the file to the form
    await contactUsPage.uploadFile(filePath.file);

    // Capture and attach a screenshot to the Allure report to verify the file is attached
    await test.info().attach('Contact Us Form - File Attached', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });

    await contactUsPage.clickSubmitButton();

    const successMsg = contactUsPage.locators.getSuccessSubmissionMessage();
    await expect(successMsg).toContainText(
      contactUsData.successSubmitionMessage,
      { timeout: 15000 },
    );

    // Attach a final screenshot to the Allure report showing the success state
    await test.info().attach('Final Success State', {
      body: await page.screenshot(),
      contentType: 'image/png',
      });

    await contactUsPage.clickHomeButton();
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();
  });
});
