import { Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getCartRow(row = 1) {
    return this.page.locator(".product-list tbody tr").nth(row);
  }

  async getProductName(row = 1) {
    return this.getCartRow(row).locator("td").nth(1).textContent();
  }

  async getModel(row = 1) {
    return this.getCartRow(row).locator("td").nth(2).textContent();
  }

  async getProductPrice(row = 1) {
    return this.getCartRow(row).locator("td").nth(3).textContent();
  }

  async getProductQuantity(row = 1) {
    return this.getCartRow(row)
      .locator("td")
      .nth(4)
      .locator("input")
      .getAttribute("value");
  }

  async getProductTotal(row = 1) {
    return this.getCartRow(row).locator("td").nth(5).textContent();
  }

  async getShippingPrice() {
    const shippingsOption = await this.page
      .locator("#shippings option")
      .textContent();
    return shippingsOption?.replace("Flat Shipping Rate - $", "").trim() || "0";
  }

  async getTotalsTableValue(row = 0) {
    return this.page
      .locator("#totals_table tbody tr")
      .nth(row)
      .locator("td")
      .nth(1)
      .textContent();
  }

  async proceedToCheckout() {
    await this.page.locator("#cart_checkout2").click();
  }
}
