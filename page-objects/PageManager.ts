import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { CartPage } from "./CartPage";
import { OrderConfirmationPage } from "./OrderConfirmationPage";
import { ProductPage } from "./ProductPage";
import { CheckoutPage } from "./CheckoutPage";
import { NavigationPage } from "./NavigationPage";
import { RegisterPage } from "./RegisterPage";
import { AccountPage } from "./AccountPage";
import { ChangePasswordPage } from "./ChangePasswordPage";
import { AccountLoginPage } from "./AccountLoginPage";
import { EditAccountDetailsPage } from "./EditAccountDetailsPage";
import { AddressBookPage } from "./AddressBookPage";

export class PageManager {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly cartPage: CartPage;
  readonly orderConfirmationPage: OrderConfirmationPage;
  readonly productPage: ProductPage;
  readonly checkoutPage: CheckoutPage;
  readonly navigationPage: NavigationPage;
  readonly registerPage: RegisterPage;
  readonly accountPage: AccountPage;
  readonly changePasswordPage: ChangePasswordPage;
  readonly accountLoginPage: AccountLoginPage;
  readonly editAccountDetailsPage: EditAccountDetailsPage;
  readonly addressBookPage: AddressBookPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.cartPage = new CartPage(this.page);
    this.orderConfirmationPage = new OrderConfirmationPage(this.page);
    this.productPage = new ProductPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.navigationPage = new NavigationPage(this.page);
    this.registerPage = new RegisterPage(this.page);
    this.accountPage = new AccountPage(this.page);
    this.changePasswordPage = new ChangePasswordPage(this.page);
    this.accountLoginPage = new AccountLoginPage(this.page);
    this.editAccountDetailsPage = new EditAccountDetailsPage(this.page);
    this.addressBookPage = new AddressBookPage(this.page);
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

  onRegisterPage() {
    return this.registerPage;
  }

  navigateTo() {
    return this.navigationPage;
  }

  onAccountPage() {
    return this.accountPage;
  }

  onChangePasswordPage() {
    return this.changePasswordPage;
  }

  onAccountLoginOrRegisterPage() {
    return this.accountLoginPage;
  }

  onEditAccountDetailsPage() {
    return this.editAccountDetailsPage;
  }

  onAddressBookPage() {
    return this.addressBookPage;
  }
}
