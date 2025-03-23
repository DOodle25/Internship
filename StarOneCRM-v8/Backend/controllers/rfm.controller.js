// const moment = require("moment");
// const Payment = require("../models/payment.model");
// const User = require("../models/user.model").User;
// const RFM = require("../models/rfm.model");

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
// const assignRFM = (rfmData) => {
//   const today = moment();

//   const scoredData = rfmData.map((user) => {
//     const recencyDays = today.diff(moment(user.recency), "days");

//     return {
//       ...user,
//       recency: recencyDays,
//     };
//   });

//   const sortedByRecency = [...scoredData].sort((a, b) => a.recency - b.recency);
//   const sortedByFrequency = [...scoredData].sort(
//     (a, b) => b.frequency - a.frequency
//   );
//   const sortedByMonetary = [...scoredData].sort(
//     (a, b) => b.monetary - a.monetary
//   );

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
//     frequencyScore: withFrequencyScore.find((u) => u._id.equals(user._id))
//       .frequencyScore,
//     monetaryScore: withMonetaryScore.find((u) => u._id.equals(user._id))
//       .monetaryScore,
//   }));
// };
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
// exports.processRFM = async (req, res) => {
//   try {
//     const rawData = await calculateRFM();
//     const finalRFM = assignRFM(rawData);

//     await RFM.deleteMany({});

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

// // Calculate RFM data from payments
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

// // Assign RFM scores based on sorted data
// const assignRFM = (rfmData, referenceTime) => {
//   const scoredData = rfmData.map((user) => ({
//     ...user,
//     recency: referenceTime.diff(moment(user.recency), "days"),
//   }));

//   // Sort with tie-breaker (userId) to ensure deterministic results
//   const sortedByRecency = [...scoredData].sort((a, b) =>
//     a.recency - b.recency || a._id.localeCompare(b._id)
//   );
//   const sortedByFrequency = [...scoredData].sort((a, b) =>
//     b.frequency - a.frequency || a._id.localeCompare(b._id)
//   );
//   const sortedByMonetary = [...scoredData].sort((a, b) =>
//     b.monetary - a.monetary || a._id.localeCompare(b._id)
//   );

//   // Assign scores while handling identical values
//   const assignScore = (sortedArray, key) => {
//     const n = sortedArray.length;
//     const scoredArray = [];
//     let currentScore = 1;

//     for (let i = 0; i < n; i++) {
//       if (i > 0 && sortedArray[i][key] !== sortedArray[i - 1][key]) {
//         currentScore = i + 1;
//       }
//       scoredArray.push({
//         ...sortedArray[i],
//         [`${key}Score`]: Math.ceil((currentScore / n) * 5),
//       });
//     }

//     return scoredArray;
//   };

//   const withRecencyScore = assignScore(sortedByRecency, "recency");
//   const withFrequencyScore = assignScore(sortedByFrequency, "frequency");
//   const withMonetaryScore = assignScore(sortedByMonetary, "monetary");

//   return withRecencyScore.map((user) => ({
//     ...user,
//     frequencyScore: withFrequencyScore.find((u) => u._id.equals(user._id))
//       .frequencyScore,
//     monetaryScore: withMonetaryScore.find((u) => u._id.equals(user._id))
//       .monetaryScore,
//   }));
// };

// // Categorize customers based on RFM scores
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

// // Process RFM data and update the database
// exports.processRFM = async (req, res) => {
//   try {
//     const lastProcessedTime = await RFM.findOne().sort({ updatedAt: -1 });
//     const newPaymentsExist = await Payment.exists({
//       paymentStatus: "completed",
//       createdAt: { $gt: lastProcessedTime?.updatedAt || 0 },
//     });

//     // Skip recalculation if no new payments exist
//     if (!newPaymentsExist && lastProcessedTime) {
//       return res.status(200).json({ success: true, message: "RFM scores up-to-date" });
//     }

//     const rawData = await calculateRFM();
//     const referenceTime = moment(); // Freeze the reference time
//     const finalRFM = assignRFM(rawData, referenceTime);

