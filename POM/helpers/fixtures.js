import { test as base, expect } from "@playwright/test";
import HomePage from "../pageObject/homePage";

const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

test.beforeEach(async ({ homePage }) => {
  await homePage.loadHomePage();
  await expect(homePage.getLogoAutomationExercise()).toBeVisible();
});

export { test, expect };
