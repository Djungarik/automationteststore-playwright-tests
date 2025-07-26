import { Page } from "@playwright/test";

export class ContactUsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillAndSubmitContactUsForm(
    firstName: string,
    email: string,
    enquiry: string
  ) {
    await this.page.locator("#ContactUsFrm_first_name").fill(firstName);
    await this.page.locator("#ContactUsFrm_email").fill(email);
    await this.page.locator("#ContactUsFrm_enquiry").fill(enquiry);

    await this.page.getByRole("button", { name: "Submit" }).click();
  }
}
