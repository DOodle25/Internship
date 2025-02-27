// const sendResponse = require("../utils/sendResponse");
// const { User } = require("../models/user.model");

// // Get the authenticated user's profile based on their ID from the JWT token
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return sendResponse(res, 404, "User not found");
//     }
//     sendResponse(res, 200, "Profile retrieved successfully", user);
//   } catch (error) {
//     sendResponse(res, 500, "Error retrieving profile", null, error.message);
//   }
// };
// // Update the profile of the logged-in user
// exports.updateProfile = async (req, res) => {
//   const { name, age, email, role } = req.body;

//   if (!name && !age && !email && !role) {
//     return sendResponse(res, 400, "At least one field is required for update");
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, age, email, role },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return sendResponse(res, 404, "User not found");
//     }

//     sendResponse(res, 200, "Profile updated successfully", updatedUser);
//   } catch (err) {
//     sendResponse(res, 500, "Error updating profile", null, err.message);
//   }
// };
// // Delete the profile of the logged-in user
// exports.deleteProfile = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.user.id);
//     if (!deletedUser) {
//       return sendResponse(res, 404, "User not found");
//     }

//     sendResponse(res, 200, "Profile deleted successfully");
//   } catch (err) {
//     sendResponse(res, 500, "Error deleting profile", null, err.message);
//   }
// };

// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
// const { gfs } = require("../db"); // Import GridFS instance
// const sendResponse = require("../utils/sendResponse");
// const { User } = require("../models/user.model");

// // Storage Engine for Multer
// const storage = new GridFsStorage({
//     url: process.env.MONGODB_URI,
//     file: (req, file) => {
//         return {
//             filename: `profile-${req.user.id}-${Date.now()}`,
//             bucketName: "uploads",
//         };
//     },
// });

// const upload = multer({ storage });

// // Update Profile API (Including Image Upload)
// exports.updateProfile = async (req, res) => {
//     const { name, age, email, role } = req.body;

//     try {
//         const updateFields = { name, age, email, role };

//         // If an image is uploaded, store its reference
//         if (req.file) {
//             updateFields.profileImage = req.file.filename;
//         }

//         const updatedUser = await User.findByIdAndUpdate(req.user.id, updateFields, {
//             new: true,
//             runValidators: true,
//         });

//         if (!updatedUser) {
//             return sendResponse(res, 404, "User not found");
//         }

//         sendResponse(res, 200, "Profile updated successfully", updatedUser);
//     } catch (err) {
//         sendResponse(res, 500, "Error updating profile", null, err.message);
//     }
// };

// // Get Profile API (Including Image URL)
// exports.getProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return sendResponse(res, 404, "User not found");
//         }

//         // Construct Image URL if profileImage exists
//         if (user.profileImage) {
//             user.profileImage = `${req.protocol}://${req.get("host")}/api/profile/image/${user.profileImage}`;
//         }

//         sendResponse(res, 200, "Profile retrieved successfully", user);
//     } catch (error) {
//         sendResponse(res, 500, "Error retrieving profile", null, error.message);
//     }
// };

// // Serve Image File
// exports.getProfileImage = async (req, res) => {
//     try {
//         gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//             if (!file || file.length === 0) {
//                 return res.status(404).json({ message: "No image found" });
//             }

//             const readStream = gfs.createReadStream(file.filename);
//             readStream.pipe(res);
//         });
//     } catch (error) {
//         sendResponse(res, 500, "Error retrieving image", null, error.message);
//     }
// };

// // Delete the profile of the logged-in user
// exports.deleteProfile = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.user.id);
//     if (!deletedUser) {
//       return sendResponse(res, 404, "User not found");
//     }

