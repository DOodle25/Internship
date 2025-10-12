const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      required: true,
      default: () => new mongoose.Types.ObjectId(),
    },
    profileImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fs.files",
    },
    name: {
      type: String,
      // required: [true, "Name is required"],
    },
    age: {
      type: Number,
      // required: [true, "Age is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: [true, "Email already exists"],
    },
    role: {
      type: String,
      // required: [true, "Role is required"],
      enum: ["customer", "employee"],
    },
    isFormFilled: {
      type: Boolean,
      default: false,
    },
    isFormVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
      minlength: [1, "Password must be at least 1 character long"],
    },
    tasksCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    tasksAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    // assignedPeople: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    loginMethod: {
      type: String,
      required: true,
      enum: ["traditional", "google", "facebook"],
    },
  },
  {
    timestamps: true,
  },
  { strict: false }
);

module.exports = {
  User: mongoose.model("User", userSchema, "Users"),
};
