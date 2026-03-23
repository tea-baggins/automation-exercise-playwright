import AccountCreatedPage from "./accountCreatedPage";

class SignupPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getGender: () => this.page.locator("#id_gender2"),
    getInputFieldPassword: () =>
      this.page.locator("input#password.form-control"),
    getDate: () => this.page.locator("select#days.form-control"),
    getMonth: () => this.page.locator("select#months.form-control"),
    getYear: () => this.page.locator("select#years.form-control"),
    getSignupForNewsletterCheckbox: () => this.page.locator("#newsletter"),
    getReceiveSpecialOffersCheckbox: () => this.page.locator("input#optin"),
    getInputFieldFirstName: () => this.page.locator("#first_name"),
    getInputFieldLastname: () => this.page.locator("#last_name"),
    getInputFieldAddress: () =>
      this.page.locator("input#address1.form-control"),
    getCountry: () => this.page.locator("select#country"),
    getInputStateField: () => this.page.locator("input#state.form-control"),
    getInputCityField: () => this.page.locator("input#city.form-control"),
    getInputZipcodeField: () => this.page.locator("input#zipcode.form-control"),
    getInputMobileNumberField: () =>
      this.page.locator("input#mobile_number.form-control"),
    getCreateAccountButton: () =>
      this.page.locator("button[data-qa='create-account']"),
  };

  getEnterAccountInformationText() {
    return this.page.getByText("Enter Account Information");
  }

  async clickGenderRadioButton() {
    await this.locators.getGender().check();
    return this;
  }

  async fillPasswordField(password) {
    await this.locators.getInputFieldPassword().fill(password);
    return this;
  }

  async selectDate() {
    await this.locators.getDate().selectOption({ label: "11" });
    return this;
  }

  async selectMonth() {
    await this.locators.getMonth().selectOption({ label: "May" });
    return this;
  }
  async selectYear() {
    await this.locators.getYear().selectOption({ label: "1985" });
    return this;
  }

  async clickSignupForNewsletterCheckbox() {
    await this.locators.getSignupForNewsletterCheckbox().check();
    return this;
  }

  async clickReceiveSpecialOffersCheckbox() {
    await this.locators.getReceiveSpecialOffersCheckbox().check();
    return this;
  }

  async fillFirstNameField(firstName) {
    await this.locators.getInputFieldFirstName().fill(firstName);
    return this;
  }

  async fillLastNameField(lastName) {
    await this.locators.getInputFieldLastname().fill(lastName);
    return this;
  }

  async fillAddressField(address) {
    await this.locators.getInputFieldAddress().fill(address);
    return this;
  }

  async selectCountryDropDown() {
    await this.locators.getCountry().selectOption({ label: "Canada" });
    return this;
  }

  async fillStateField(state) {
    await this.locators.getInputStateField().fill(state);
    return this;
  }

  async fillCityField(city) {
    await this.locators.getInputCityField().fill(city);
    return this;
  }

  async fillZipcodeField(zipcode) {
    await this.locators.getInputZipcodeField().fill(zipcode);
    return this;
  }

  async fillMobileNumberField(mobileNumber) {
    await this.locators.getInputMobileNumberField().fill(mobileNumber);
    return this;
  }

  async clickCreateAccountButton() {
    const button = this.locators.getCreateAccountButton();

    // 1. Ensure the button is in the viewport to avoid hidden element issues
    await button.scrollIntoViewIfNeeded();

    // 2. Perform the click via dispatchEvent to bypass any invisible ad overlays
    await button.dispatchEvent("click");

    /** * RELIABILITY FALLBACK:
     * If the 'Account Created!' confirmation doesn't appear within 5 seconds,
     * it means the first click was likely intercepted by a dynamic ad script.
     * In this case, we perform a secondary click to ensure the form is submitted.
     */
    const successText = this.page.getByText("Account Created!");
    try {
      await successText.waitFor({ state: "visible", timeout: 5000 });
    } catch (e) {
      // Retry the click if the navigation didn't happen
      await button.dispatchEvent("click");
    }

    return new AccountCreatedPage(this.page);
  }
}
export default SignupPage;
