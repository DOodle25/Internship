const { expect } = require('chai');

module.exports = {
  async assertElementTextContains(driver, locator, expectedText) {
    const element = await driver.findElement(locator);
    const actualText = await element.getText();
    expect(actualText).to.include(expectedText);
  },

  async assertElementIsVisible(driver, locator) {
    const element = await driver.findElement(locator);
    expect(await element.isDisplayed()).to.be.true;
  },

  async assertUrlContains(driver, expectedUrlPart) {
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include(expectedUrlPart);
  }
};