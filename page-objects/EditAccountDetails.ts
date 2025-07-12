import { Page } from "@playwright/test";

export class EditAccountDetails {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillEditAccountDetailsForm(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    fax: string
  ) {
    await this.page.locator("#AccountFrm_firstname").fill(firstName);
    await this.page.locator("#AccountFrm_lastname").fill(lastName);
    await this.page.locator("#AccountFrm_email").fill(email);
    await this.page.locator("#AccountFrm_telephone").fill(phone);
    await this.page.locator("#AccountFrm_fax").fill(fax);
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
}
