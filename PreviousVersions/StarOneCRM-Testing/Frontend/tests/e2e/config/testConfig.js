const { Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const baseConfig = require("./baseConfig");

async function createDriver() {
  const options = new chrome.Options();

  console.log("Initializing Chrome options...");
  if (baseConfig.headless) {
    console.log("Running in headless mode...");
    options.addArguments("--headless=new"); // Updated headless mode
  }

  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--disable-gpu");
  options.addArguments("--disable-extensions");
  options.addArguments("--disable-infobars");
  options.addArguments("--disable-notifications");
  options.addArguments(`--window-size=${baseConfig.windowSize}`);

  try {
    console.log("Building WebDriver instance...");
    const driver = await new Builder()
      .forBrowser(baseConfig.browser)
      .setChromeOptions(options)
      .setChromeService(new chrome.ServiceBuilder(chromedriver.path))
      .build();
    console.log("WebDriver instance created successfully.");
    console.log("WebDriver instance created. Proceeding to next steps...");
    return driver;
  } catch (error) {
    console.error("Failed to create driver:", error);
    throw error;
  }
}

module.exports = {
  createDriver,
  ...baseConfig,
};
