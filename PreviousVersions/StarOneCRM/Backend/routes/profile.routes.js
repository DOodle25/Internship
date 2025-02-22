// Routes: user.routes.js
const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const { verifyJWT } = require("../utils/middleware");

// Profile Routes (For the logged-in user)
router.get("/", verifyJWT, profileController.getProfile);
router.patch("/", verifyJWT, profileController.updateProfile);
router.delete("/", verifyJWT, profileController.deleteProfile);

module.exports = router;
