require('dotenv').config();

module.exports = {
  // Base URLs
  baseUrl: process.env.TEST_ENV === 'production' 
    ? 'https://your-azure-url.com' 
    : 'http://localhost:5173',
  
  apiBaseUrl: process.env.TEST_ENV === 'production'
    ? 'https://your-azure-backend.com/api'
    : 'http://localhost:5000/api',

  // Browser settings
  browser: process.env.BROWSER || 'chrome',
  headless: process.env.HEADLESS === 'true',
  windowSize: '1920x1080',

  // Timeouts
  elementTimeout: 10000,
  pageTimeout: 30000,
  testTimeout: 60000,

  // Auth
  testUser: {
    email: process.env.TEST_EMAIL || 'cocply135@gmail.com',
    password: process.env.TEST_PASSWORD || 'admin123'
  }
};