//     await RFM.deleteMany({});

//     // Bulk write RFM data to the database
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
//             updatedAt: referenceTime.toDate(),
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

// // Fetch grouped RFM data
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

// Calculate RFM data from payments
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
          monetary: { $sum: "$amount" }, // Sum of all payments in cents
        },
      },
      {
        $lookup: {
          from: "Users",
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
          monetary: { $divide: ["$monetary", 100] }, // Convert cents to dollars (xx.xx format)
        },
      },
    ]);

    return rfmData;
  } catch (error) {
    console.error("Error calculating RFM:", error);
    throw error;
  }
};

// Assign RFM scores based on sorted data
const assignRFM = (rfmData, referenceTime) => {
  const scoredData = rfmData.map((user) => ({
    ...user,
    recency: referenceTime.diff(moment(user.recency), "days"),
    monetary: parseFloat(user.monetary.toFixed(2)), // Ensure monetary is in xx.xx format
  }));

  // Sort with tie-breaker (userId) to ensure deterministic results
  const sortedByRecency = [...scoredData].sort((a, b) =>
    a.recency - b.recency || a._id.localeCompare(b._id)
  );
  const sortedByFrequency = [...scoredData].sort((a, b) =>
    b.frequency - a.frequency || a._id.localeCompare(b._id)
  );
  const sortedByMonetary = [...scoredData].sort((a, b) =>
    b.monetary - a.monetary || a._id.localeCompare(b._id)
  );

  // Assign scores while handling identical values
  const assignScore = (sortedArray, key) => {
    const n = sortedArray.length;
    const scoredArray = [];
    let currentScore = 1;

    for (let i = 0; i < n; i++) {
      if (i > 0 && sortedArray[i][key] !== sortedArray[i - 1][key]) {
        currentScore = i + 1;
      }
      scoredArray.push({
        ...sortedArray[i],
        [`${key}Score`]: Math.ceil((currentScore / n) * 5),
      });
    }

    return scoredArray;
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

// Categorize customers based on RFM scores
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

// Process RFM data and update the database
exports.processRFM = async (req, res) => {
  try {
    const lastProcessedTime = await RFM.findOne().sort({ updatedAt: -1 });
    const newPaymentsExist = await Payment.exists({
      paymentStatus: "completed",
      createdAt: { $gt: lastProcessedTime?.updatedAt || 0 },
    });

    // Skip recalculation if no new payments exist
    if (!newPaymentsExist && lastProcessedTime) {
      return res.status(200).json({ success: true, message: "RFM scores up-to-date" });
    }

    const rawData = await calculateRFM();
    const referenceTime = moment(); // Freeze the reference time
    const finalRFM = assignRFM(rawData, referenceTime);

    await RFM.deleteMany({});

    // Bulk write RFM data to the database
    const bulkOps = finalRFM.map((user) => ({
      updateOne: {
        filter: { userId: user._id },
        update: {
          $set: {
            name: user.name,
            recency: user.recency,
            frequency: user.frequency,
            monetary: parseFloat(user.monetary.toFixed(2)), // Ensure monetary is in xx.xx format
            recencyScore: user.recencyScore,
            frequencyScore: user.frequencyScore,
            monetaryScore: user.monetaryScore,
            rfmSegment: categorizeCustomers(user),
            updatedAt: referenceTime.toDate(),
          },
        },
        upsert: true,
      },
    }));

    await RFM.bulkWrite(bulkOps);
    res.status(200).json({ success: true, message: "RFM scores updated" });
  } catch (error) {
    console.error("Error processing RFM:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch grouped RFM data
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
              monetary: { $divide: ["$monetary", 100] }, // Convert cents to dollars (xx.xx format)
              recencyScore: "$recencyScore",
              frequencyScore: "$frequencyScore",
              monetaryScore: "$monetaryScore",
            },
          },
        },
      },
    ]);

    res.status(200).json({ success: true, groupedRFM });
  } catch (error) {
    console.error("Error fetching RFM data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};