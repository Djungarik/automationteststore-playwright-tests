import { test, expect } from "../fixtures";
import { PageManager } from "../page-objects/PageManager";
import guestUser from "../test-data/guest-user.json";
import footerLinksContent from "../test-data/footer-links-content.json";

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

test("verify the footer links' content", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().aboutUs();
  await expect(page.locator(".content")).toHaveText(footerLinksContent.aboutUs);

  await pm.navigateTo().privacyPolicy();
  const actualText = await page.locator(".content").innerText();
  expect(actualText.replace(/\s+/g, " ").trim()).toBe(
    footerLinksContent.privacyPolicy
  );

  await pm.navigateTo().returnPolicy();
  await expect(page.locator(".content")).toHaveText(
    footerLinksContent.returnPolicy
  );

  await pm.navigateTo().shipping();
  await expect(page.locator(".content")).toHaveText(
    footerLinksContent.shipping
  );

  await pm.navigateTo().contactUs();
  const actualAddressText = await page.locator("address").innerText();
  const actualPhoneText = await page
    .locator(".col-md-6.pull-right")
    .innerText();
  expect(actualAddressText.replace(/\s+/g, " ").trim()).toBe(
    footerLinksContent.contactUs.address
  );
  expect(actualPhoneText.replace(/\s+/g, " ").trim()).toBe(
    footerLinksContent.contactUs.phone
  );
});
