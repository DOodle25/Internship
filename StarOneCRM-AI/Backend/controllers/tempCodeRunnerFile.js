const moment = require("moment");
const Payment = require("../models/payment.model");
const User = require("../models/user.model").User;
const RFM = require("../models/rfm.model");

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
          from: "users",
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
const assignRFM = (rfmData) => {
  const today = moment().startOf("day");

  const scoredData = rfmData.map((user) => ({
    ...user,
    recency: today.diff(moment(user.recency), "days"),
  }));

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
    frequencyScore: withFrequencyScore.find((u) => u._id.equals(user._id))
      .frequencyScore,
    monetaryScore: withMonetaryScore.find((u) => u._id.equals(user._id))
      .monetaryScore,
  }));
};
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
exports.processRFM = async (req, res) => {
  try {
    const rawData = await calculateRFM();
    const finalRFM = assignRFM(rawData);

    const userIds = finalRFM.map((user) => user._id);
    const existingRFM = await RFM.find({ userId: { $in: userIds } });

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
          return null;
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
      .filter(Boolean);

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
