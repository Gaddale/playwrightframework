const { basename } = require("path");

exports.JobsPage = class JobsPage {
  constructor(page) {
    this.page = page;
    this.jobsNavLink = this.page.locator('[title="Jobs"]');
    this.jobSearchInput = this.page.getByRole("combobox", {
      name: "Search by title, skill, or company",
    });
    this.locationInput = this.page.getByLabel("Location");

    this.experienceLevelFilter = this.page.getByRole("button", {
      name: "Experience Level filter",
    });
    this.easyApplyFilter = this.page.getByRole("button", {
      name: "Easy Apply filter",
    });
    this.showResultsButton = this.page.getByRole("button", {
      name: "Show results",
      exact: false,
    });

    // Job results locators
    this.jobResultsList = this.page.locator("//li[starts-with(@id,'ember')]");
    this.jobTitleInResult = (title) =>
      this.page.locator(`.job-card-container__link:has-text("${title}")`);
  }

  async navigateToJobs() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      this.jobsNavLink.click(),
    ]);
  }

  async searchjob(keyword) {
    await this.jobSearchInput.fill(keyword);
    await this.page.keyboard.press("Enter");
  }

  async applyFilters(filterName, optionText) {
    let filterButton;
    switch (filterName) {
      case "Experience Level":
        filterButton = this.experienceLevelFilter;
        break;
      case "Easy Apply":
        filterButton = this.easyApplyFilter;
        break;
      default:
        throw new Error(`Filter "${filterName}" not Implemented`);
    }

    await filterButton.click();
    const optionLabel = this.page.getByText(optionText).first();
    await optionLabel.click();
    // await this.showResultsButton.click();
    await this.page.waitForLoadState("load");
  }

  async getJobResultCount() {
    return await this.jobResultsList.count();
  }

  async isJobTitlePresent(title) {
    return await this.jobTitleInResult(title).first().isVisible();
  }
};
