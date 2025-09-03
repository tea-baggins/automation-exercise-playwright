import { test, expect } from "../helpers/fixtures";
import HomePage from "../pageObject/homePage";
import ViewCartPage from "../pageObject/viewCartPage";

test.describe("Add to cart from Recommended items", () => {
  test("TC_22 |Verify add to cart from recommended items", async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    await homePage.scrollToBottom();
    await expect(homePage.getRecommendedItems()).toBeVisible();
    await homePage.clickAddToCartButtonRecommended();

    const viewCartPage = new ViewCartPage(page);
    await viewCartPage.clickViewCart();
    await expect(viewCartPage.getTableInfo()).toBeVisible();
  });
});
