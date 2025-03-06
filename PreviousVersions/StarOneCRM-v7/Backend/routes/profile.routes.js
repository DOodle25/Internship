const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const { verifyJWT } = require("../utils/middleware");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage });

router.get("/", verifyJWT, profileController.getProfile);
router.patch(
  "/",
  verifyJWT,
  upload.single("profileImage"),
  profileController.updateProfile
);

router.delete("/", verifyJWT, profileController.deleteProfile);

module.exports = router;
