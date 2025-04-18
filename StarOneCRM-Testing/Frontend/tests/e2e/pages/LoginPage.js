const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(driver, config) {
    super(driver, config); // Pass config to parent
    this.url = `${config.baseUrl}/login`;

    // Locators
    this.locators = {
      emailInput: By.css('input[type="email"]'),
      passwordInput: By.css('input[type="password"]'),
      loginButton: By.xpath('//button[contains(text(), "Login")]'),
      googleLoginButton: By.xpath(
        '//button[contains(text(), "Sign in with Google")]'
      ),
      errorMessage: By.css(".MuiAlert-root"),
      forgotPasswordLink: By.xpath('//a[contains(text(), "Reset Password")]'),
      signUpLink: By.xpath('//a[contains(text(), "Sign Up")]'),
    };
  }

  async navigateToLoginPage() {
    try {
      console.log("Navigating to login page: ", this.url);
      await this.navigateTo(this.url);
      console.log("Waiting for page title to contain 'Vite + React'...");
      await this.driver.wait(
        until.titleContains("Vite + React"),
        this.config.pageTimeout
      );
      console.log("Login page loaded successfully.");
      return true;
    } catch (error) {
      console.error("Failed to navigate to login page:", error);
      throw error;
    }
  }

  async login(email, password) {
    await this.typeText(this.locators.emailInput, email);
    await this.typeText(this.locators.passwordInput, password);
    await this.clickElement(this.locators.loginButton);
  }

  async loginWithGoogle() {
    await this.clickElement(this.locators.googleLoginButton);
  }

  async getErrorMessage() {
    return await this.getElementText(this.locators.errorMessage);
  }

  async goToForgotPassword() {
    await this.clickElement(this.locators.forgotPasswordLink);
  }

  async goToSignUp() {
    await this.clickElement(this.locators.signUpLink);
  }
}

module.exports = LoginPage;
