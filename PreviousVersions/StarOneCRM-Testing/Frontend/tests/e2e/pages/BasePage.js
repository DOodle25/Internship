const { until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");

class BasePage {
  constructor(driver, config) {
    this.driver = driver;
    this.config = config || {
      pageTimeout: 30000,
      elementTimeout: 10000
    };
  }

  async navigateTo(url) {
    try {
      console.log(`Navigating to URL: ${url}`);
      const navigationPromise = this.driver.get(url);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error(`Navigation timeout after ${this.config.pageTimeout}ms`)),
          this.config.pageTimeout
        )
      );
      await Promise.race([navigationPromise, timeoutPromise]);
      console.log("Navigation to URL successful.");
    } catch (error) {
      console.error("Error during navigation:", error);
      throw error;
    }
  }

  async getCurrentUrl() {
    try {
      const url = await this.driver.getCurrentUrl();
      console.log(`Current URL: ${url}`);
      return url;
    } catch (error) {
      console.error("Error getting current URL:", error);
      throw error;
    }
  }

  async waitForElement(locator, timeout = this.config.elementTimeout) {
    try {
      console.log(`Waiting for element: ${locator.toString()}`);
      const element = await this.driver.wait(
        until.elementLocated(locator),
        timeout,
        `Element not found: ${locator.toString()}`
      );
      await this.driver.wait(
        until.elementIsVisible(element),
        timeout,
        `Element not visible: ${locator.toString()}`
      );
      console.log("Element found and visible.");
      return element;
    } catch (error) {
      console.error(`Error waiting for element ${locator.toString()}:`, error);
      throw error;
    }
  }

  async clickElement(locator) {
    try {
      console.log(`Clicking element: ${locator.toString()}`);
      const element = await this.waitForElement(locator);
      await element.click();
      console.log("Element clicked successfully.");
    } catch (error) {
      console.error(`Error clicking element ${locator.toString()}:`, error);
      throw error;
    }
  }

  async typeText(locator, text) {
    try {
      console.log(`Typing text '${text}' into element: ${locator.toString()}`);
      const element = await this.waitForElement(locator);
      await element.clear();
      await element.sendKeys(text);
      console.log("Text typed successfully.");
    } catch (error) {
      console.error(`Error typing text into element ${locator.toString()}:`, error);
      throw error;
    }
  }

  async getElementText(locator) {
    try {
      console.log(`Getting text from element: ${locator.toString()}`);
      const element = await this.waitForElement(locator);
      const text = await element.getText();
      console.log(`Element text: '${text}'`);
      return text;
    } catch (error) {
      console.error(`Error getting text from element ${locator.toString()}:`, error);
      throw error;
    }
  }

  async takeScreenshot(name) {
    try {
      console.log(`Taking screenshot: ${name}`);
      const screenshot = await this.driver.takeScreenshot();
      const screenshotDir = path.join(__dirname, "../../artifacts/screenshots");

      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      const sanitizedName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filePath = path.join(
        screenshotDir,
        `${sanitizedName}_${timestamp}.png`
      );

      fs.writeFileSync(filePath, screenshot, "base64");
      console.log(`Screenshot saved to: ${filePath}`);
      return filePath;
    } catch (error) {
      console.error("Error taking screenshot:", error);
      throw error;
    }
  }

  async waitForUrlToContain(text, timeout = this.config.pageTimeout) {
    try {
      console.log(`Waiting for URL to contain '${text}'`);
      await this.driver.wait(until.urlContains(text), timeout);
      console.log("URL condition met.");
    } catch (error) {
      console.error(`Error waiting for URL to contain '${text}':`, error);
      throw error;
    }
  }
}

module.exports = BasePage;