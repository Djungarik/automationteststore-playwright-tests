import { test, expect } from "../fixtures";
import { PageManager } from "../page-objects/PageManager";
import newUser from "../test-data/new-user.json";

test.beforeEach(async ({ browserName }, testInfo) => {
  if (browserName === "webkit") {
    testInfo.slow(browserName == "webkit");
  }
});

test("register a new user", async ({ page, helperBase }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().loginOrRegister();

  await pm.onAccountLoginOrRegisterPage().startNewCustomerRegistration();

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

  await pm.onAccountPage().clickLogoffTile();

  await expect(
    page.getByText(
      "You have been logged off your account. It is now safe to leave the computer."
    )
  ).toBeVisible();

  await page.getByRole("link", { name: "Continue" }).click();

  await pm.navigateTo().loginOrRegister();

  await pm
    .onAccountLoginOrRegisterPage()
    .fillReturningCustomerForm(loginName, newUser.password);

  await expect(page.locator(".heading1 .subtext")).toContainText(
    newUser.firstName
  );
});

test("user can change the password", async ({ page, helperBase }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().loginOrRegister();

  await pm.onAccountLoginOrRegisterPage().startNewCustomerRegistration();

  const todaysDateAndTime = helperBase.getTodaysDateWithCurrentTime();

  const lastName = `ChangePassword-${newUser.lastName}-${todaysDateAndTime}`;
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

  await pm.onAccountPage().clickChangePasswordTile();

  await pm
    .onChangePasswordPage()
    .fillChangePasswordForm(
      newUser.password,
      newUser.newPassword,
      newUser.newPassword
    );

  await expect(
    page.getByText("Success: Your password has been successfully updated.")
  ).toBeVisible();

  await pm.onAccountPage().clickLogoffTile();

  await pm.navigateTo().loginOrRegister();

  await pm
    .onAccountLoginOrRegisterPage()
    .fillReturningCustomerForm(loginName, newUser.newPassword);

  await expect(page.locator(".heading1 .subtext")).toContainText(
    newUser.firstName
  );
});

test("user can edit account details", async ({ page, helperBase }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().loginOrRegister();

  await pm.onAccountLoginOrRegisterPage().startNewCustomerRegistration();

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

  await pm.onAccountPage().clickEditAccountDetailsTile();

  const newFirstName = `Edit ${newUser.firstName}`;
  const newLastName = `Edit ${lastName}`;
  const newEmail = `edit${email}`;
  const newPhone = "1111111111";
  const newFax = "2222222";

  await pm
    .onEditAccountDetailsPage()
    .fillEditAccountDetailsForm(
      newFirstName,
      newLastName,
      newEmail,
      newPhone,
      newFax
    );

  await expect(page.locator(".alert-success")).toContainText(
    "Success: Your account has been successfully updated."
  );

  await expect(page.locator(".heading1 .subtext")).toContainText(newFirstName);

  await pm.onAccountPage().clickEditAccountDetailsTile();

  await expect(page.locator("#AccountFrm_firstname")).toHaveAttribute(
    "value",
    newFirstName
  );
  await expect(page.locator("#AccountFrm_lastname")).toHaveAttribute(
    "value",
    newLastName
  );
  await expect(page.locator("#AccountFrm_email")).toHaveAttribute(
    "value",
    newEmail
  );
  await expect(page.locator("#AccountFrm_telephone")).toHaveAttribute(
    "value",
    newPhone
  );
  await expect(page.locator("#AccountFrm_fax")).toHaveAttribute(
    "value",
    newFax
  );
});
