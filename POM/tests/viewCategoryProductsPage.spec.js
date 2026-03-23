import { test, expect } from "../helpers/fixtures";
import CategoryProductsPage from "../pageObject/categoryProductsPage";

test.describe("View Category Products", () => {
  test("TC_18 |Verify view category products", async ({ homePage, page }) => {
    await expect(homePage.getLogoAutomationExercise()).toBeVisible();

    await expect(homePage.getCategoryLeftSideBar()).toHaveText("Category");
    await homePage.clickWomenCategory();
    await homePage.clickCategoryLinkUnderWomenCategory();

    const categoryProductsPage = new CategoryProductsPage(page);
    await expect(categoryProductsPage.getCategoryPageTitleWomen()).toHaveText(
      /Dress Products/,
    );
    await categoryProductsPage.clickMenLinkLeftSideBar();
    await categoryProductsPage.clickCategoryLinkUnderMenCategory();
    await expect(categoryProductsPage.getCategoryPageTitleMen()).toHaveText(
      /Tshirts Products/,
    );
  });
});
