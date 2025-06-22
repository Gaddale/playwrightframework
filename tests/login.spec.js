import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Functionality", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
  });

  test("should successfully log in with valid credentials", async ({
    page,
  }) => {
    const username = process.env.LINKEDIN_USERNAME;
    const password = process.env.LINKEDIN_PASSWORD;
    const loggedInUser = process.env.LINKEDIN_LOGGEDINUSER;
    await loginPage.login(username, password);
    await expect(await loginPage.isUserLoggedIn()).toBe(true);
    await console.log(await loginPage.getLoggedInUsername());
    await expect(await loginPage.getLoggedInUsername()).toBe(loggedInUser);
  });
});
