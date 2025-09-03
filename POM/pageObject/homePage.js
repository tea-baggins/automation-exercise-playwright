import CategoryProductsPage from "./categoryProductsPage";
import ViewCartPage from "./viewCartPage";

class HomePage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getWomenCategory: () => this.page.locator(".panel-title a[href='#Women']"),
    getWomenLinkLeftSideBar: () => this.page.locator("a[href='#Women']"),
    getCategoryLinkUnderWomenCategory: () =>
      this.page.locator("a[href='/category_products/1']"),
    scrollToRecommendedItemsBottom: () =>
      this.page.locator(".recommended_items"),
    getAddToCartButton: () =>
      this.page.locator(
        ".recommended_items a.add-to-cart[data-product-id='1']"
      ),
    getScrollUpArrow: () => this.page.locator('a[href="#top"]'),
  };

  async loadHomePage() {
    await this.page.goto("/");
  }

  getLogoAutomationExercise() {
    return this.page.locator(".logo.pull-left");
  }

  getCategoryLeftSideBar() {
    return this.page.getByText("Category");
  }

  async clickWomenCategory() {
    await this.locators.getWomenCategory().click();
    return this;
  }

  async clickWomenLinkLeftSideBar() {
    await this.locators.getWomenLinkLeftSideBar().click();
    return this;
  }

  async clickCategoryLinkUnderWomenCategory() {
    await this.locators.getCategoryLinkUnderWomenCategory().click();
    return new CategoryProductsPage(this.page);
  }

  async scrollToBottom() {
    await this.locators
      .scrollToRecommendedItemsBottom()
      .scrollIntoViewIfNeeded();
    return this;
  }

  getRecommendedItems() {
    return this.page.locator("div.recommended_items");
  }

  async clickAddToCartButtonRecommended() {
    await this.locators.getAddToCartButton().scrollIntoViewIfNeeded();
    await this.locators.getAddToCartButton().click();
    return new ViewCartPage(this.page);
  }

  getSubscriptionText() {
    return this.page.getByText("Subscription").first();
  }

  // Scroll down to bottom of page
  async scrollDown() {
    await this.page.evaluate(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
    // Waiting for scroll animation to complete
    await this.page.waitForTimeout(1000);
  }

  async clickScrollUpArrow() {
    await this.locators.getScrollUpArrow().click();
  }

  // Scroll Up to the top of the page
  async scrollUp() {
    await this.page.evaluate(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    // Waiting for scroll animation to complete
    await this.page.waitForTimeout(1000);
  }

  getFullFledgedText() {
    return this.page
      .getByText("Full-Fledged practice website for Automation Engineers")
      .first();
  }
}
export default HomePage;
