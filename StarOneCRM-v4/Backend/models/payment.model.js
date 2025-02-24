const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sessionId: {
            type: String,
            required: true,
            unique: true,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Payment", paymentSchema);