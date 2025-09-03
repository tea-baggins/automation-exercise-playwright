import { test, expect } from "../helpers/fixtures";
import HomePage from "../pageObject/homePage";
import Header from "../pageObject/header";
import ProductsPage from "../pageObject/productsPage";
import ViewCartPage from "../pageObject/viewCartPage";

// Function for parsing:
function cleanParseFloat(text) {
  if (!text) return NaN;
  const cleaned = text.trim().replace(/[^0-9.]/g, "");
  return cleaned ? parseFloat(cleaned) : NaN;
}

function cleanParseInt(text) {
  if (!text) return NaN;
  const cleaned = text.trim().replace(/[^0-9]/g, "");
  return cleaned ? parseInt(cleaned, 10) : NaN;
}

test.describe("Add Products in Cart", () => {
  test("TC_12 | Verify add products in cart", async ({ page }) => {
    const homePage = new HomePage(page);
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

    for (let i = 0; i < productCount; i++) {
      const { name, priceText, quantityText, totalText } =
        await viewCartPage.getProductInfo(i);

      expect(name).toBeTruthy();

      const price = cleanParseFloat(priceText);
      const quantity = cleanParseInt(quantityText);
      const total = cleanParseFloat(totalText);

      if (isNaN(price) || isNaN(quantity) || isNaN(total)) {
        throw new Error(
          `Incorrect product data by index ${i}: price = ${price}, quantity = ${quantity}, total = ${total}`
        );
      }

      expect(total).toBeCloseTo(price * quantity, 2);
    }
  });
});
