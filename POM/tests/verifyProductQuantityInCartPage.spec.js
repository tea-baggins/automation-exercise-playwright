import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import ProductDetailsPage from "../pageObject/productDetailsPage";
import ProductsPage from "../pageObject/productsPage";
import ViewCartPage from "../pageObject/viewCartPage";

test.describe("Product quantity in Cart", () => {
  test("TC_13 |Verify product quantity in cart", async ({ homePage, page }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickProductsLink();

    const producsPage = new ProductsPage(page);
    await expect(producsPage.allProductsHeader()).toBeVisible();
    await producsPage.clickViewProductLink();

    const productDetails = new ProductDetailsPage(page);
    await productDetails.getQuantityInput().fill("4");
    await expect(productDetails.getQuantityInput()).toHaveValue("4");
    await productDetails.clickAddToCartButton();

    const viewCartPage = new ViewCartPage(page);
    await viewCartPage.clickViewCart();
    await expect(viewCartPage.getDisplayedQuntityInCart()).toBeVisible();
    await viewCartPage.clickProceedToCheckoutButton();
  });
});
