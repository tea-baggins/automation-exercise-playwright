import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import ProductsPage from "../pageObject/productsPage";
import ViewCartPage from "../pageObject/viewCartPage";

test.describe("Remove Products From Cart", () => {
  test("TC_17 |Verify remove products from cart", async ({
    homePage,
    page,
  }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickProductsLink();

    const productsPage = new ProductsPage(page);
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShoppingButton();
    await productsPage.hoverAndAddToCart(1);
    await productsPage.clickViewCart();

    const viewCartPage = new ViewCartPage(page);
    await expect(viewCartPage.getTableInfo()).toBeVisible();

    const productCount = await viewCartPage.getProductCount();
    expect(productCount).toBe(2);

    await viewCartPage.clickDeleteProductButton(0);
    // I expect that the product with index 0 will be removed from the DOM
    await page.locator("tr#product-1").waitFor({ state: "detached" });

    // Check that the product has actually been removed (for example, the number of products has decreased)
    const count = await viewCartPage.getProductCount();
    expect(count).toBe(1);
  });
});
