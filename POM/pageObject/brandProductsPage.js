class BrandProductsPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getPoloBrandLinkLeftsSideBar: () =>
      this.page.locator("a[href='/brand_products/Polo']"),
    getMadameBrandLeftSideBarLink: () =>
      this.page.locator("a[href='/brand_products/Madame']"),
  };

  getBrandPoloProductsTitle() {
    return this.page.getByText(/Brand.*Polo Products/);
  }

  getBrandMadameProductsTitle() {
    return this.page.getByText(/Brand.*Madame Products/);
  }
  async clickMadameBrandLeftSideBarLink() {
    await this.locators.getMadameBrandLeftSideBarLink().click();
    return this;
  }
}
export default BrandProductsPage;
