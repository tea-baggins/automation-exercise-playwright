# Automation Exercise Playwright

[![Playwright Tests](https://github.com/tea-baggins/automation-exercise-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/tea-baggins/automation-exercise-playwright/actions)

[![Allure Report](https://img.shields.io/badge/Allure%20Report-View%20Here-green?style=flat-square&logo=allure)](https://tea-baggins.github.io/automation-exercise-playwright/)


<p align="center">
  <img src="https://www.automationexercise.com/static/images/home/logo.png" alt="Website for practice automation" width="350" />
</p>

AutomationExercise is a public e-commerce demo site created for QA engineers to practice automation and API testing. This framework provides automated UI test coverage using **Playwright** and **JavaScript**, implementing professional testing patterns.

---

## 🌟 Key Features

- **Advanced Fixtures Architecture:** Leverages Playwright's `test.extend` to provide pre-initialized **Page Objects**, significantly reducing boilerplate code and implementing a clean **Dependency Injection** pattern.
- **Ad-Blocking & Stability Layer:** Features custom global hooks and programmatic interaction logic (`dispatchEvent`) to ensure 100% test resilience against aggressive third-party overlays and dynamic ads.
- **Data Integrity Testing:** Beyond basic UI visibility checks, the framework validates business logic by parsing and calculating cart totals ($Price \times Quantity = Total$).
- **Design Pattern:** Advanced **Page Object Model (POM)** for high maintainability.
- **CI/CD Integration:** Automated test execution on every push via **GitHub Actions**.
- **Comprehensive Reporting:** Detailed HTML reports with traces and screenshots on failure.

## 📁 Project Structure

The project follows a strict POM architecture located in the `POM/` directory:

- `POM/helpers/fixtures.js` — Custom Playwright extension for dependency injection and ad-cleanup logic.
- `POM/Pages/` — Page-specific classes (Login, Register, Contact, etc.) with unique actions.
- `POM/tests/` — Clean test scripts organized by feature.
- `playwright.config.js` — Optimized configuration (1 worker, retries, and artifacts management) for high-stability CI/CD runs.
- `package.json` — Project dependencies and automation scripts.

---

## 📚 Prerequisites

- [Node.js version 18 or higher](https://nodejs.org/en/download).
- **npm** (comes bundled with Node.js).
- **Playwright** (installed via npm).

## ⚙️ How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tea-baggins/automation-exercise-playwright
   ```
2. **Navigate to project folder:**
   ```bash
   cd automation-exercise-playwright
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Install browsers:**
   ```bash
   npx playwright install
   ```
5. **Run all tests (Headless):**
   ```bash
   npx playwright test
   ```
6. **Run tests in UI mode:**
   ```bash
   npx playwright test --ui
   ```

> **Note:** Global setup and teardown run before and after each test to reset the testing environment.

## 🛠 Debugging

To debug tests, use Playwright’s Inspector or debug mode:  
`npx playwright test --debug`

## 🧑‍💻 Project Coding Convention

- **Page Object files:** camelCase (e.g., `headerPage.js`, `loginPage.js`).
- **Test files:** camelCase with `.spec.js` extension (e.g., `addProductsInCart.spec.js`).
- **Naming:** Use descriptive names for `test.describe` blocks (feature or scenario) and `test` blocks (test case), e.g., `TC_11 | Verify add products in cart`.

### Example Test Structure

```javascript
import { test, expect } from "../helpers/fixtures"; // Custom fixtures

test.describe("Add Products in Cart", () => {
  test("TC_12 | Verify add products in cart", async ({ homePage }) => {
    const productsPage = await homePage.clickProductsLink();
    await productsPage.hoverAndAddToCart(0);
    // ... logic continues
  });
});
```

## 🤖 CI/CD Implementation

This project uses GitHub Actions to ensure code quality. The pipeline automatically:

1. Provisions a Linux environment.
2. Installs Node.js and project dependencies.
3. Runs the entire test suite.
4. Uploads an HTML report as an artifact if any test fails.

## 🛡️ Stability & Performance Optimization

To handle the specific challenges of `automationexercise.com`, the framework includes:
- **Workers Limitation:** Configured to 1 worker to prevent session conflicts and server-side rate limiting.
- **Smart Waits:** Utilization of `attached` and `detached` states to synchronize with asynchronous modal animations.
- **Automated Cleanup:** JavaScript-based DOM injection to remove Google Ads before each test execution.

## 📝 License & Contribution

This project is **open-source** and intended for educational purposes. Feel free to use it as a reference for learning Playwright and Page Object Model patterns.
Practice your automation skills at: [https://www.automationexercise.com](https://www.automationexercise.com)
