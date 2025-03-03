// const moment = require("moment");
// const Payment = require("../models/payment.model");
// const User = require("../models/user.model").User;
// const RFM = require("../models/rfm.model");

// // Calculate RFM Scores
// const calculateRFM = async () => {
//   try {
//     const rfmData = await Payment.aggregate([
//       {
//         $match: { paymentStatus: "completed" },
//       },
//       {
//         $group: {
//           _id: "$userId",
//           recency: { $max: "$createdAt" },
//           frequency: { $sum: 1 },
//           monetary: { $sum: "$amount" },
//         },
//       },
//       {
//         $lookup: {
//           from: "Users",
//           localField: "_id",
//           foreignField: "_id",
//           as: "userDetails",
//         },
//       },
//       {
//         $unwind: "$userDetails",
//       },
//       {
//         $project: {
//           _id: 1,
//           name: "$userDetails.name",
//           recency: 1,
//           frequency: 1,
//           monetary: 1,
//         },
//       },
//     ]);

//     return rfmData;
//   } catch (error) {
//     console.error("Error calculating RFM:", error);
//     throw error;
//   }
// };

// // Assign RFM Scores
// const assignRFM = (rfmData) => {
//   const today = moment();

//   const scoredData = rfmData.map((user) => {
//     const recencyDays = today.diff(moment(user.recency), "days");

//     return {
//       ...user,
//       recency: recencyDays,
//     };
//   });

//   // Sorting to calculate scores
//   const sortedByRecency = [...scoredData].sort((a, b) => a.recency - b.recency);
//   const sortedByFrequency = [...scoredData].sort((a, b) => b.frequency - a.frequency);
//   const sortedByMonetary = [...scoredData].sort((a, b) => b.monetary - a.monetary);

//   // Function to assign scores
//   const assignScore = (sortedArray, key) => {
//     const n = sortedArray.length;
//     return sortedArray.map((user, index) => ({
//       ...user,
//       [`${key}Score`]: Math.ceil(((index + 1) / n) * 5),
//     }));
//   };

//   const withRecencyScore = assignScore(sortedByRecency, "recency");
//   const withFrequencyScore = assignScore(sortedByFrequency, "frequency");
//   const withMonetaryScore = assignScore(sortedByMonetary, "monetary");

//   return withRecencyScore.map((user) => ({
//     ...user,
//     frequencyScore: withFrequencyScore.find((u) => u._id.equals(user._id)).frequencyScore,
//     monetaryScore: withMonetaryScore.find((u) => u._id.equals(user._id)).monetaryScore,
//   }));
// };

// // Categorize Users
// const categorizeCustomers = (user) => {
//   const { recencyScore, frequencyScore, monetaryScore } = user;

//   if (recencyScore >= 4 && frequencyScore >= 4 && monetaryScore >= 4) {
//     return "VIP Customer";
//   } else if (frequencyScore >= 4 && monetaryScore >= 3) {
//     return "Loyal Customer";
//   } else if (recencyScore <= 2 && frequencyScore >= 4) {
//     return "At-Risk Customer";
//   } else {
//     return "New Customer";
//   }
// };

// // Save RFM Data
// exports.processRFM = async (req, res) => {
//   try {
//     const rawData = await calculateRFM();
//     const finalRFM = assignRFM(rawData);

//     const bulkOps = finalRFM.map((user) => ({
//       updateOne: {
//         filter: { userId: user._id },
//         update: {
//           $set: {
//             name: user.name,
//             recency: user.recency,
//             frequency: user.frequency,
//             monetary: user.monetary,
//             recencyScore: user.recencyScore,
//             frequencyScore: user.frequencyScore,
//             monetaryScore: user.monetaryScore,
//             rfmSegment: categorizeCustomers(user),
//           },
//         },
//         upsert: true,
//       },
//     }));

//     await RFM.bulkWrite(bulkOps);
//     res.status(200).json({ success: true, message: "RFM scores updated" });
//   } catch (error) {
//     console.error("Error processing RFM:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Fetch RFM Data Grouped by Segment
// exports.getRFMData = async (req, res) => {
//   try {
//     const groupedRFM = await RFM.aggregate([
//       {
//         $group: {
//           _id: "$rfmSegment",
//           users: {
//             $push: {
//               userId: "$userId",
//               name: "$name",
//               recency: "$recency",
//               frequency: "$frequency",
//               monetary: "$monetary",
//               recencyScore: "$recencyScore",
//               frequencyScore: "$frequencyScore",
//               monetaryScore: "$monetaryScore",
//             },
//           },
//         },
//       },
//     ]);

