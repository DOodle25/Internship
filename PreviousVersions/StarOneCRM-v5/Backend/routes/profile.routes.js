// // Routes: user.routes.js
// const express = require("express");
// const router = express.Router();
// const profileController = require("../controllers/profile.controller");
// const { verifyJWT } = require("../utils/middleware");

// // Profile Routes (For the logged-in user)
// router.get("/", verifyJWT, profileController.getProfile);
// router.patch("/", verifyJWT, profileController.updateProfile);
// router.delete("/", verifyJWT, profileController.deleteProfile);

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const profileController = require("../controllers/profile.controller");
// const { verifyJWT } = require("../utils/middleware");
// const multer = require("multer");

// const upload = multer();

// // Profile Routes
// router.get("/", verifyJWT, profileController.getProfile);
// router.patch("/", verifyJWT, upload.single("profileImage"), profileController.updateProfile);
// router.get("/image/:filename", profileController.getProfileImage);
// router.delete("/", verifyJWT, profileController.deleteProfile);

// module.exports = router;

const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const { verifyJWT } = require("../utils/middleware");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;

// Configure GridFS storage
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI, // Ensure your MongoDB URI is correctly set
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`, // Unique file name
      bucketName: "uploads", // Matches your collection name
    };
  },
});

const upload = multer({ storage });


// Profile Routes
router.get("/", verifyJWT, profileController.getProfile);
router.patch("/", verifyJWT, upload.single("profileImage"), profileController.updateProfile);
// router.get("/image/:filename", profileController.getProfileImage);
router.delete("/", verifyJWT, profileController.deleteProfile);

module.exports = router;
