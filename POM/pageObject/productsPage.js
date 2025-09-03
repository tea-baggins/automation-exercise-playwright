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
    getSubmitSearcButton: () => this.page.locator("button#submit_search"),
    getSearchedProductsHeader: () =>
      this.page
        .locator("h2.title.text-center")
        .filter({ hasText: "Searched Products" }),
    getSearchedProductsList: () =>
      this.page.locator(".features_items .col-sm-4"),

    getProductCard: (index) =>
      this.page.locator(".features_items .col-sm-4").nth(index),
    getContinueShoppingButton: () =>
      this.page.locator(".btn.btn-success.close-modal.btn-block"),
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
    await this.locators.getSubmitSearcButton().click();
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
    const card = this.locators.getProductCard(index);
    await card.hover();
    const overlayButton = card.locator(".product-overlay a[data-product-id]");
    await overlayButton.waitFor({ state: "visible" });
    await overlayButton.click();
  }

  async clickContinueShoppingButton() {
    const button = this.locators.getContinueShoppingButton();
    await button.waitFor({ state: "visible" });
    await button.click();
  }

  async clickViewCart() {
    const viewCartBtn = this.locators.getViewCartLinkModal();
    await viewCartBtn.waitFor({ state: "visible" });
    await viewCartBtn.click();
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