//     res.status(200).json({ success: true, groupedRFM });
//   } catch (error) {
//     console.error("Error fetching RFM data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const moment = require("moment");
// const Payment = require("../models/payment.model");
// const User = require("../models/user.model").User;
// const RFM = require("../models/rfm.model");

// // Calculate RFM Scores
// const calculateRFM = async () => {
//   try {
//     const rfmData = await Payment.aggregate([
//       {
//         $match: { paymentStatus: "completed" },
//       },
//       {
//         $group: {
//           _id: "$userId",
//           recency: { $max: "$createdAt" },
//           frequency: { $sum: 1 },
//           monetary: { $sum: "$amount" },
//         },
//       },
//       {
//         $lookup: {
//           from: "Users",
//           localField: "_id",
//           foreignField: "_id",
//           as: "userDetails",
//         },
//       },
//       { $unwind: "$userDetails" },
//       {
//         $project: {
//           _id: 1,
//           name: "$userDetails.name",
//           recency: 1,
//           frequency: 1,
//           monetary: 1,
//         },
//       },
//     ]);

//     return rfmData;
//   } catch (error) {
//     console.error("Error calculating RFM:", error);
//     throw error;
//   }
// };

// // Assign RFM Scores using percentile-based thresholds
// const assignRFM = (rfmData) => {
//   const today = moment();

//   const scoredData = rfmData.map((user) => ({
//     ...user,
//     recency: today.diff(moment(user.recency), "days"),
//   }));

//   // Calculate percentiles
//   const getPercentile = (arr, percentile) => {
//     const index = Math.ceil((percentile / 100) * arr.length) - 1;
//     return arr.sort((a, b) => a - b)[index] || 0;
//   };

//   const recencyPercentiles = {
//     20: getPercentile(
//       scoredData.map((u) => u.recency),
//       20
//     ),
//     40: getPercentile(
//       scoredData.map((u) => u.recency),
//       40
//     ),
//     60: getPercentile(
//       scoredData.map((u) => u.recency),
//       60
//     ),
//     80: getPercentile(
//       scoredData.map((u) => u.recency),
//       80
//     ),
//   };

//   const frequencyPercentiles = {
//     20: getPercentile(
//       scoredData.map((u) => u.frequency),
//       20
//     ),
//     40: getPercentile(
//       scoredData.map((u) => u.frequency),
//       40
//     ),
//     60: getPercentile(
//       scoredData.map((u) => u.frequency),
//       60
//     ),
//     80: getPercentile(
//       scoredData.map((u) => u.frequency),
//       80
//     ),
//   };

//   const monetaryPercentiles = {
//     20: getPercentile(
//       scoredData.map((u) => u.monetary),
//       20
//     ),
//     40: getPercentile(
//       scoredData.map((u) => u.monetary),
//       40
//     ),
//     60: getPercentile(
//       scoredData.map((u) => u.monetary),
//       60
//     ),
//     80: getPercentile(
//       scoredData.map((u) => u.monetary),
//       80
//     ),
//   };

//   // Assign Scores
//   const assignScore = (value, thresholds) => {
//     if (value <= thresholds[20]) return 1;
//     if (value <= thresholds[40]) return 2;
//     if (value <= thresholds[60]) return 3;
//     if (value <= thresholds[80]) return 4;
//     return 5;
//   };

//   return scoredData.map((user) => ({
//     ...user,
//     recencyScore: assignScore(user.recency, recencyPercentiles),
//     frequencyScore: assignScore(user.frequency, frequencyPercentiles),
//     monetaryScore: assignScore(user.monetary, monetaryPercentiles),
//   }));
// };

// // Categorize Users
// const categorizeCustomers = (user) => {
//   const { recencyScore, frequencyScore, monetaryScore } = user;

//   if (recencyScore >= 4 && frequencyScore >= 4 && monetaryScore >= 4) {
//     return "VIP Customer";
//   } else if (frequencyScore >= 4 && monetaryScore >= 3) {
//     return "Loyal Customer";
//   } else if (recencyScore <= 2 && frequencyScore >= 4) {
//     return "At-Risk Customer";
//   } else {
//     return "New Customer";
//   }
// };

