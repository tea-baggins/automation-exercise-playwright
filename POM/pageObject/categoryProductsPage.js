class CategoryProductsPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getMenLinkLeftSideBar: () => this.page.locator("a[href='#Men']"),
    getCategoryLinkUnderMenCategory: () =>
      this.page.locator("a[href='/category_products/3']"),
  };

  getCategoryPageTitleWomen() {
    return this.page.getByText(/Women.*Dress Products/);
  }

  getCategoryPageTitleMen() {
    return this.page.getByText(/Men.*Tshirts Products/);
  }

  async clickMenLinkLeftSideBar() {
    await this.locators.getMenLinkLeftSideBar().click();
    return this;
  }

  async clickCategoryLinkUnderMenCategory() {
    await this.locators.getCategoryLinkUnderMenCategory().click();
    return new CategoryProductsPage(this.page);
  }
}
export default CategoryProductsPage;
