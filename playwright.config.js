// playwright.config.js
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  globalSetup: "./global-setup.js", // This will run before tests
  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    storageState: "./auth.json", // Session state created in global setup
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
