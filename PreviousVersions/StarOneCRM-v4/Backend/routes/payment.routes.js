const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../utils/middleware");
const paymentController = require("../controllers/payment.controller");

// Payment routes
router.post("/create-checkout-session", verifyJWT, paymentController.createCheckoutSession);
router.get("/checkout-session-status", paymentController.getCheckoutSessionStatus);
router.post("/webhook", express.raw({ type: "application/json" }), paymentController.webhook);

module.exports = router;
