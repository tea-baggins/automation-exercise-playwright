import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import ProductDetailsPage from "../pageObject/productDetailsPage";
import ProductsPage from "../pageObject/productsPage";

test.describe("Verify All Products and product detail page", () => {
  test("TC_08 |Verify all products and product detail page", async ({
    homePage,
    page
  }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickProductsLink();

    const productsPage = new ProductsPage(page);
    await expect(productsPage.allProductsHeader()).toBeVisible();
    await productsPage.clickViewProductLink();

    const productDetailsPage = new ProductDetailsPage(page);
    await expect(productDetailsPage.getProductName()).toBeVisible();
    await expect(productDetailsPage.getProductCategory()).toBeVisible();
    await expect(productDetailsPage.getProductPrice()).toBeVisible();
    await expect(productDetailsPage.getProductAvailability()).toBeVisible();
    await expect(productDetailsPage.getProductCondition()).toBeVisible();
    await expect(productDetailsPage.getProductBrand()).toBeVisible();
  });
});
