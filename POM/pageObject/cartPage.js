class CartPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getShoppingCartHeader: () => this.page.getByText("Shopping Cart"),
  };

  getShoppingCartHeader() {
    return this.locators.getShoppingCartHeader();
  }
}
export default CartPage;
