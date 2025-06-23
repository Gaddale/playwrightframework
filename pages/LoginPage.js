exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInLink = "//a[normalize-space()='Sign in']";
    this.username = "#username";
    this.password = "#password";
    this.signInButton = "//button[normalize-space()='Sign in']";
    this.startAPost = "//span[@class='truncate block text-align-left']";
    this.loggedInUser = '[role="region"] h3';
  }

  async gotoLoginPage() {
    await this.page.goto("/home", {
      waitUntil: "domcontentloaded",
    });
  }

  async login(username, password) {
    await this.page.locator(this.signInLink).click();
    await this.page.locator(this.username).fill(username);
    await this.page.locator(this.password).fill(password);
    await this.page.locator(this.signInButton).click();
  }

  async isUserLoggedIn() {
    const profileSpan = this.page.locator(this.startAPost);
    await profileSpan.waitFor({ state: "attached" });
    return profileSpan.isVisible();
  }

  async getLoggedInUsername() {
    const profileSpan = this.page.locator(this.loggedInUser);
    await profileSpan.waitFor({ state: "attached" });
    const content = await profileSpan.textContent();
    return content ? content.trim() : null;
  }
};
