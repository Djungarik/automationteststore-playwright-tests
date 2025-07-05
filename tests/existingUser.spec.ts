import { test, expect } from "../fixtures";
import { PageManager } from "../page-objects/PageManager";

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
