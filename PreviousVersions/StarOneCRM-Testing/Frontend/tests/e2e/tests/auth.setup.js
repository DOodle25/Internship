const { createDriver } = require("../../config/testConfig");
const LoginPage = require("../../pages/LoginPage");

module.exports = async function () {
  console.log("Initializing driver and login page...");
  const driver = await createDriver();
  console.log("Driver initialized successfully.");
  const loginPage = new LoginPage(driver);
  console.log("LoginPage instance created.");

  return {
    driver,
    loginPage,
    async loginAsAdmin() {
      try {
        console.log("Navigating to login page...");
        await loginPage.navigateToLoginPage();
        console.log("Login page loaded. Logging in as admin...");
        await loginPage.login(
          loginPage.config.testUser.email,
          loginPage.config.testUser.password
        );
        console.log("Admin login successful.");
        return driver;
      } catch (error) {
        console.error("Error during admin login:", error);
        throw error;
      }
    },
    async cleanup() {
      try {
        if (driver) {
          console.log("Quitting driver...");
          await driver.quit();
          console.log("Driver quit successfully.");
        }
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    },
  };
};
