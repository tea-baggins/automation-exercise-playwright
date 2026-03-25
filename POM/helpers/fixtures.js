import { test as base, expect } from "@playwright/test";
import HomePage from "../pageObject/homePage";

/**
 * Playwright Fixtures Extension.
 * This pattern implements Dependency Injection, providing pre-configured
 * Page Objects directly to the test methods. It ensures clean, modular,
 * and highly maintainable test code.
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
 * Global Hooks for Environmental Stability.
 * AutomationExercise.com is known for heavy ad traffic and inconsistent load times.
 * These hooks implement proactive stabilization strategies.
 */
test.beforeEach(async ({ page }) => {
  /**
   * 1. NETWORK LEVEL AD BLOCKING
   * Intercepts and aborts requests to known ad providers and analytics scripts.
   * This prevents ads from loading entirely, significantly increasing test speed
   * and preventing "click intercepted" errors.
   */
  await page.route(
    "**/*{google-analytics,googlesyndication,doubleclick,googleadservices,adsbygoogle}**",
    (route) => route.abort(),
  );

  // Navigate to the base application URL with a robust timeout and DOM state check
  await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60000 });

  /**
   * 2. DOM CLEANUP UTILITY
   * Specifically targets and removes intrusive third-party advertisement overlays
   * that might persist or inject late into the DOM.
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
   * 3. PROACTIVE ENVIRONMENT VERIFICATION (Smart Wait & Retry)
   * Verifies the core application state by checking for the logo.
   * Implements a retry logic (reload) to handle potential network hangs
   * or site-specific downtime, ensuring a reliable test execution environment.
   */
  try {
    await page
      .locator("div.logo.pull-left")
      .waitFor({ state: "attached", timeout: 5000 });
  } catch (e) {
    // Perform a single reload retry if the initial load fails to detect the logo
    await page.reload({ waitUntil: "domcontentloaded" });
    await cleanAds();
    await page
      .locator("div.logo.pull-left")
      .waitFor({ state: "attached", timeout: 10000 });
  }
});

export { test, expect };
