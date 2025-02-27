// Controller
const bcryptjs = require('bcryptjs');
const sendResponse = require("../utils/sendResponse");
const { User } = require("../models/user.model");
const { getGfs } = require("../db");

//   const { GridFsStorage } = require("multer-gridfs-storage");

// Display All Users
// exports.user_index = async (req, res) => {
//     try {
//         const users = await User.find();
//         sendResponse(res, 200, "Users retrieved successfully", users);
//     } catch (err) {
//         sendResponse(res, 500, "Error retrieving users", null, err.message);
//     }
// };

const mongoose = require("mongoose");

exports.user_index = async (req, res) => {
    try {
        const users = await User.find();
        let gfs;

        try {
            gfs = getGfs(); // Get GridFS instance safely
        } catch (error) {
            return sendResponse(res, 500, "GridFS not initialized");
        }

        // Process users to include profile images
        let usersWithImages = await Promise.all(
            users.map(async (user) => {
                let userData = { ...user.toObject() };

                if (user.profileImage) {
                    try {
                        let chunks = [];
                        const readStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(user.profileImage));

                        await new Promise((resolve, reject) => {
                            readStream.on("data", (chunk) => chunks.push(chunk));
                            readStream.on("end", () => {
                                userData.profileImage = `data:image/png;base64,${Buffer.concat(chunks).toString("base64")}`;
                                resolve();
                            });
                            readStream.on("error", (err) => reject(err));
                        });

                    } catch (error) {
                        console.error(`Error fetching profile image for user ${user._id}:`, error);
                    }
                }

                return userData;
            })
        );

        sendResponse(res, 200, "Users retrieved successfully", usersWithImages);
    } catch (err) {
        sendResponse(res, 500, "Error retrieving users", null, err.message);
    }
};



// Create New User
exports.user_create_post = async (req, res) => {
    const { name, age, email, role, password, loginMethod } = req.body;
    const hashedpassword = await bcryptjs.hash(password, 10);
    if (!name || !age || !email || !role || !password || !loginMethod) {
        return sendResponse(res, 400, "All fields are required");
    }

    if (typeof age !== "number" || age <= 0) {
        return sendResponse(res, 400, "Age must be a positive number");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return sendResponse(res, 400, "Invalid email format");
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        return sendResponse(res, 400, "Name must contain only letters and spaces");
    }

    const roleRegex = /^[A-Za-z\s]+$/;
    if (!roleRegex.test(role)) {
        return sendResponse(res, 400, "role must contain only letters and spaces");
    }

    try {
        const user = new User({ name, age, email, role, password:hashedpassword, loginMethod });
        const savedUser = await user.save();
        sendResponse(res, 201, "User created successfully", savedUser);
    } catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
            sendResponse(res, 422, `Email ${err.keyValue.email} is already in use`, null, err.message);
        } else {
            sendResponse(res, 500, "Error creating user", null, err.message);
        }
    }
};

// Show a particular User Detail by Id
exports.user_details = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            sendResponse(res, 404, "User not found");
        } else {
            sendResponse(res, 200, "User retrieved successfully", user);
        }
    } catch (err) {
        sendResponse(res, 400, "Error retrieving user", null, err.message);
    }
};

// Update User Detail by Id
exports.user_update = async (req, res) => {
    const { name, age, email, role } = req.body;

    if (!name && !age && !email && !role) {
        return sendResponse(res, 400, "At least one field is required for update");
    }

    if (name && !/^[A-Za-z\s]+$/.test(name)) {
        return sendResponse(res, 400, "Name must contain only letters and spaces");
    }

    if (age && (typeof age !== "number" || age <= 0)) {
        return sendResponse(res, 400, "Age must be a positive number");
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return sendResponse(res, 400, "Invalid email format");
    }

    if (role && !/^[A-Za-z\s]+$/.test(role)) {
        return sendResponse(res, 400, "role must contain only letters and spaces");
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            sendResponse(res, 404, "User not found");
        } else {
            sendResponse(res, 200, "User updated successfully", updatedUser);
        }
    } catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
            sendResponse(res, 422, `Email ${err.keyValue.email} is already in use`, null, err.message);
        } else {
            sendResponse(res, 500, "Error updating user", null, err.message);
        }
    }
};

// Delete User Detail by Id
exports.user_delete = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            sendResponse(res, 404, "User not found");
        } else {
            // If the user is a customer, delete associated tasks and messages
            if (deletedUser.role === 'customer') {
                await Task.deleteMany({ userId: deletedUser._id });
                await Message.deleteMany({ userId: deletedUser._id });
            }
            sendResponse(res, 200, "User and associated data deleted successfully");
        }
    } catch (err) {
        sendResponse(res, 500, "Error deleting user", null, err.message);
    }
};

exports.verifyuser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { isFormVerified: true },
            { new: true }
        );

        if (updatedUser) {
            sendResponse(res, 200, "User updated successfully", updatedUser);
        } else {
            sendResponse(res, 404, "User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};