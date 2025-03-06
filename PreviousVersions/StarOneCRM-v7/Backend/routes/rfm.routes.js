const express = require("express");
const router = express.Router();
const { processRFM, getRFMData } = require("../controllers/rfm.controller");

router.post("/process-rfm", processRFM);
router.get("/get-rfm", getRFMData);

module.exports = router;
