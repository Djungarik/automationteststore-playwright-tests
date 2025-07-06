import { test, expect } from "../fixtures";
import { PageManager } from "../page-objects/PageManager";
import newUser from "../test-data/new-user.json";

test("register a new user", async ({ page, helperBase }, testInfo) => {
  testInfo.setTimeout(40_000);
  const pm = new PageManager(page);

  await pm.navigateTo().loginOrRegister();

  await page.getByRole("button", { name: "Continue" }).click();

  const todaysDateAndTime = helperBase.getTodaysDateWithCurrentTime();

  const lastName = `${newUser.lastName}-${todaysDateAndTime}`;
  const baseEmail = newUser.email;
  const [prefix, domain] = baseEmail.split("@");
  const email = `${prefix}_${todaysDateAndTime}@${domain}`;
  const loginName = `${newUser.loginName}${todaysDateAndTime}`;

  await pm
    .onRegisterPage()
    .fillRegisterForm(
      newUser.firstName,
      lastName,
      email,
      newUser.telephone,
      newUser.fax,
      newUser.company,
      newUser.address1,
      newUser.address2,
      newUser.city,
      newUser.country,
      newUser.zone,
      newUser.zipcode,
      loginName,
      newUser.password,
      newUser.subscribe.no
    );

  await expect(page.locator(".maintext")).toContainText(
    "Your Account Has Been Created!"
  );

  await page.getByRole("link", { name: "Continue" }).click();

  await expect(page.locator(".heading1 .subtext")).toContainText(
    newUser.firstName
  );

  await page.locator("[data-original-title='Logoff']").click();

  await expect(
    page.getByText(
      "You have been logged off your account. It is now safe to leave the computer."
    )
  ).toBeVisible();

  await page.getByRole("link", { name: "Continue" }).click();

  await pm.navigateTo().loginOrRegister();

  await page.locator("#loginFrm_loginname").fill(loginName);
  await page.locator("#loginFrm_password").fill(newUser.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator(".heading1 .subtext")).toContainText(
    newUser.firstName
  );
});
