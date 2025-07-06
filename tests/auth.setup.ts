import { test as setup } from "@playwright/test";
import { PageManager } from "../page-objects/PageManager";

setup("authenticate", async ({ page }) => {
  const testUser = require("../test-data/test-user.json");
  await page.goto("/");

  const pm = new PageManager(page);

  await pm.navigateTo().loginOrRegister();

  await page.locator("#loginFrm_loginname").fill(testUser.loginName);
  await page.locator("#loginFrm_password").fill(testUser.password);
  await page.getByRole("button", { name: "Login" }).click();

  await page.context().storageState({ path: ".auth/user.json" });
});
