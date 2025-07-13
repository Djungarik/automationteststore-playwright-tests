import { Page } from "@playwright/test";

export class AddressBookPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillAddressForm(
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    city: string,
    country: string,
    zone: string,
    zipcode: string,
    defaultAddress: string
  ) {
    await this.page.locator("#AddressFrm_country_id").selectOption(country);
    await this.page.locator("#AddressFrm_firstname").fill(firstName);
    await this.page.locator("#AddressFrm_lastname").fill(lastName);
    await this.page.locator("#AddressFrm_company").fill(company);
    await this.page.locator("#AddressFrm_address_1").fill(address1);
    await this.page.locator("#AddressFrm_address_2").fill(address2);
    await this.page.locator("#AddressFrm_city").fill(city);
    await this.page.locator("#AddressFrm_zone_id").selectOption(zone);
    await this.page.locator("#AddressFrm_postcode").fill(zipcode);
    await this.page.locator(`#AddressFrm_default${defaultAddress}`).click();
  }
  async clearAddressForm() {
    await this.page.locator("#AddressFrm_firstname").clear();
    await this.page.locator("#AddressFrm_lastname").clear();
    await this.page.locator("#AddressFrm_company").clear();
    await this.page.locator("#AddressFrm_address_1").clear();
    await this.page.locator("#AddressFrm_address_2").clear();
    await this.page.locator("#AddressFrm_city").clear();
    await this.page.locator("#AddressFrm_postcode").clear();
  }

  async getAllAddressEntries(): Promise<string[]> {
    const addressCells = this.page.locator(
      ".genericbox tbody tr td:first-child"
    );
    const count = await addressCells.count();
    const entries: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await addressCells.nth(i).innerText();
      entries.push(text.replace(/\s+/g, " ").trim() || "");
    }
    return entries;
  }

  async clickEditLastAddressEntry() {
    await this.page
      .locator(".genericbox")
      .last()
      .locator("tbody tr td")
      .nth(1)
      .getByRole("button", { name: "edit" })
      .click();
  }
}