// // Save RFM Data with Change Detection
// exports.processRFM = async (req, res) => {
//   try {
//     const rawData = await calculateRFM();
//     const finalRFM = assignRFM(rawData);

//     const userIds = finalRFM.map((user) => user._id);
//     const existingRFM = await RFM.find({ userId: { $in: userIds } });

//     // Create a map of existing RFM data for quick lookup
//     const existingRFMMap = new Map(
//       existingRFM.map((user) => [user.userId.toString(), user])
//     );

//     const bulkOps = finalRFM
//       .map((user) => {
//         const existingUser = existingRFMMap.get(user._id.toString());

//         if (
//           existingUser &&
//           existingUser.recency === user.recency &&
//           existingUser.frequency === user.frequency &&
//           existingUser.monetary === user.monetary &&
//           existingUser.recencyScore === user.recencyScore &&
//           existingUser.frequencyScore === user.frequencyScore &&
//           existingUser.monetaryScore === user.monetaryScore
//         ) {
//           return null; // Skip update if data hasn't changed
//         }

//         return {
//           updateOne: {
//             filter: { userId: user._id },
//             update: {
//               $set: {
//                 name: user.name,
//                 recency: user.recency,
//                 frequency: user.frequency,
//                 monetary: user.monetary,
//                 recencyScore: user.recencyScore,
//                 frequencyScore: user.frequencyScore,
//                 monetaryScore: user.monetaryScore,
//                 rfmSegment: categorizeCustomers(user),
//               },
//             },
//             upsert: true,
//           },
//         };
//       })
//       .filter(Boolean); // Remove null updates

//     if (bulkOps.length > 0) {
//       await RFM.bulkWrite(bulkOps);
//       res.status(200).json({ success: true, message: "RFM scores updated" });
//     } else {
//       res
//         .status(200)
//         .json({
//           success: true,
//           message: "No changes detected, RFM scores remain the same",
//         });
//     }
//   } catch (error) {
//     console.error("Error processing RFM:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Fetch RFM Data Grouped by Segment
// exports.getRFMData = async (req, res) => {
//   try {
//     const groupedRFM = await RFM.aggregate([
//       {
//         $group: {
//           _id: "$rfmSegment",
//           users: {
//             $push: {
//               userId: "$userId",
//               name: "$name",
//               recency: "$recency",
//               frequency: "$frequency",
//               monetary: "$monetary",
//               recencyScore: "$recencyScore",
//               frequencyScore: "$frequencyScore",
//               monetaryScore: "$monetaryScore",
//             },
//           },
//         },
//       },
//     ]);

//     res.status(200).json({ success: true, groupedRFM });
//   } catch (error) {
//     console.error("Error fetching RFM data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const moment = require("moment");
// const Payment = require("../models/payment.model");
// const User = require("../models/user.model").User;
// const RFM = require("../models/rfm.model");

// // Calculate RFM Scores
// const calculateRFM = async () => {
//   try {
//     const rfmData = await Payment.aggregate([
//       {
//         $match: { paymentStatus: "completed" },
//       },
//       {
//         $group: {
//           _id: "$userId",
//           recency: { $max: "$createdAt" },
//           frequency: { $sum: 1 },
//           monetary: { $sum: "$amount" },
//         },
//       },
//       {
//         $lookup: {
//           from: "users", // Ensure correct collection name
//           localField: "_id",
//           foreignField: "_id",
//           as: "userDetails",
//         },
//       },
//       {
//         $unwind: "$userDetails",
//       },
//       {
//         $project: {
//           _id: 1,
//           name: "$userDetails.name",
//           recency: 1,
//           frequency: 1,
//           monetary: 1,
//         },
//       },
//     ]);

//     return rfmData;
//   } catch (error) {
//     console.error("Error calculating RFM:", error);
//     throw error;
//   }
// };

// // Assign RFM Scores
// const assignRFM = (rfmData) => {
//   const today = moment().startOf("day"); // Fixes inconsistent recency calculations

//   const scoredData = rfmData.map((user) => ({
//     ...user,
//     recency: today.diff(moment(user.recency), "days"),
//   }));

