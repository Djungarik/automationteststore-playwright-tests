import { Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectGuestCheckout() {
    await this.page.locator("input[value='guest']").click();
    await this.page.getByRole("button", { name: "Continue" }).click();
  }

  async fillGuestForm(
    firstName: string,
    lastName: string,
    email: string,
    address1: string,
    city: string,
    zone: string,
    zipcode: string
  ) {
    await this.page.locator("#guestFrm_firstname").fill(firstName);
    await this.page.locator("#guestFrm_lastname").fill(lastName);
    await this.page.locator("#guestFrm_email").fill(email);
    await this.page.locator("#guestFrm_address_1").fill(address1);
    await this.page.locator("#guestFrm_city").fill(city);
    await this.page.locator("#guestFrm_zone_id").selectOption(zone);
    await this.page.locator("#guestFrm_postcode").fill(zipcode);
    await this.page.getByRole("button", { name: "Continue" }).click();
  }

  async getShippingDetails() {
    const nameCell = await this.page
      .locator(".confirm_shippment_options tbody tr td")
      .nth(0)
      .textContent();

    const addressCell = await this.page
      .locator(".confirm_shippment_options tbody tr td")
      .nth(1)
      .innerText();

    const shippingMethodCell = await this.page
      .locator(".confirm_shippment_options tbody tr td")
      .nth(2)
      .textContent();

    return {
      name: nameCell || "",
      address: addressCell?.replace(/\s+/g, " ").trim() || "",
      shippingMethod: shippingMethodCell || "",
    };
  }

  async getPaymentDetails() {
    const nameCell = await this.page
      .locator(".confirm_payment_options tbody tr td")
      .nth(0)
      .textContent();

    const addressCell = await this.page
      .locator(".confirm_payment_options tbody tr td")
      .nth(1)
      .innerText();

    const paymentMethodCell = await this.page
      .locator(".confirm_payment_options tbody tr td")
      .nth(2)
      .textContent();

    return {
      name: nameCell || "",
      address: addressCell?.replace(/\s+/g, " ").trim() || "",
      paymentMethod: paymentMethodCell || "",
    };
  }

  async getOrderSummary() {
    const productName = await this.page
      .locator(".confirm_products tbody tr td")
      .nth(1)
      .textContent();

    const productPrice = await this.page
      .locator(".confirm_products tbody tr td")
      .nth(2)
      .textContent();

    const quantity = await this.page
      .locator(".confirm_products tbody tr td")
      .nth(3)
      .textContent();

    return { productName, productPrice, quantity };
  }

  async getTotalDetails() {
    const subtotal = await this.page
      .locator(".table-striped tbody tr")
      .nth(0)
      .locator("td")
      .nth(1)
      .textContent();

    const shipping = await this.page
      .locator(".table-striped tbody tr")
      .nth(1)
      .locator("td")
      .nth(1)
      .textContent();

    const total = await this.page
      .locator(".table-striped tbody tr")
      .nth(2)
      .locator("td")
      .nth(1)
      .textContent();

    return { subtotal, shipping, total };
  }

  async confirmOrder() {
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("confirm") &&
          response.request().method() === "GET" &&
          response.status() === 200
      ),
      this.page.getByRole("button", { name: "Confirm Order" }).click(),
      this.page.waitForURL("**/index.php?rt=checkout/success"),
    ]);
  }
}
