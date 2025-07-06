import { Page } from "@playwright/test";

export class AccountLoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillReturningCustomerForm(loginName: string, password: string) {
    await this.page.locator("#loginFrm_loginname").fill(loginName);
    await this.page.locator("#loginFrm_password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async startNewCustomerRegistration() {
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
}
