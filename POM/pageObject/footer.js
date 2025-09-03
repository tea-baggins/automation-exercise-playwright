class Footer {
  constructor(page) {
    this.page = page;
  }

  locators = {
    getSubscribtionText: () => this.page.locator(".single-widget"),
    getInputFieldYourEmailAddress: () =>
      this.page.locator("input#susbscribe_email"),
    getSubscribeButton: () => this.page.locator("button#subscribe"),
    getSubscriptionSuccessMessage: () =>
      this.page.locator("#success-subscribe"),
  };

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  subscribtionText() {
    return this.locators.getSubscribtionText();
  }

  async fillYourEmailAddressField(emailAddress) {
    await this.locators.getInputFieldYourEmailAddress().fill(emailAddress);
    return this;
  }

  async clickSubscribeButton() {
    await this.locators.getSubscribeButton().click();
    return this;
  }

  getSubscriptionSuccessMessage() {
    return this.locators.getSubscriptionSuccessMessage();
  }
}
export default Footer;
