const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isEmployeeAssigned: { type: Boolean, default: false },
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
