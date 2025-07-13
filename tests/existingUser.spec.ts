import { test, expect } from "../fixtures";
import { PageManager } from "../page-objects/PageManager";
import address from "../test-data/new-address.json";

test("buy the 1st featured product as an existing user with a standard shipping from the home page", async ({
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

test("add a new non-default address", async ({ page, helperBase }) => {
  const pm = new PageManager(page);

  const todaysDateAndTime = helperBase.getTodaysDateWithCurrentTime();
  const lastName = `${address.newAddress.lastName}-${todaysDateAndTime}`;

  await pm.navigateTo().manageAddressBook();

  await page.getByRole("link", { name: "New Address" }).click();

  await pm
    .onAddressBookPage()
    .fillAddressForm(
      address.newAddress.firstName,
      lastName,
      address.newAddress.company,
      address.newAddress.address1,
      address.newAddress.address2,
      address.newAddress.city,
      address.newAddress.country,
      address.newAddress.zone,
      address.newAddress.zipcode,
      address.newAddress.defaultAddress.no
    );
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator(".alert-success")).toContainText(
    "Your address has been successfully inserted"
  );

  const allEntries = await pm.onAddressBookPage().getAllAddressEntries();

  expect(
    allEntries.some((entry) =>
      entry.includes(
        `${address.newAddress.firstName} ${lastName} ${address.newAddress.company} ${address.newAddress.address1} ${address.newAddress.address2} ${address.newAddress.city} ${address.newAddress.zipcode} ${address.newAddress.zone} ${address.newAddress.country}`
      )
    )
  ).toBe(true);
});

test("edit a non-default address", async ({ page, helperBase }) => {
  const pm = new PageManager(page);

  const todaysDateAndTime = helperBase.getTodaysDateWithCurrentTime();
  const lastName = `${address.newAddress.lastName}-${todaysDateAndTime}`;

  await pm.navigateTo().manageAddressBook();

  await page.getByRole("link", { name: "New Address" }).click();

  await pm
    .onAddressBookPage()
    .fillAddressForm(
      address.newAddress.firstName,
      lastName,
      address.newAddress.company,
      address.newAddress.address1,
      address.newAddress.address2,
      address.newAddress.city,
      address.newAddress.country,
      address.newAddress.zone,
      address.newAddress.zipcode,
      address.newAddress.defaultAddress.no
    );

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator(".alert-success")).toContainText(
    "Your address has been successfully inserted"
  );

  const allEntries = await pm.onAddressBookPage().getAllAddressEntries();

  expect(
    allEntries.some((entry) =>
      entry.includes(
        `${address.newAddress.firstName} ${lastName} ${address.newAddress.company} ${address.newAddress.address1} ${address.newAddress.address2} ${address.newAddress.city} ${address.newAddress.zipcode} ${address.newAddress.zone} ${address.newAddress.country}`
      )
    )
  ).toBe(true);

  await pm.onAddressBookPage().clickEditLastAddressEntry();

  await pm.onAddressBookPage().clearAddressForm();

  const updatedLastName = `Update${address.updatedAddress.lastName}-${todaysDateAndTime}`;

  await pm
    .onAddressBookPage()
    .fillAddressForm(
      address.newAddress.firstName,
      updatedLastName,
      address.updatedAddress.company,
      address.updatedAddress.address1,
      address.updatedAddress.address2,
      address.updatedAddress.city,
      address.updatedAddress.country,
      address.updatedAddress.zone,
      address.updatedAddress.zipcode,
      address.updatedAddress.defaultAddress.no
    );

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator(".alert-success")).toContainText(
    "Your address has been successfully updated"
  );

  const updatedEntries = await pm.onAddressBookPage().getAllAddressEntries();

  expect(
    updatedEntries.some((entry) =>
      entry.includes(
        `${address.updatedAddress.firstName} ${updatedLastName} ${address.updatedAddress.company} ${address.updatedAddress.address1} ${address.updatedAddress.address2} ${address.updatedAddress.city} ${address.updatedAddress.zipcode} ${address.updatedAddress.zone} ${address.updatedAddress.country}`
      )
    )
  ).toBe(true);
});
