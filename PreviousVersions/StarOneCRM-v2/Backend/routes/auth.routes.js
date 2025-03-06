const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/send-otp", authController.sendOtp);
router.get("/google", authController.googleLogin);
router.get("/google/callback", authController.googleCallback);
router.get("/google/failure", authController.googleFailure);
router.get("/facebook", authController.facebookLogin);
router.get("/facebook/callback", authController.facebookCallback);
router.get("/facebook/failure", authController.facebookFailure);
module.exports = router;
