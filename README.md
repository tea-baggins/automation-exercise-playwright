# Automation Exercise Playwright 2025

<p align="center">
  <img src="https://www.automationexercise.com/static/images/home/logo.png" alt="Website for practice automation" width="350" />
</p>

AutomationExercise is a public e-commerce demo site created for QA engineers to practice automation and API testing at any level, from beginner to advanced. This framework provides automated UI test coverage for the site's core features using Playwright and JavaScript.

## 🚀 Features

- Automated UI tests for registration, login, product search, product cart management, and checkout procedure.
- Clean Page Object Model architecture for easy maintenance.
- Tests include validation of UI elements, cart price, file downloads, etc.
- Global setup and teardown ensure a consistent starting state for tests.

## 📁 Project Structure

- `/pages/` — Page Object classes for UI components and methods.
- `/tests/` — Contains test files written in JavaScript using Playwright.
- `/data/` — Test data files (e.g., JSON files for test inputs).
- `package.json` — Defines project dependencies and scripts.
- `playwright.config.js` — Playwright configuration file.

## 📚 Prerequisites

- Chrome, Firefox, or WebKit browser (Playwright supports multiple browsers).
- [Node.js version 18 or higher](https://nodejs.org/en/download).
- npm (comes bundled with Node.js).
- VSCode or any code editor.
- Playwright (installed automatically via npm).

## ⚙ How to Run

1. Clone the repository  
   `git clone https://github.com/tea-baggins/automation-exercise-playwright`
2. Navigate to the project folder  
   `cd automationexercise-playwright`
3. Install dependencies  
   `npm install`
4. Run Playwright tests in headed mode (with UI)  
   `npx playwright test --headed`
5. Run all tests headlessly (CLI)  
   `npx playwright test`
6. Generate and view the Playwright HTML report  
   `npx playwright show-report`

_Note:_ Global setup and teardown run before and after each test to reset the testing environment.

### Debugging

To debug tests, use Playwright’s Inspector or debug mode:  
`npx playwright test --debug`

## 🧑‍💻 Project Coding Convention

- Page Object files: camelCase (e.g., `headerPage.js`, `loginPage.js`).
- Test files: camelCase with `.spec.js` extension (e.g., `addProductsInCart.spec.js`).
- Use descriptive names for `test.describe` blocks (feature or scenario) and `test` blocks (test case), e.g., `TC_11 | Verify add products in cart`.

### Example Test Structure

```
import { test, expect } from '@playwright/test';

test.describe('Add Products in Cart', () => {
  test('TC_11 | Verify add products in cart', async ({ page }) => {
    // Test steps here
  });
});
```

## 📜 MUST-FOLLOW RULES

- Do not install any new libraries, plugins, or tools without approval.
- Do not modify existing configuration files (`playwright.config.js`, `package.json`, etc.) unless instructed.
- Focus changes on test scripts and test-related assets only.
- Commit only test-related files; do not commit build files, lock files, or config files unless necessary.

**Do not push changes to these files:**

- `README.md`
- `package.json`
- `package-lock.json`
- `playwright.config.js`
- `.gitignore`
- Any other non-test-related files

## 📝 License

## This project is open-source and intended for educational purposes.
Practice your automation skills at: [https://www.automationexercise.com](https://www.automationexercise.com)