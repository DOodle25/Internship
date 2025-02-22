// Controllers: user.controller.js
const { User } = require("../models/user.model");
const sendResponse = require("../utils/sendResponse");

exports.getProfile = async (req, res) => {
    try {
        // Get the authenticated user's profile based on their ID from the JWT token
        const user = await User.findById(req.user.id);
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        sendResponse(res, 200, "Profile retrieved successfully", user);
    } catch (error) {
        sendResponse(res, 500, "Error retrieving profile", null, error.message);
    }
};

exports.updateProfile = async (req, res) => {
    const { name, age, email, role } = req.body;

    // Ensure that the fields to be updated are valid
    if (!name && !age && !email && !role) {
        return sendResponse(res, 400, "At least one field is required for update");
    }

    try {
        // Update the profile of the logged-in user
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, age, email, role },
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

exports.deleteProfile = async (req, res) => {
    try {
        // Delete the profile of the logged-in user
        const deletedUser = await User.findByIdAndDelete(req.user.id);
        if (!deletedUser) {
            return sendResponse(res, 404, "User not found");
        }

        sendResponse(res, 200, "Profile deleted successfully");
    } catch (err) {
        sendResponse(res, 500, "Error deleting profile", null, err.message);
    }
};
