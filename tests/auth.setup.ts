import { test as setup } from "@playwright/test";
import { PageManager } from "../page-objects/PageManager";
import testUser from "../test-data/test-user.json";
const authFile = ".auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/");

  const pm = new PageManager(page);

  await pm.navigateTo().loginOrRegister();

  await page.locator("#loginFrm_loginname").fill(testUser.loginName);
  await page.locator("#loginFrm_password").fill(testUser.password);
  await page.getByRole("button", { name: "Login" }).click();

  await page.context().storageState({ path: authFile });
});
