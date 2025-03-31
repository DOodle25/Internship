const sendResponse = require("../utils/sendResponse");
const { User } = require("../models/user.model");
const mongoose = require("mongoose");
const Message = require("../models/message.model");
const Task = require("../models/task.model");
const { getGfs } = require("../db");

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
        await gfs.delete(new mongoose.Types.ObjectId(user.profileImage));
      }
      updateFields.profileImage = req.file.id;
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
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return sendResponse(res, 404, "User not found");
//     }
//     let profileData = { ...user.toObject() };
//     if (user.profileImage) {
//       let gfs;
//       try {
//         gfs = getGfs();
//       } catch (error) {
//         return sendResponse(res, 500, "GridFS not initialized");
//       }
//       let chunks = [];
//       const readStream = gfs.openDownloadStream(
//         new mongoose.Types.ObjectId(user.profileImage)
//       );
//       readStream.on("data", (chunk) => {
//         chunks.push(chunk);
//       });
//       readStream.on("end", () => {
//         const imageBuffer = Buffer.concat(chunks);
//         profileData.profileImage = `data:image/png;base64,${imageBuffer.toString(
//           "base64"
//         )}`;
//         return sendResponse(
//           res,
//           200,
//           "Profile retrieved successfully",
//           profileData
//         );
//       });
//       readStream.on("error", (err) => {
//         return sendResponse(res, 500, "Error retrieving image");
//       });
//     } else {
//       return sendResponse(
//         res,
//         200,
//         "Profile retrieved successfully",
//         profileData
//       );
//     }
//   } catch (error) {
//     return sendResponse(
//       res,
//       500,
//       "Error retrieving profile",
//       null,
//       error.message
//     );
//   }
// };
exports.getProfile = async (req, res) => {
  try {
    // Fetch the user and populate task titles for tasksCreated and tasksAssigned
    const user = await User.findById(req.user.id)
      .populate('tasksCreated', 'title')  // Populate task titles for tasksCreated
      .populate('tasksAssigned', 'title');  // Populate task titles for tasksAssigned

    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    let profileData = { ...user.toObject() };

    // If the user has a profile image, fetch it
    if (user.profileImage) {
      let gfs;
      try {
        gfs = getGfs();
      } catch (error) {
        return sendResponse(res, 500, "GridFS not initialized");
      }

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
        return sendResponse(res, 500, "Error retrieving image");
      });
    } else {
      // If no profile image, return the profile with task titles
      return sendResponse(res, 200, "Profile retrieved successfully", profileData);
    }
  } catch (error) {
    return sendResponse(res, 500, "Error retrieving profile", null, error.message);
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }
    const gfs = getGfs();
    if (user.profileImage) {
      await gfs.delete(new mongoose.Types.ObjectId(user.profileImage));
    }
    if (user.role === "customer") {
      const tasks = await Task.find({ customer: user._id });
      const messageIds = tasks.flatMap((task) => task.messages);
      await Message.deleteMany({ _id: { $in: messageIds } });
      await Task.deleteMany({ customer: user._id });
    }
    await User.findByIdAndDelete(req.user.id);
    sendResponse(
      res,
      200,
      "Profile, associated tasks, and messages deleted successfully"
    );
  } catch (err) {
    sendResponse(res, 500, "Error deleting profile", null, err.message);
  }
};
