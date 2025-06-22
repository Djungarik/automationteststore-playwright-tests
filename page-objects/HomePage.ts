import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly featuredSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.featuredSection = page
      .getByRole("heading", { name: "Featured" })
      .locator("../..");
  }

  async getFirstFeaturedProductName() {
    return this.featuredSection
      .locator(".thumbnails.list-inline a.prdocutname")
      .first()
      .textContent();
  }

  async getFirstFeaturedProductPrice() {
    return this.featuredSection
      .locator(".thumbnails.list-inline .oneprice")
      .first()
      .textContent();
  }

  async clickFirstFeaturedProduct() {
    await this.featuredSection
      .locator(".thumbnails.list-inline a")
      .first()
      .click();
  }
}
