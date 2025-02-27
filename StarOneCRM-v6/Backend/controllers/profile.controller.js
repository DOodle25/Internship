const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { gfs } = require("../db"); 
const sendResponse = require("../utils/sendResponse");
const { User } = require("../models/user.model");
const mongoose = require("mongoose");
const Message = require("../models/message.model");
const Task = require("../models/task.model");
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
// exports.updateProfile = async (req, res) => {
//   const { name, age, email, role } = req.body;

//   try {
//       const updateFields = { name, age, email, role };

//       // Check if a file was uploaded
//       if (req.file) {
//           updateFields.profileImage = req.file.id; // Save the file ID, not filename
//       }
//       console.log(updateFields);
//       const updatedUser = await User.findByIdAndUpdate(
//           req.user.id,
//           { $set: updateFields },
//           { new: true, runValidators: true }
//       );

//       if (!updatedUser) {
//           return sendResponse(res, 404, "User not found");
//       }

//       sendResponse(res, 200, "Profile updated successfully", updatedUser);
//   } catch (err) {
//       sendResponse(res, 500, "Error updating profile", null, err.message);
//   }
// };


const { getGfs } = require("../db");
const { Readable } = require("stream");

exports.updateProfile = async (req, res) => {
  const { name, age, email, role } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    const updateFields = { name, age, email, role };

    if (req.file) {
      const gfs = getGfs();
      if (user.profileImage) {
        // Delete old profile image from GridFS
        await gfs.delete(new mongoose.Types.ObjectId(user.profileImage));
      }

      updateFields.profileImage = req.file.id; // Save the new image ID
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    sendResponse(res, 200, "Profile updated successfully", updatedUser);
  } catch (err) {
    sendResponse(res, 500, "Error updating profile", null, err.message);
  }
};

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



// exports.deleteProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return sendResponse(res, 404, "User not found");
//     }

//     const gfs = getGfs();
//     if (user.profileImage) {
//       // Delete profile image from GridFS
//       await gfs.delete(new mongoose.Types.ObjectId(user.profileImage));
//     }
//     if (user.role == "customer"){

//     }
//     await User.findByIdAndDelete(req.user.id);

//     sendResponse(res, 200, "Profile deleted successfully");
//   } catch (err) {
//     sendResponse(res, 500, "Error deleting profile", null, err.message);
//   }
// };

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    const gfs = getGfs();
    if (user.profileImage) {
      // Delete profile image from GridFS
      await gfs.delete(new mongoose.Types.ObjectId(user.profileImage));
    }

    if (user.role === "customer") {
      // Find all tasks assigned to this customer
      const tasks = await Task.find({ customer: user._id });

      // Collect all message IDs related to these tasks
      const messageIds = tasks.flatMap(task => task.messages);

      // Delete all messages related to these tasks
      await Message.deleteMany({ _id: { $in: messageIds } });

      // Delete all tasks assigned to this customer
      await Task.deleteMany({ customer: user._id });
    }

    // Finally, delete the user profile
    await User.findByIdAndDelete(req.user.id);
    // console.log("Deleting user profile...");

    sendResponse(res, 200, "Profile, associated tasks, and messages deleted successfully");
  } catch (err) {
    sendResponse(res, 500, "Error deleting profile", null, err.message);
  }
};