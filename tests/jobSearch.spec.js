import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { JobsPage } from "../pages/JobsPage";

test.describe("Job search functionality", () => {
  let loginPage;
  let jobsPage;

  test.beforeEach(async ({ page }) => {
    // loginPage = new LoginPage(page);
    // await loginPage.gotoLoginPage();
    jobsPage = new JobsPage(page);
    await page.goto("/");
    // const username = process.env.LINKEDIN_USERNAME;
    // const password = process.env.LINKEDIN_PASSWORD;
    // const loggedInUser = process.env.LINKEDIN_LOGGEDINUSER;
    // await loginPage.login(username, password);
    // await expect(await loginPage.isUserLoggedIn()).toBe(true);
  });

  test("should search for 'Software Engineer' and filter by 'Entry level", async ({
    page,
  }) => {
    await page.waitForTimeout(6000);
    await jobsPage.navigateToJobs();
    await jobsPage.searchjob("Software Engineer");
    await jobsPage.applyFilters("Experience Level", "Entry level");
    await expect(await jobsPage.getJobResultCount()).toBeGreaterThan(0);
    expect(await jobsPage.isJobTitlePresent("Software Engineer")).toBe(true);
  });
  // Add more tests for different filters, invalid searches, etc.
});
