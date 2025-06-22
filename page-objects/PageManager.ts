import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { CartPage } from "./CartPage";
import { OrderConfirmationPage } from "./OrderConfirmationPage";
import { ProductPage } from "./ProductPage";
import { CheckoutPage } from "./CheckoutPage";

export class PageManager {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly cartPage: CartPage;
  readonly orderConfirmationPage: OrderConfirmationPage;
  readonly productPage: ProductPage;
  readonly checkoutPage: CheckoutPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.cartPage = new CartPage(this.page);
    this.orderConfirmationPage = new OrderConfirmationPage(this.page);
    this.productPage = new ProductPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
  }

  onHomePage() {
    return this.homePage;
  }

  onCartPage() {
    return this.cartPage;
  }

  onOrderConfirmationPage() {
    return this.orderConfirmationPage;
  }

  onProductPage() {
    return this.productPage;
  }

  onCheckoutPage() {
    return this.checkoutPage;
  }
}
