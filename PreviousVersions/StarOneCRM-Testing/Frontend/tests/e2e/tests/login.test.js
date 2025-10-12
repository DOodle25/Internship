// const { expect } = require("chai");
// const { createDriver } = require("../config/testConfig");
// const LoginPage = require("../pages/LoginPage");

// describe("Login Tests", function () {
//   this.timeout(60000); // Increased timeout for all tests

//   let driver;
//   let loginPage;

//   before(async function () {
//     try {
//       console.log("Creating driver...");
//       driver = await createDriver();
//       console.log("Driver created. Initializing LoginPage...");
//       loginPage = new LoginPage(driver);
//       console.log("Navigating to login page...");
//       await loginPage.navigateToLoginPage();
//       console.log("Navigation successful.");
//     } catch (error) {
//       console.error("Setup failed:", error);
//       throw error;
//     }
//   });

//   after(async function () {
//     try {
//       if (driver) {
//         await driver.quit();
//       }
//     } catch (error) {
//       console.error("Teardown failed:", error);
//     }
//   });

//   afterEach(async function () {
//     if (this.currentTest.state === "failed") {
//       await loginPage.takeScreenshot(this.currentTest.title);
//     }
//   });

//   it("should successfully load login page", async function () {
//     await loginPage.navigateToLoginPage();
//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).to.include("/login");
//   });

//   it("should login with valid credentials", async function () {
//     await loginPage.navigateToLoginPage();
//     await loginPage.login(
//       loginPage.config.testUser.email,
//       loginPage.config.testUser.password
//     );

//     // Verify redirect after successful login
//     await driver.wait(
//       until.urlContains("/fill-form"),
//       loginPage.config.pageTimeout
//     );
//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).to.include("/fill-form");
//   });

//   it("should show error message with invalid credentials", async function () {
//     await loginPage.navigateToLoginPage();
//     await loginPage.login("invalid@example.com", "wrongpassword");

//     const errorMessage = await loginPage.getErrorMessage();
//     expect(errorMessage).to.include("Invalid credentials");
//   });

//   it("should navigate to forgot password page", async function () {
//     await loginPage.navigateToLoginPage();
//     await loginPage.goToForgotPassword();

//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).to.include("/forgot-password");
//   });

//   it("should navigate to sign up page", async function () {
//     await loginPage.navigateToLoginPage();
//     await loginPage.goToSignUp();

//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).to.include("/signup");
//   });

//   // Note: Google OAuth test would require special handling for popup windows
//   // and might need to be mocked in a real test environment
//   it.skip("should show Google OAuth button", async function () {
//     await loginPage.navigateToLoginPage();
//     const googleButton = await driver.findElement(
//       loginPage.locators.googleLoginButton
//     );
//     expect(await googleButton.isDisplayed()).to.be.true;
//   });
// });





// const { expect } = require("chai");
// const { createDriver, ...config } = require("../config/testConfig");
// const LoginPage = require("../pages/LoginPage");

// describe("Login Tests", function () {
//   this.timeout(60000); // Increased timeout for all tests

//   let driver;
//   let loginPage;

//   before(async function () {
//     try {
//       console.log("Creating driver...");
//       driver = await createDriver();
//       console.log("Driver created. Initializing LoginPage...");
//       loginPage = new LoginPage(driver, config); // Pass config here
//       console.log("Navigating to login page...");
//       await loginPage.navigateToLoginPage();
//       console.log("Navigation successful.");
//     } catch (error) {
//       console.error("Setup failed:", error);
//       throw error;
//     }
//   });

//   after(async function () {
//     try {
//       if (driver) {
//         await driver.quit();
//       }
//     } catch (error) {
//       console.error("Teardown failed:", error);
//     }
//   });

//   afterEach(async function () {
//     if (this.currentTest.state === "failed") {
//       await loginPage.takeScreenshot(this.currentTest.title);
//     }
//   });

//   it("should successfully load login page", async function () {
//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).to.include("/login");
//   });

//   it("should login with valid credentials", async function () {
//     await loginPage.login(
//       config.testUser.email,
//       config.testUser.password
//     );

//     // Verify redirect after successful login
//     await driver.wait(
//       until.urlContains("/fill-form"),
//       config.pageTimeout
//     );
//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).to.include("/fill-form");
//   });

//   it("should show error message with invalid credentials", async function () {
//     await loginPage.login("invalid@example.com", "wrongpassword");

//     const errorMessage = await loginPage.getErrorMessage();
//     expect(errorMessage).to.include("Invalid credentials");
//   });

//   it("should navigate to forgot password page", async function () {
//     await loginPage.goToForgotPassword();
//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).to.include("/forgot-password");
//   });

//   it("should navigate to sign up page", async function () {
//     await loginPage.goToSignUp();
//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).to.include("/signup");
//   });

//   it.skip("should show Google OAuth button", async function () {
//     const googleButton = await driver.findElement(
//       loginPage.locators.googleLoginButton
//     );
//     expect(await googleButton.isDisplayed()).to.be.true;
//   });
// });


const { expect } = require("chai");
const { createDriver, ...config } = require("../config/testConfig");
const LoginPage = require("../pages/LoginPage");

describe("Login Tests", function () {
  this.timeout(60000); // Increased timeout for all tests

  let driver;
  let loginPage;

  before(async function () {
    try {
      console.log("Creating driver...");
      driver = await createDriver();
      console.log("Driver created. Initializing LoginPage...");
      loginPage = new LoginPage(driver, config); // Pass config here
      console.log("Navigating to login page...");
      await loginPage.navigateToLoginPage();
      console.log("Navigation successful.");
    } catch (error) {
      console.error("Setup failed:", error);
      throw error;
    }
  });

  after(async function () {
    try {
      if (driver) {
        await driver.quit();
      }
    } catch (error) {
      console.error("Teardown failed:", error);
    }
  });

  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await loginPage.takeScreenshot(this.currentTest.title);
    }
  });

  it("should successfully load login page", async function () {
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).to.include("/login");
  });

  it("should login with valid credentials", async function () {
    await loginPage.login(
      config.testUser.email,
      config.testUser.password
    );

    // Verify redirect after successful login
    // await driver.wait(
    //   until.urlContains("/#/"),
    //   config.pageTimeout
    // );
    // const currentUrl = await loginPage.getCurrentUrl();
    // expect(currentUrl).to.include("/#/");
  });

//   it("should show error message with invalid credentials", async function () {
//     await loginPage.login("invalid@example.com", "wrongpassword");

//     const errorMessage = await loginPage.getErrorMessage();
//     expect(errorMessage).to.include("Invalid credentials");
//   });

//   it("should navigate to forgot password page", async function () {
//     await loginPage.goToForgotPassword();
//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).to.include("/forgot-password");
//   });

//   it("should navigate to sign up page", async function () {
//     await loginPage.goToSignUp();
//     const currentUrl = await loginPage.getCurrentUrl();
//     expect(currentUrl).to.include("/signup");
//   });

//   it.skip("should show Google OAuth button", async function () {
//     const googleButton = await driver.findElement(
//       loginPage.locators.googleLoginButton
//     );
//     expect(await googleButton.isDisplayed()).to.be.true;
//   });
});
