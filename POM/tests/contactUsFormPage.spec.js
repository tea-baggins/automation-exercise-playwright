import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import ContactUsPage from "../pageObject/contactUsPage";
import { contactUsData, filePath } from "../helpers/testData";

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

    await contactUsPage.uploadFile(filePath.file);
    await expect(contactUsPage.chooseFileButton()).toBeEnabled();

    await page.screenshot({ path: "after-upload.png" });
    await contactUsPage.acceptConfirmationPopup();
    await contactUsPage.clickSubmitButton();

    const divText = contactUsPage.locators.getSuccessSubmissionMessage();

    await expect(divText).toBeVisible();
    await expect(divText).toHaveText(contactUsData.successSubmitionMessage);
    await contactUsPage.clickHomeButton();

    await expect(homePage.getLogoAutomationExercise()).toBeVisible();
  });
});
