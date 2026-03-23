import BrandProductsPage from "./brandProductsPage";
import ProductDetailsPage from "./productDetailsPage";
import ViewCartPage from "./viewCartPage";

class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getAllProductsHeader: () => this.page.locator("h2.title.text-center"),
    getViewProductLink: () => this.page.locator("a[href='/product_details/1']"),
    getSearchInputField: () => this.page.locator("input#search_product"),
    getSubmitSearchButton: () => this.page.locator("button#submit_search"),
    getSearchedProductsHeader: () =>
      this.page
        .locator("h2.title.text-center")
        .filter({ hasText: "Searched Products" }),
    getSearchedProductsList: () =>
      this.page.locator(".features_items .col-sm-4"),

    getProductCard: (index) =>
      this.page.locator(".features_items .col-sm-4").nth(index),
    getContinueShoppingButton: () =>
      this.page.locator("button.btn.btn-success.close-modal.btn-block"),
    getViewCartLinkModal: () =>
      this.page.locator(".modal-content a[href='/view_cart']"),
    getPoloBrandLeftSideBar: () =>
      this.page.locator("a[href='/brand_products/Polo']"),
  };

  allProductsHeader() {
    return this.locators.getAllProductsHeader();
  }

  async clickViewProductLink() {
    await this.locators.getViewProductLink().click();
    return new ProductDetailsPage(this.page);
  }

  async searchProductField() {
    await this.locators.getSearchInputField().fill("Jeans");
    return this;
  }

  async clickSubmitSearchButton() {
    await this.locators.getSubmitSearchButton().click();
    return this;
  }

  searchedProductsHeader() {
    return this.locators.getSearchedProductsHeader();
  }

  async searchedProductsCount() {
    return await this.locators.getSearchedProductsList().count();
  }

  searchedProductsFirstItem() {
    return this.locators.getSearchedProductsList().first();
  }

  async hoverAndAddToCart(index) {
    // 1. Get the specific product card based on the provided index
    const card = this.locators.getProductCard(index);

    // 2. Locate the STATIC "Add to Cart" button (the one inside .productinfo)
    // This avoids using the overlay button which is often blocked by ads or animations
    const addToCartButton = card.locator(".productinfo a.add-to-cart");

    // 3. Scroll the element into view to ensure Playwright can "see" it in the viewport
    await addToCartButton.scrollIntoViewIfNeeded();

    // 4. Perform a JavaScript-level click using .evaluate()
    // This GUARANTEES the click happens even if invisible ads or overlays are blocking the element
    await addToCartButton.evaluate((node) => node.click());

    // 5. Wait for the confirmation modal (popup) to appear
    // This ensures the product was successfully added to the server-side session
    const modal = this.page.locator(".modal-content");
    await modal.waitFor({
      state: "visible",
      timeout: 10000,
    });
  }

  async clickContinueShoppingButton() {
    const continueButton = this.locators.getContinueShoppingButton();

    /**
     * 1. Wait for the button to be attached to the DOM.
     * We use 'attached' instead of 'visible' because the site's modal animations
     * can sometimes make the element technically invisible during the transition.
     */
    await continueButton.waitFor({ state: "attached", timeout: 10000 });

    /**
     * 2. Perform a JavaScript-level click.
     * Using node.click() via evaluate bypasses standard actionability checks,
     * which is necessary when elements are obstructed by fading overlays or animations.
     */
    await continueButton.evaluate((node) => node.click());

    /**
     * 3. Synchronization: Wait for the modal/button to disappear.
     * This ensures the test doesn't proceed to the next step until the UI has stabilized.
     */
    await continueButton.waitFor({ state: "hidden", timeout: 5000 });
  }

  async clickViewCart() {
    const viewCartBtn = this.locators.getViewCartLinkModal();

    /**
     * 1. Wait for the link to be attached to the DOM.
     * Modal transitions on this site can briefly report elements as 'hidden',
     * so we wait for 'attached' state to ensure the element exists in the code.
     */
    await viewCartBtn.waitFor({ state: "attached", timeout: 10000 });

    /**
     * 2. Perform a programmatic JavaScript click.
     * This bypasses any animation-related interception (like fading overlays)
     * that might occur immediately after adding a product to the cart.
     */
    await viewCartBtn.evaluate((node) => node.click());

    // 3. Navigate to the View Cart page object
    return new ViewCartPage(this.page);
  }

  getBrandsLeftSideBar() {
    return this.page.getByText("Brands");
  }

  async clickPoloBrandLeftSideBar() {
    await this.locators.getPoloBrandLeftSideBar().click();
    return new BrandProductsPage(this.page);
  }
}
export default ProductsPage;
