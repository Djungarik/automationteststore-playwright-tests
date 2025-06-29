import { Page } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillRegisterForm(
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    fax: string,
    company: string,
    address1: string,
    address2: string,
    city: string,
    country: string,
    zone: string,
    zipcode: string,
    loginName: string,
    password: string,
    subscribe: string
  ) {
    await this.page.locator("#AccountFrm_firstname").fill(firstName);
    await this.page.locator("#AccountFrm_lastname").fill(lastName);
    await this.page.locator("#AccountFrm_email").fill(email);
    await this.page.locator("#AccountFrm_telephone").fill(telephone);
    await this.page.locator("#AccountFrm_fax").fill(fax);
    await this.page.locator("#AccountFrm_company").fill(company);
    await this.page.locator("#AccountFrm_address_1").fill(address1);
    await this.page.locator("#AccountFrm_address_2").fill(address2);
    await this.page.locator("#AccountFrm_country_id").selectOption(country);
    await this.page.locator("#AccountFrm_city").fill(city);
    await this.page.locator("#AccountFrm_zone_id").selectOption(zone);
    await this.page.locator("#AccountFrm_postcode").fill(zipcode);
    await this.page.locator("#AccountFrm_loginname").fill(loginName);
    await this.page.locator("#AccountFrm_password").fill(password);
    await this.page.locator("#AccountFrm_confirm").fill(password);
    await this.page.locator(`#AccountFrm_newsletter${subscribe}`).click();
    await this.page.locator("#AccountFrm_agree").click();
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
}
