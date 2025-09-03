class TestCasesPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getTestCaseHeading: () => this.page.locator("b", { hasText: "Test Cases" }),
  };

  testCasesText() {
    return this.locators.getTestCaseHeading();
  }
}
export default TestCasesPage;
