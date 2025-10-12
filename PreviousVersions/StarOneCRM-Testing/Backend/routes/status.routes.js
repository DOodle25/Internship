const express = require("express");
const router = express.Router();
const statusController = require("../controllers/status.controller");
const { verifyJWT } = require("../utils/middleware");

router.get("/check-form", verifyJWT, statusController.checkForm);
router.post("/fill-form", verifyJWT, statusController.fillForm);
router.get("/check-status", verifyJWT, statusController.checkStatus);

module.exports = router;
