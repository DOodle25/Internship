require("dotenv").config();
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.log("Could not connect to database", err));
};

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = new GridFSBucket(conn.db, { bucketName: "uploads" });
  console.log("GridFS Initialized");
});

module.exports.getGfs = () => {
  if (!gfs) {
    throw new Error("GridFS not initialized yet");
  }
  return gfs;
};
