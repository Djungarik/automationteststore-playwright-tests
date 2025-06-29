import { test, expect } from "../fixtures";
import { PageManager } from "../page-objects/PageManager";
import guestUser from "../test-data/guest-user.json";
import newUser from "../test-data/new-user.json";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("buy the 1st featured product as a guest user with a standard shipping from the home page", async ({
  page,
  helperBase,
}) => {
  const pm = new PageManager(page);

  const productName = await pm.onHomePage().getFirstFeaturedProductName();
  const productPrice = await pm.onHomePage().getFirstFeaturedProductPrice();
  await pm.onHomePage().clickFirstFeaturedProduct();

  expect(await pm.onProductPage().getProductName()).toContain(productName);
  expect(await pm.onProductPage().getProductPrice()).toContain(productPrice);
  expect(await pm.onProductPage().getTotalPrice()).toContain(productPrice);

  const productQuantity = await pm.onProductPage().getQuantity();
  const modelNumbers = await pm.onProductPage().getModel();

  const cleanPrice = productPrice?.replace(/[^0-9.]/g, "") || "0";
  const totalPrice = Number(productQuantity) * Number(cleanPrice);

  await pm.onProductPage().addToCart();

  expect(await pm.onCartPage().getProductName()).toContain(productName);
  expect(await pm.onCartPage().getModel()).toContain(modelNumbers);
  expect(await pm.onCartPage().getProductPrice()).toContain(productPrice);
  expect(await pm.onCartPage().getProductQuantity()).toEqual(productQuantity);
  expect(await pm.onCartPage().getProductTotal()).toContain(`$${totalPrice}`);

  const shippingPrice = await pm.onCartPage().getShippingPrice();

  expect(await pm.onCartPage().getTotalsTableValue(0)).toContain(
    `$${totalPrice}`
  );
  expect(await pm.onCartPage().getTotalsTableValue(1)).toContain(shippingPrice);

  const totalPriceWithShipping = totalPrice + Number(shippingPrice);

  expect(await pm.onCartPage().getTotalsTableValue(2)).toContain(
    `$${totalPriceWithShipping}`
  );

  await pm.onCartPage().proceedToCheckout();

  await pm.onCheckoutPage().selectGuestCheckout();

  const todaysDateAndTime = helperBase.getTodaysDateWithCurrentTime();

  const firstName = guestUser.firstName;
  const lastName = `${guestUser.lastName}-${todaysDateAndTime}`;
  const baseEmail = guestUser.email;
  const [prefix, domain] = baseEmail.split("@");
  const email = `${prefix}_${todaysDateAndTime}@${domain}`;
  const address1 = guestUser.address1;
  const city = guestUser.city;
  const zone = guestUser.zone;
  const zipcode = guestUser.zipcode;
  const shippingMethod = "Flat Shipping Rate";
  const paymentMethod = "Cash On Delivery";

  await pm
    .onCheckoutPage()
    .fillGuestForm(firstName, lastName, email, address1, city, zone, zipcode);

  const shippingDetails = await pm.onCheckoutPage().getShippingDetails();

  expect(shippingDetails.name).toContain(
    `${guestUser.firstName} ${guestUser.lastName}`
  );
  expect(shippingDetails.address).toContain(
    `${guestUser.address1} ${guestUser.city} ${guestUser.zone} ${guestUser.zipcode} ${guestUser.country}`
  );
  expect(shippingDetails.shippingMethod).toContain(shippingMethod);

  const paymentDetails = await pm.onCheckoutPage().getPaymentDetails();

  expect(paymentDetails.name).toContain(
    `${guestUser.firstName} ${guestUser.lastName}`
  );
  expect(paymentDetails.address).toContain(
    `${guestUser.address1} ${guestUser.city} ${guestUser.zone} ${guestUser.zipcode} ${guestUser.country}`
  );
  expect(paymentDetails.paymentMethod).toContain(paymentMethod);

  const orderSummary = await pm.onCheckoutPage().getOrderSummary();

  expect(orderSummary.productName).toContain(productName);
  expect(orderSummary.productPrice).toContain(productPrice);
  expect(orderSummary.quantity).toContain(productQuantity);

  const totalDetails = await pm.onCheckoutPage().getTotalDetails();

  expect(totalDetails.subtotal).toContain(`$${totalPrice}`);
  expect(totalDetails.shipping).toContain(shippingPrice);
  expect(totalDetails.total).toContain(`$${totalPriceWithShipping}`);

  await pm.onCheckoutPage().confirmOrder();

  expect(await pm.onOrderConfirmationPage().getConfirmationMessage()).toContain(
    "Your Order Has Been Processed!"
  );
});

test.only("register a new user", async ({ page, helperBase }) => {
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

test("buy the 1st featured product as a registered user with a standard shipping from the home page", async ({
  page,
}) => {
  const pm = new PageManager(page);

  const productName = await pm.onHomePage().getFirstFeaturedProductName();
  const productPrice = await pm.onHomePage().getFirstFeaturedProductPrice();
  await pm.onHomePage().clickFirstFeaturedProduct();

  expect(await pm.onProductPage().getProductName()).toContain(productName);
  expect(await pm.onProductPage().getProductPrice()).toContain(productPrice);
  expect(await pm.onProductPage().getTotalPrice()).toContain(productPrice);

  const productQuantity = await pm.onProductPage().getQuantity();
  const modelNumbers = await pm.onProductPage().getModel();

  const cleanPrice = productPrice?.replace(/[^0-9.]/g, "") || "0";
  const totalPrice = Number(productQuantity) * Number(cleanPrice);

  await pm.onProductPage().addToCart();

  expect(await pm.onCartPage().getProductName()).toContain(productName);
  expect(await pm.onCartPage().getModel()).toContain(modelNumbers);
  expect(await pm.onCartPage().getProductPrice()).toContain(productPrice);
  expect(await pm.onCartPage().getProductQuantity()).toEqual(productQuantity);
  expect(await pm.onCartPage().getProductTotal()).toContain(`$${totalPrice}`);

  const shippingPrice = await pm.onCartPage().getShippingPrice();

  expect(await pm.onCartPage().getTotalsTableValue(0)).toContain(
    `$${totalPrice}`
  );
  expect(await pm.onCartPage().getTotalsTableValue(1)).toContain(shippingPrice);

  const totalPriceWithShipping = totalPrice + Number(shippingPrice);

  expect(await pm.onCartPage().getTotalsTableValue(2)).toContain(
    `$${totalPriceWithShipping}`
  );

  await pm.onCartPage().proceedToCheckout();

  const orderSummary = await pm.onCheckoutPage().getOrderSummary();

  expect(orderSummary.productName).toContain(productName);
  expect(orderSummary.productPrice).toContain(productPrice);
  expect(orderSummary.quantity).toContain(productQuantity);

  const totalDetails = await pm.onCheckoutPage().getTotalDetails();

  expect(totalDetails.subtotal).toContain(`$${totalPrice}`);
  expect(totalDetails.shipping).toContain(shippingPrice);
  expect(totalDetails.total).toContain(`$${totalPriceWithShipping}`);

  await pm.onCheckoutPage().confirmOrder();

  expect(await pm.onOrderConfirmationPage().getConfirmationMessage()).toContain(
    "Your Order Has Been Processed!"
  );
});