//   // Stable sorting to calculate scores
//   const sortedByRecency = [...scoredData].sort((a, b) => a.recency - b.recency || a._id.toString().localeCompare(b._id.toString()));
//   const sortedByFrequency = [...scoredData].sort((a, b) => b.frequency - a.frequency || a._id.toString().localeCompare(b._id.toString()));
//   const sortedByMonetary = [...scoredData].sort((a, b) => b.monetary - a.monetary || a._id.toString().localeCompare(b._id.toString()));

//   // Function to assign scores using percentiles
//   const assignScore = (sortedArray, key) => {
//     const n = sortedArray.length;
//     return sortedArray.map((user, index) => ({
//       ...user,
//       [`${key}Score`]: Math.ceil(((index + 1) / n) * 5), // More stable scoring method
//     }));
//   };

//   const withRecencyScore = assignScore(sortedByRecency, "recency");
//   const withFrequencyScore = assignScore(sortedByFrequency, "frequency");
//   const withMonetaryScore = assignScore(sortedByMonetary, "monetary");

//   return withRecencyScore.map((user) => ({
//     ...user,
//     frequencyScore: withFrequencyScore.find((u) => u._id.equals(user._id)).frequencyScore,
//     monetaryScore: withMonetaryScore.find((u) => u._id.equals(user._id)).monetaryScore,
//   }));
// };

// // Categorize Users
// const categorizeCustomers = (user) => {
//   const { recencyScore, frequencyScore, monetaryScore } = user;

//   if (recencyScore >= 4 && frequencyScore >= 4 && monetaryScore >= 4) {
//     return "VIP Customer";
//   } else if (frequencyScore >= 4 && monetaryScore >= 3) {
//     return "Loyal Customer";
//   } else if (recencyScore <= 2 && frequencyScore >= 4) {
//     return "At-Risk Customer";
//   } else {
//     return "New Customer";
//   }
// };

// // Save RFM Data
// exports.processRFM = async (req, res) => {
//   try {
//     const rawData = await calculateRFM();
//     const finalRFM = assignRFM(rawData);

//     const bulkOps = finalRFM.map((user) => ({
//       updateOne: {
//         filter: { userId: user._id },
//         update: {
//           $set: {
//             name: user.name,
//             recency: user.recency,
//             frequency: user.frequency,
//             monetary: user.monetary,
//             recencyScore: user.recencyScore,
//             frequencyScore: user.frequencyScore,
//             monetaryScore: user.monetaryScore,
//             rfmSegment: categorizeCustomers(user),
//           },
//         },
//         upsert: true,
//       },
//     }));

//     await RFM.bulkWrite(bulkOps);
//     res.status(200).json({ success: true, message: "RFM scores updated" });
//   } catch (error) {
//     console.error("Error processing RFM:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Fetch RFM Data Grouped by Segment
// exports.getRFMData = async (req, res) => {
//   try {
//     const groupedRFM = await RFM.aggregate([
//       {
//         $group: {
//           _id: "$rfmSegment",
//           users: {
//             $push: {
//               userId: "$userId",
//               name: "$name",
//               recency: "$recency",
//               frequency: "$frequency",
//               monetary: "$monetary",
//               recencyScore: "$recencyScore",
//               frequencyScore: "$frequencyScore",
//               monetaryScore: "$monetaryScore",
//             },
//           },
//         },
//       },
//     ]);

//     res.status(200).json({ success: true, groupedRFM });
//   } catch (error) {
//     console.error("Error fetching RFM data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const moment = require("moment");
const Payment = require("../models/payment.model");
const User = require("../models/user.model").User;
const RFM = require("../models/rfm.model");

// Calculate RFM Scores
const calculateRFM = async () => {
  try {
    const rfmData = await Payment.aggregate([
      {
        $match: { paymentStatus: "completed" },
      },
      {
        $group: {
          _id: "$userId",
          recency: { $max: "$createdAt" },
          frequency: { $sum: 1 },
          monetary: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "users", // Ensure correct collection name
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: 1,
          name: "$userDetails.name",
          recency: 1,
          frequency: 1,
          monetary: 1,
        },
      },
    ]);

    return rfmData;
  } catch (error) {
    console.error("Error calculating RFM:", error);
    throw error;
  }
};

