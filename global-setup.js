// global-setup.js
const { chromium, expect } = require("@playwright/test");
require("dotenv").config();

async function globalSetup() {
  console.log("🔐 Starting global setup for authentication...");

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const username = process.env.LINKEDIN_USERNAME;
  const password = process.env.LINKEDIN_PASSWORD;

  if (!username || !password) {
    throw new Error(
      "Please set LINKEDIN_USERNAME and LINKEDIN_PASSWORD in your .env file"
    );
  }

  // Go to login page directly
  await page.goto("https://www.linkedin.com/login", {
    waitUntil: "domcontentloaded",
  });

  // Fill credentials
  await page.fill("#username", username);
  await page.fill("#password", password);
  await page.click("//button[normalize-space()='Sign in']");

  // Wait for a known post-login element (adjust locator as needed)
  await expect(
    page.locator("//span[@class='truncate block text-align-left']")
  ).toBeVisible({ timeout: 10000 });

  console.log("✅ Login successful, saving auth state...");

  await page.context().storageState({ path: "./auth.json" });
  await browser.close();

  console.log("✅ Global setup complete.");
}

module.exports = globalSetup;
