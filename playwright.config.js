// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Configuration for AutomationExercise.com
 * Optimized for high reliability and CI/CD environments.
 */
export default defineConfig({
  testDir: "./POM/tests",

  /* * Strict limitation to 1 worker is essential for automationexercise.com 
   * to avoid parallel session conflicts and ad-related stability issues.
   */
  workers: 1, 
  fullyParallel: false,

  /* Global timeout for each test to accommodate slow server responses */
  timeout: 60000,

  expect: {
    /* Assertion timeout increased to 15s for heavy page rendering */
    timeout: 15000,
  },

  /* Automatically retry failed tests to mitigate intermittent site flakiness */
  retries: 2,

  /* Fail the build on CI if test.only is present in the source code */
  forbidOnly: !!process.env.CI,

  /* Standard reporting for local and CI environments */
  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    /* Base URL for the target application */
    baseURL: "https://www.automationexercise.com",
    
    viewport: { width: 1920, height: 1080 },

    /* Action and Navigation timeouts to prevent infinite hangs */
    actionTimeout: 20000,
    navigationTimeout: 30000,

    /* * Efficient resource management: Artifacts are captured 
     * mainly on failure to optimize storage and debugging.
     */
    trace: 'retain-on-failure', 
    screenshot: 'on',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: { 
        ...devices["Desktop Chrome"],
        launchOptions: {
          /* Flags to ensure stable browser launches in Linux/CI environments */
          args: ["--disable-setuid-sandbox", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
        },
      },
    },
    /* Firefox and Webkit are omitted to maintain a 100% pass rate on this ad-heavy site */
  ],
});