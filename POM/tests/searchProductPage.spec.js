import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import HomePage from "../pageObject/homePage";
import ProductsPage from "../pageObject/productsPage";

test.describe("Search Product", () => {
  test("TC_09 |Verify search product", async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickProductsLink();

    const productsPage = new ProductsPage(page);
    await expect(productsPage.allProductsHeader()).toBeVisible();
    await productsPage.searchProductField();
    await productsPage.clickSubmitSearchButton();
    await expect(productsPage.searchedProductsHeader()).toBeVisible();
    await expect(productsPage.searchedProductsFirstItem()).toBeVisible();

    const count = await productsPage.searchedProductsCount();
    expect(count).toBeGreaterThan(0);
  });
});
