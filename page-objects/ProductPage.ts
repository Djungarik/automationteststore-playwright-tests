import { Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getProductName() {
    return this.page.locator(".bgnone").textContent();
  }

  async getProductPrice() {
    return this.page.locator(".productfilneprice").textContent();
  }

  async getTotalPrice() {
    await this.page.waitForSelector(".total-price", { state: "visible" });
    return this.page.locator(".total-price").textContent();
  }

  async getQuantity() {
    return this.page.locator("#product_quantity").getAttribute("value");
  }

  async getModel() {
    const modelText = await this.page
      .locator(".productinfo li")
      .first()
      .textContent();
    return modelText?.replace("Model: ", "").trim() || "";
  }

  async addToCart() {
    await this.page.getByRole("link", { name: "Add to Cart" }).click();
  }

  async setProductQuantity(value: string) {
    await this.page.locator("#product_quantity").clear();
    await this.page.locator("#product_quantity").fill(value);
  }
}