// Assign RFM Scores
const assignRFM = (rfmData) => {
  const today = moment().startOf("day"); // Fixes inconsistent recency calculations

  const scoredData = rfmData.map((user) => ({
    ...user,
    recency: today.diff(moment(user.recency), "days"),
  }));

  // Stable sorting to calculate scores
  const sortedByRecency = [...scoredData].sort(
    (a, b) =>
      a.recency - b.recency || a._id.toString().localeCompare(b._id.toString())
  );
  const sortedByFrequency = [...scoredData].sort(
    (a, b) =>
      b.frequency - a.frequency ||
      a._id.toString().localeCompare(b._id.toString())
  );
  const sortedByMonetary = [...scoredData].sort(
    (a, b) =>
      b.monetary - a.monetary ||
      a._id.toString().localeCompare(b._id.toString())
  );

  // Function to assign scores using percentiles
  const assignScore = (sortedArray, key) => {
    const n = sortedArray.length;
    return sortedArray.map((user, index) => ({
      ...user,
      [`${key}Score`]: Math.ceil(((index + 1) / n) * 5), // More stable scoring method
    }));
  };

  const withRecencyScore = assignScore(sortedByRecency, "recency");
  const withFrequencyScore = assignScore(sortedByFrequency, "frequency");
  const withMonetaryScore = assignScore(sortedByMonetary, "monetary");

  return withRecencyScore.map((user) => ({
    ...user,
    frequencyScore: withFrequencyScore.find((u) => u._id.equals(user._id))
      .frequencyScore,
    monetaryScore: withMonetaryScore.find((u) => u._id.equals(user._id))
      .monetaryScore,
  }));
};

// Categorize Users
const categorizeCustomers = (user) => {
  const { recencyScore, frequencyScore, monetaryScore } = user;

  if (recencyScore >= 4 && frequencyScore >= 4 && monetaryScore >= 4) {
    return "VIP Customer";
  } else if (frequencyScore >= 4 && monetaryScore >= 3) {
    return "Loyal Customer";
  } else if (recencyScore <= 2 && frequencyScore >= 4) {
    return "At-Risk Customer";
  } else {
    return "New Customer";
  }
};

// Save RFM Data
exports.processRFM = async (req, res) => {
  try {
    const rawData = await calculateRFM();
    const finalRFM = assignRFM(rawData);

    const userIds = finalRFM.map((user) => user._id);
    const existingRFM = await RFM.find({ userId: { $in: userIds } });

    // Create a map of existing RFM data for quick lookup
    const existingRFMMap = new Map(
      existingRFM.map((user) => [user.userId.toString(), user])
    );

    const bulkOps = finalRFM
      .map((user) => {
        const existingUser = existingRFMMap.get(user._id.toString());

        if (
          existingUser &&
          existingUser.recency === user.recency &&
          existingUser.frequency === user.frequency &&
          existingUser.monetary === user.monetary &&
          existingUser.recencyScore === user.recencyScore &&
          existingUser.frequencyScore === user.frequencyScore &&
          existingUser.monetaryScore === user.monetaryScore
        ) {
          return null; // Skip update if data hasn't changed
        }

        return {
          updateOne: {
            filter: { userId: user._id },
            update: {
              $set: {
                name: user.name,
                recency: user.recency,
                frequency: user.frequency,
                monetary: user.monetary,
                recencyScore: user.recencyScore,
                frequencyScore: user.frequencyScore,
                monetaryScore: user.monetaryScore,
                rfmSegment: categorizeCustomers(user),
              },
            },
            upsert: true,
          },
        };
      })
      .filter(Boolean); // Remove null updates

    if (bulkOps.length > 0) {
      await RFM.bulkWrite(bulkOps);
      res.status(200).json({ success: true, message: "RFM scores updated" });
    } else {
      res.status(200).json({
        success: true,
        message: "No changes detected, RFM scores remain the same",
      });
    }
  } catch (error) {
    console.error("Error processing RFM:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch RFM Data Grouped by Segment
exports.getRFMData = async (req, res) => {
  try {
    const groupedRFM = await RFM.aggregate([
      {
        $group: {
          _id: "$rfmSegment",
          users: {
            $push: {
              userId: "$userId",
              name: "$name",
              recency: "$recency",
              frequency: "$frequency",
              monetary: "$monetary",
              recencyScore: "$recencyScore",
              frequencyScore: "$frequencyScore",
              monetaryScore: "$monetaryScore",
            },
          },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by segment name in alphabetical order
      },
    ]);

    res.status(200).json({ success: true, groupedRFM });
  } catch (error) {
    console.error("Error fetching RFM data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
