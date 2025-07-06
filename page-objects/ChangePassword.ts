import { Page } from "@playwright/test";

export class ChangePassword {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillChangePasswordForm(
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    await this.page
      .locator("#PasswordFrm_current_password")
      .fill(currentPassword);
    await this.page.locator("#PasswordFrm_password").fill(newPassword);
    await this.page.locator("#PasswordFrm_confirm").fill(confirmNewPassword);
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
}