//     sendResponse(res, 200, "Profile deleted successfully");
//   } catch (err) {
//     sendResponse(res, 500, "Error deleting profile", null, err.message);
//   }
// };

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { gfs } = require("../db"); // Import GridFS instance
const sendResponse = require("../utils/sendResponse");
const { User } = require("../models/user.model");
const mongoose = require("mongoose");
// Storage Engine for Multer
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return {
      filename: `profile-${req.user.id}-${Date.now()}`,
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage });

// Update Profile API (Including Image Upload)
exports.updateProfile = async (req, res) => {
  const { name, age, email, role } = req.body;

  try {
      const updateFields = { name, age, email, role };

      // Check if a file was uploaded
      if (req.file) {
          updateFields.profileImage = req.file.id; // Save the file ID, not filename
      }
      console.log(updateFields);
      const updatedUser = await User.findByIdAndUpdate(
          req.user.id,
          { $set: updateFields },
          { new: true, runValidators: true }
      );

      if (!updatedUser) {
          return sendResponse(res, 404, "User not found");
      }

      sendResponse(res, 200, "Profile updated successfully", updatedUser);
  } catch (err) {
      sendResponse(res, 500, "Error updating profile", null, err.message);
  }
};

const { getGfs } = require("../db"); // Ensure the correct path to your db.js file

// const mongoose = require("mongoose");
const { Readable } = require("stream");

exports.getProfile = async (req, res) => {
    try {
        console.log("Fetching profile...");
        const user = await User.findById(req.user.id);

        if (!user) {
            return sendResponse(res, 404, "User not found");
        }

        console.log("User data:", user);

        let profileData = { ...user.toObject() };

        if (user.profileImage) {
            let gfs;
            try {
                gfs = getGfs(); // Get GridFS instance safely
            } catch (error) {
                return sendResponse(res, 500, "GridFS not initialized");
            }

            // Read image data as a buffer
            let chunks = [];
            const readStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(user.profileImage));

            readStream.on("data", (chunk) => {
                chunks.push(chunk);
            });

            readStream.on("end", () => {
                const imageBuffer = Buffer.concat(chunks);
                profileData.profileImage = `data:image/png;base64,${imageBuffer.toString("base64")}`;

                return sendResponse(res, 200, "Profile retrieved successfully", profileData);
            });

            readStream.on("error", (err) => {
                console.error("Error reading image:", err);
                return sendResponse(res, 500, "Error retrieving image");
            });

        } else {
            return sendResponse(res, 200, "Profile retrieved successfully", profileData);
        }
    } catch (error) {
        console.error("Error:", error);
        return sendResponse(res, 500, "Error retrieving profile", null, error.message);
    }
};



// exports.getProfile = async (req, res) => {
//     try {
//         console.log("Fetching profile...");
//         const user = await User.findById(req.user.id);
//         console.log(user);
//         if (!user) {
//             return sendResponse(res, 404, "User not found");
//         }

//         console.log(user.profileImage);

//         if (user.profileImage) {
//             let gfs;
//             try {
//                 gfs = getGfs(); // Get GridFS instance safely
//             } catch (error) {
//                 return sendResponse(res, 500, "GridFS not initialized");
//             }

//             const readStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(user.profileImage));
//             readStream.pipe(res);
//         } else {
//             sendResponse(res, 200, "Profile retrieved successfully", user);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         sendResponse(res, 500, "Error retrieving profile", null, error.message);
//     }
// };


// Delete the profile of the logged-in user
exports.deleteProfile = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) {
      return sendResponse(res, 404, "User not found");
    }

    sendResponse(res, 200, "Profile deleted successfully");
  } catch (err) {
    sendResponse(res, 500, "Error deleting profile", null, err.message);
  }
};

















      // gfs.files.findOne({ filename: user.profileImage }, (err, file) => {
      //     if (!file || file.length === 0) {
      //         return sendResponse(res, 404, "No profile image found");
      //     }

      //     const readStream = gfs.createReadStream(file.filename);
      //     readStream.pipe(res);
      // });
      // const file = await gfs.files.findOne({ filename: user.profileImage })