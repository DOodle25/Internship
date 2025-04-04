const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../utils/middleware");
const paymentController = require("../controllers/payment.controller");

router.post(
  "/create-checkout-session",
  verifyJWT,
  paymentController.createCheckoutSession
);
router.get(
  "/checkout-session-status",
  paymentController.getCheckoutSessionStatus
);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.webhook
);
router.get("/payments", verifyJWT, paymentController.getPaymentsByUserId);
router.get(
  "/payment-admin",
  verifyJWT,
  paymentController.getPaymentsForAssignedUsers
);

module.exports = router;
