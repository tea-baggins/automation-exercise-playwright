import HomePage from "./homePage";
import SignupPage from "./signupPage";

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  locators = {
    //New User Signup!
    getInputFieldName: () => this.page.getByPlaceholder("Name"),
    getInputFieldEmailAddresSignup: () =>
      this.page.locator("input[data-qa='signup-email']"),
    getSignupButton: () => this.page.locator('button[data-qa="signup-button"]'),

    //Login to your account
    getInputFieldEmailAddressLogin: () =>
      this.page.locator("input[data-qa='login-email']"),
    getInputFieldPassword: () =>
      this.page.locator("input[data-qa='login-password']"),
    getLoginButton: () => this.page.locator("button[data-qa='login-button']"),
  };

  //New User Signup!
  getNewUserSignup() {
    return this.page.getByText("New User Signup!");
  }

  async fillNameField(name) {
    await this.locators.getInputFieldName().fill(name);
    return this;
  }

  async fillEmaiAddresslFieldSignup(emailAddress) {
    await this.locators.getInputFieldEmailAddresSignup().fill(emailAddress);
    return this;
  }

  async clickSignupButton() {
    await this.locators.getSignupButton().click();
    return new SignupPage(this.page);
  }

  getErrorMessageEmailAddressExistText() {
    return this.page.getByText("Email Address already exist!");
  }

  //Login to your account
  getLoginToYourAccount() {
    return this.page.getByText("Login to your account");
  }

  async fillEmailAddressFieldLogin(emailAddress) {
    await this.locators.getInputFieldEmailAddressLogin().fill(emailAddress);
    return this;
  }

  async fillPasswordField(password) {
    await this.locators.getInputFieldPassword().fill(password);
    return this;
  }

  async clickLoginButton() {
    await this.locators.getLoginButton().click();
    return new HomePage(this.page);
  }

  getErrorMessageText() {
    return this.page.getByText("Your email or password is incorrect!");
  }
}
export default LoginPage;
