const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyJWT, isAdmin } = require("../utils/middleware");

// CRUD Route Definitions with Middleware
router.get("/", verifyJWT, isAdmin, adminController.user_index);
router.post("/", verifyJWT, isAdmin, adminController.user_create_post);
router.get("/:id", verifyJWT, isAdmin, adminController.user_details);
router.patch("/:id", verifyJWT, isAdmin, adminController.user_update);
router.delete("/:id", verifyJWT, isAdmin, adminController.user_delete);
router.patch("/verify/:id", verifyJWT, isAdmin, adminController.verifyuser);
module.exports = router;
