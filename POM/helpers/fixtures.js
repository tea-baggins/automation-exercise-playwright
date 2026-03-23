import { test as base, expect } from "@playwright/test";
import HomePage from "../pageObject/homePage";

/**
 * Custom test extension to provide Page Objects as fixtures.
 * This ensures clean, reusable, and maintainable test code.
 */
const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    // Ensure the page is navigated to the base URL if it's currently empty
    if (page.url() === "about:blank") {
      await page.goto("/", { waitUntil: "domcontentloaded" });
    }

    await use(homePage);
  },
});

/**
 * Global hooks to handle environmental instabilities such as
 * dynamic ads and slow initial page loads on AutomationExercise.com.
 */
test.beforeEach(async ({ page }) => {
  // Navigate to the base application URL
  await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60000 });

  /**
   * Utility to clean up intrusive third-party advertisements.
   * Removing these elements prevents click interception and improves test stability.
   */
  const cleanAds = async () => {
    await page.evaluate(() => {
      const adSelectors =
        'iframe, .adsbygoogle, #aswift_0_host, .vignette, [aria-label="Advertisement"]';
      document.querySelectorAll(adSelectors).forEach((ad) => ad.remove());
    });
  };

  await cleanAds();

  /**
   * "Smart" verification: Check if the application logo is present.
   * If the page fails to load correctly within 5 seconds, a single retry (reload)
   * is performed to ensure the test environment is ready.
   */
  try {
    await page
      .locator("div.logo.pull-left")
      .waitFor({ state: "attached", timeout: 5000 });
  } catch (e) {
    // Retry logic for potential site downtime or network hangs
    await page.reload({ waitUntil: "domcontentloaded" });
    await cleanAds();
    await page
      .locator("div.logo.pull-left")
      .waitFor({ state: "attached", timeout: 10000 });
  }
});

export { test, expect };
