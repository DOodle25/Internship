// require("dotenv").config();
// const mongoose = require("mongoose");

// module.exports = () => {
//     const connection = mongoose
//         .connect(process.env.MONGODB_URI)
//         .then((result) => console.log("Connected to database"))
//         .catch((err) => console.log("could not connect to database"));
// };

// require("dotenv").config();
// const mongoose = require("mongoose");
// const Grid = require("gridfs-stream");

// module.exports = () => {
//     mongoose
//         .connect(process.env.MONGODB_URI)
//         .then(() => {
//             console.log("Connected to database");
//         })
//         .catch((err) => console.log("Could not connect to database"));
// };

// const conn = mongoose.connection;
// let gfs;

// conn.once("open", () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection("uploads");
// });

// module.exports.gfs = gfs;



// require("dotenv").config();
// const mongoose = require("mongoose");
// const Grid = require("gridfs-stream");

// module.exports = () => {
//     mongoose
//         .connect(process.env.MONGODB_URI)
//         .then(() => {
//             console.log("Connected to database");
//         })
//         .catch((err) => console.log("Could not connect to database"));
// };

// const conn = mongoose.connection;
// let gfs;

// conn.once("open", () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection("uploads");
// });

// module.exports.gfs = gfs;






// require("dotenv").config();
// const mongoose = require("mongoose");
// const Grid = require("gridfs-stream");
// const { GridFSBucket } = require("mongodb");

// module.exports = () => {
//     mongoose
//         .connect(process.env.MONGODB_URI)
//         .then(() => {
//             console.log("Connected to database");
//         })
//         .catch((err) => console.log("Could not connect to database"));
// };

// const conn = mongoose.connection;
// let gfs;

// conn.once("open", () => {
//     gfs = new GridFSBucket(conn.db, { bucketName: "uploads" }); // Ensure the correct bucket
//     console.log("GridFS Initialized");
// });

// module.exports.gfs = gfs;





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

// Export a function that returns gfs when it's available
module.exports.getGfs = () => {
    if (!gfs) {
        throw new Error("GridFS not initialized yet");
    }
    return gfs;
};







// require("dotenv").config();
// const mongoose = require("mongoose");
// const { GridFSBucket } = require("mongodb");

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const conn = mongoose.connection;
// let gfs;

// conn.once("open", () => {
//   gfs = new GridFSBucket(conn.db, { bucketName: "uploads" }); // Ensure the correct bucket
//   console.log("GridFS Initialized");
// });

// module.exports = { mongoose, gfs };
