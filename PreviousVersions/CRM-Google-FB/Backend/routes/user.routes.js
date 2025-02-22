// Routes: authRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyJWT, isAdmin } = require("../utils/middleware");

// Auth Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/check-form", verifyJWT, userController.checkForm);
router.post("/fill-form", verifyJWT, userController.fillForm);
router.get("/check-status", verifyJWT, userController.checkStatus);
router.post("/send-otp", userController.sendOtp);
router.get("/google", userController.googleLogin);
router.get("/google/callback", (req, res, next) => {
    console.log("Google callback route accessed");
    userController.googleCallback(req, res, next);
});
router.get("/google/failure", (req, res, next) => {
    console.log("Google failure route accessed");
    userController.googleFailure(req, res, next);
});
router.get("/facebook", userController.facebookLogin);
router.get("/facebook/callback", (req, res, next) => {
    console.log("facebook callback route accessed");
    userController.facebookCallback(req, res, next);
});
router.get("/facebook/failure", (req, res, next) => {
    console.log("facebook failure route accessed");
    userController.facebookFailure(req, res, next);
});
module.exports = router;