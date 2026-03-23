import { test, expect } from "../helpers/fixtures";
import BrandProductsPage from "../pageObject/brandProductsPage";
import Header from "../pageObject/header";
import ProductsPage from "../pageObject/productsPage";

test.describe("View and Cart Brand Products", () => {
  test("TC_19 |Verify view and cart brand products", async ({
    homePage,
    page
  }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickProductsLink();

    const productsPage = new ProductsPage(page);
    await expect(productsPage.getBrandsLeftSideBar()).toBeVisible();
    await productsPage.clickPoloBrandLeftSideBar();

    const brandProductsPage = new BrandProductsPage(page);
    await expect(brandProductsPage.getBrandPoloProductsTitle()).toHaveText(
      /Polo Products/,
    );
    await brandProductsPage.clickMadameBrandLeftSideBarLink();
    await expect(brandProductsPage.getBrandMadameProductsTitle()).toHaveText(
      /Madame Products/,
    );
  });
});
