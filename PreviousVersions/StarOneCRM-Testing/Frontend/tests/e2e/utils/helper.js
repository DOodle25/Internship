const fs = require('fs');
const path = require('path');

class TestHelpers {
  static generateTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  static createArtifactsDir() {
    const artifactsDir = path.join(__dirname, '../../artifacts');
    if (!fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir, { recursive: true });
    }
    return artifactsDir;
  }

  static async waitForUrl(driver, expectedUrlPart, timeout = 10000) {
    await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      return currentUrl.includes(expectedUrlPart);
    }, timeout);
  }
}

module.exports = TestHelpers;