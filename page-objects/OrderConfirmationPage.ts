import { Page } from "@playwright/test";

export class OrderConfirmationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getConfirmationMessage() {
    return this.page.locator(".maintext").textContent();
  }
}
