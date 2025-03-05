require("dotenv").config();

const FRONTEND_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://polite-field-09918cc00.4.azurestaticapps.net"
    : "http://localhost:5173";

const BACKEND_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net"
    : "http://localhost:5000";

module.exports = { FRONTEND_BASE_URL, BACKEND_BASE_URL };
