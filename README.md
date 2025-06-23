# Playwright Test Automation Framework

This repository contains a Playwright-based test automation framework for web application testing, specifically targeting the LinkedIn login and job search functionalities as examples.

## 🚀 Getting Started

Follow these steps to get your test environment set up and run the tests.

### Prerequisites

- Node.js (LTS version recommended)
- npm (Node Package Manager, comes with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

2.  **Install project dependencies:**
    This will install Playwright, `dotenv`, and other necessary packages.

    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    Playwright needs to download the browser binaries it controls.
    ```bash
    npx playwright install
    ```

### Configuration

1.  **Create a `.env` file:**
    In the root directory of your project (where `playwright.config.js` is located), create a file named `.env`. This file will store sensitive credentials and user-specific data, and **should not be committed to version control**.

    The `global-setup.js` script will use these credentials to log in and create an authentication state for your tests.

    Add the following lines to your `.env` file, replacing the placeholder values with your actual LinkedIn credentials and expected logged-in user name:

    ```
    # .env
    LINKEDIN_USERNAME=your_email@example.com
    LINKEDIN_PASSWORD=YourSecurePassword123!
    LINKEDIN_LOGGEDINUSER=Your Name On LinkedIn
    BASE_URL=https://www.linkedin.com
    ```

    **Important:** Make sure `Your Name On LinkedIn` exactly matches the display name you expect after logging in.

2.  **Authentication State (`auth.json`):**
    This framework uses a `global-setup.js` script to log in once and save the authenticated browser session into an `auth.json` file. All subsequent tests will then start with this pre-authenticated state, significantly speeding up test execution by avoiding repeated logins.

    **The `auth.json` file is automatically generated and should NOT be committed to Git.**

3.  **Add `.env` and `auth.json` to `.gitignore`:**
    To prevent sensitive data and volatile session information from being accidentally committed, ensure your `.gitignore` file includes these entries:

    ```
    # .gitignore
    .env
    auth.json
    node_modules/
    test-results/
    playwright-report/
    # ... other ignored files/folders
    ```

## ⚙️ Running Tests

All tests are configured via `playwright.config.js` and can be run using the Playwright CLI. Due to the `globalSetup`, tests will automatically start in a logged-in state.

### Run all tests

```bash
npx playwright test
```
