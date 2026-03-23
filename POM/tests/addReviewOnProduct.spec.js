import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import ProductDetailsPage from "../pageObject/productDetailsPage";
import ProductsPage from "../pageObject/productsPage";
import { writeYourReview } from "../helpers/testData";

test.describe("Add review on product", () => {
  test("TC_21 |Verify add review on product", async ({ homePage, page }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeAttached({});

    const header = new Header(page);
    await header.clickProductsLink({ force: true });

    const productsPage = new ProductsPage(page);
    await expect(productsPage.allProductsHeader()).toBeVisible();
    await productsPage.clickViewProductLink();

    const productDetailsPage = new ProductDetailsPage(page);
    await expect(productDetailsPage.getWriteYourReviewText()).toBeVisible();
    await productDetailsPage.fillYourNameField(writeYourReview.name);
    await productDetailsPage.fillEmailaddressField(
      writeYourReview.emailAddress,
    );
    await productDetailsPage.fillAddReviewHereField(
      writeYourReview.addReviewTextArea,
    );
    await productDetailsPage.clickSubmitButton();
    await productDetailsPage.acceptConfirmationPopup();
    await expect(
      productDetailsPage.getSuccessMessage(writeYourReview.message),
    ).toBeVisible();
  });
});
