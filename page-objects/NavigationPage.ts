import { Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //TOP NAVBAR
  async loginOrRegister() {
    await this.page
      .locator("#customernav")
      .getByRole("link", { name: "Login or register" })
      .click();
  }

  async specials() {
    await this.page
      .locator("#main_menu_top")
      .getByRole("link", { name: "Specials" })
      .click();
  }

  async account() {
    await this.page
      .locator("#main_menu_top")
      .getByRole("link", { name: "Account" })
      .click();
  }
  async accountLogin() {
    await this.page
      .locator("#main_menu_top")
      .getByRole("link", { name: "Account" })
      .hover();
    await this.page
      .locator('[data-id="menu_login"]')
      .getByRole("link", { name: "Login" })
      .click();
  }
  async accountCheckYourOrder() {
    await this.page
      .locator("#main_menu_top")
      .getByRole("link", { name: "Account" })
      .hover();
    await this.page
      .locator('[data-id="menu_order"]')
      .getByRole("link", { name: "Check Your Order" })
      .click();
  }

  async cart() {
    await this.page
      .locator("#main_menu_top")
      .getByRole("link", { name: "Cart" })
      .click();
  }

  async checkout() {
    await this.page
      .locator("#main_menu_top")
      .getByRole("link", { name: "Checkout" })
      .click();
  }

  //MAIN NAVBAR
  async home() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Home" })
      .click();
  }
  async homeSpecials() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Home" })
      .hover();
    await this.page
      .locator("#main_menu .menu_text:has-text('Specials')")
      .click();
  }
  async homeAccount() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Home" })
      .hover();
    await this.page
      .locator("#main_menu .menu_text:has-text('Account')")
      .click();
  }
  async homeCart() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Home" })
      .hover();
    await this.page.locator("#main_menu .menu_text:has-text('Cart')").click();
  }
  async homeCheckout() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Home" })
      .hover();
    await this.page
      .locator("#main_menu .menu_text:has-text('Checkout')")
      .click();
  }

  async apparelAndAccessories() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Apparel & accessories" })
      .click();
  }
  async apparelAndAccessoriesShoes() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Apparel & accessories" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Shoes" })
      .click();
  }
  async apparelAndAccessoriesTShirts() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Apparel & accessories" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "T-shirts" })
      .click();
  }

  async makeup() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Makeup" })
      .click();
  }
  async makeupCheeks() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Makeup" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Cheeks" })
      .click();
  }
  async makeupEyes() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Makeup" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Eyes" })
      .click();
  }
  async makeupFace() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Makeup" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Face" })
      .click();
  }
  async makeupLips() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Makeup" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Lips" })
      .click();
  }
  async makeupNails() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Makeup" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Nails" })
      .click();
  }
  async makeupValueSets() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Makeup" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Value Sets" })
      .click();
  }

  async skincare() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Skincare" })
      .click();
  }
  async skincareEyes() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Skincare" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Eyes" })
      .click();
  }
  async skincareFace() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Skincare" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Face" })
      .click();
  }
  async skincareGiftIdeasAndSets() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Skincare" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Gift Ideas & Sets" })
      .click();
  }
  async skincareHandsAndNails() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Skincare" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Hands & Nails" })
      .click();
  }
  async skincareSun() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Skincare" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Sun" })
      .click();
  }

  async fragrance() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Fragrance" })
      .click();
  }
  async fragranceMen() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Fragrance" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Men", exact: true })
      .click();
  }
  async fragranceWomen() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Fragrance" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Women", exact: true })
      .click();
  }

  async men() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Men" })
      .click();
  }
  async menBodyAndShower() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Men" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Body & Shower" })
      .click();
  }
  async menFragranceSets() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Men" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Fragrance Sets" })
      .click();
  }
  async menPreShaveAndShaving() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Men" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Pre-Shave & Shaving" })
      .click();
  }
  async menSkincare() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Men" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Skincare" })
      .click();
  }

  async hairCare() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Hair Care" })
      .click();
  }
  async hairCareConditioner() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Hair Care" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Conditioner" })
      .click();
  }
  async hairCareShampoo() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Hair Care" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Shampoo" })
      .click();
  }

  async books() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Books" })
      .click();
  }
  async booksAudioCD() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Books" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Audio CD" })
      .click();
  }
  async booksPaperback() {
    await this.page
      .locator(".subnav")
      .getByRole("link", { name: "Books" })
      .hover();
    await this.page
      .locator(".subcategories")
      .getByRole("link", { name: "Paperback" })
      .click();
  }

  //FOOTER
  async aboutUs() {
    await this.page
      .locator(".info_links_footer")
      .getByRole("link", { name: "About Us" })
      .click();
  }
  async privacyPolicy() {
    await this.page
      .locator(".info_links_footer")
      .getByRole("link", { name: "Privacy Policy" })
      .click();
  }
  async returnPolicy() {
    await this.page
      .locator(".info_links_footer")
      .getByRole("link", { name: "Return Policy" })
      .click();
  }
  async shipping() {
    await this.page
      .locator(".info_links_footer")
      .getByRole("link", { name: "Shipping" })
      .click();
  }
  async contactUs() {
    await this.page
      .locator(".info_links_footer")
      .getByRole("link", { name: "Contact Us" })
      .click();
  }
  async siteMap() {
    await this.page
      .locator(".info_links_footer")
      .getByRole("link", { name: "Site Map" })
      .click();
  }
  async footerLogin() {
    await this.page
      .locator(".info_links_footer")
      .getByRole("link", { name: "Login" })
      .click();
  }
}
