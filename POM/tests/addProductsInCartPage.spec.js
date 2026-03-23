import { test, expect } from "../helpers/fixtures";
import Header from "../pageObject/header";
import ProductsPage from "../pageObject/productsPage";
import ViewCartPage from "../pageObject/viewCartPage";

// Utility functions for data parsing:
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
  test("TC_12 | Verify add products in cart", async ({ homePage, page }) => {
    // 1. Initial Assertion (Handled by fixture, but good to double-check)
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    const header = new Header(page);
    await header.clickProductsLink();

    // 2. Navigation and Actions (Using method chaining)
    // .clickProductsLink() should return a new ProductsPage instance
    const productsPage = new ProductsPage(page);
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShoppingButton();
    await productsPage.hoverAndAddToCart(1);
    await productsPage.clickViewCart();

    // 3. Cart Verification
    const viewCartPage = new ViewCartPage(page);
    await viewCartPage.isCartPageLoaded();
    await expect(viewCartPage.getTableInfo()).toBeVisible();

    const productCount = await viewCartPage.getProductCount();
    expect(productCount).toBe(2);

    // 4. Data Validation Loop
    for (let i = 0; i < productCount; i++) {
      const { name, priceText, quantityText, totalText } =
        await viewCartPage.getProductInfo(i);

      expect(name).toBeTruthy();

      const price = cleanParseFloat(priceText);
      const quantity = cleanParseInt(quantityText);
      const total = cleanParseFloat(totalText);

      // Explicit error message if parsing fails
      if (isNaN(price) || isNaN(quantity) || isNaN(total)) {
        throw new Error(
          `Incorrect product data by index ${i}: price = ${price}, quantity = ${quantity}, total = ${total}`,
        );
      }

      // Business logic validation: Price * Quantity = Total
      expect(total).toBeCloseTo(price * quantity, 2);
    }
  });
});
