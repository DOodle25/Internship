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
          recency: { $max: "$createdAt" }, // Most recent payment date
          frequency: { $sum: 1 }, // Total number of payments
          monetary: { $sum: "$amount" }, // Total amount spent
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
  const today = moment();

  const scoredData = rfmData.map((user) => {
    const recencyDays = today.diff(moment(user.recency), "days");

    return {
      ...user,
      recency: recencyDays,
    };
  });

  // Sorting to calculate scores
  const sortedByRecency = [...scoredData].sort((a, b) => a.recency - b.recency);
  const sortedByFrequency = [...scoredData].sort((a, b) => b.frequency - a.frequency);
  const sortedByMonetary = [...scoredData].sort((a, b) => b.monetary - a.monetary);

  // Function to assign scores
  const assignScore = (sortedArray, key) => {
    const n = sortedArray.length;
    return sortedArray.map((user, index) => ({
      ...user,
      [`${key}Score`]: Math.ceil(((index + 1) / n) * 5),
    }));
  };

  const withRecencyScore = assignScore(sortedByRecency, "recency");
  const withFrequencyScore = assignScore(sortedByFrequency, "frequency");
  const withMonetaryScore = assignScore(sortedByMonetary, "monetary");

  return withRecencyScore.map((user) => ({
    ...user,
    frequencyScore: withFrequencyScore.find((u) => u._id.equals(user._id)).frequencyScore,
    monetaryScore: withMonetaryScore.find((u) => u._id.equals(user._id)).monetaryScore,
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

    const bulkOps = finalRFM.map((user) => ({
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
    }));

    await RFM.bulkWrite(bulkOps);
    res.status(200).json({ success: true, message: "RFM scores updated" });
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
    ]);

    res.status(200).json({ success: true, groupedRFM });
  } catch (error) {
    console.error("Error fetching RFM data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
