import { Page } from "@playwright/test";

export class AccountPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickEditAccountDetailsTile() {
    await this.page.locator(".nav-dash li").nth(0).click();
  }
  async clickChangePasswordTile() {
    await this.page.locator(".nav-dash li").nth(1).click();
  }
  async clickManageAddressBookTile() {
    await this.page.locator(".nav-dash li").nth(2).click();
  }
  async clickMyWishListTile() {
    await this.page.locator(".nav-dash li").nth(3).click();
  }
  async clickOrderHistoryTile() {
    await this.page.locator(".nav-dash li").nth(4).click();
  }
  async clickTransactionHistoryTile() {
    await this.page.locator(".nav-dash li").nth(5).click();
  }
  async clickDownloadsTile() {
    await this.page.locator(".nav-dash li").nth(6).click();
  }
  async clickNotificationsTile() {
    await this.page.locator(".nav-dash li").nth(7).click();
  }
  async clickLogoffTile() {
    await this.page.locator(".nav-dash li").nth(8).click();
  }
}
