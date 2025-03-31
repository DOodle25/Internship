// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axios";
// import {
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Grid,
//   Typography,
//   Snackbar,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import UpdateIcon from "@mui/icons-material/Update";
// import GroupIcon from "@mui/icons-material/Group";
// import { useGlobalContext } from "../../context/GlobalContext";
// const CustomerSegmentation = () => {
//   const [rfmData, setRfmData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedSegment, setSelectedSegment] = useState("All");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const { users } = useGlobalContext();

//   const fetchRFMData = async () => {
//     try {
//       await RFMData();
//       const response = await axiosInstance.get("/rfm/get-rfm");
//       if (response.data.success) {
//         const sortedData = response.data.groupedRFM.sort((a, b) => {
//           const order = [
//             "At-Risk Customer",
//             "Loyal Customer",
//             "New Customer",
//             "VIP Customer",
//           ];
//           return order.indexOf(a._id) - order.indexOf(b._id);
//         });

//         // Map profileImage from filteredUsers to rfmData users
//         const updatedData = sortedData.map((group) => ({
//           ...group,
//           users: group.users.map((user) => {
//             const matchedUser = users.find((u) => u._id === user.userId);
//             return {
//               ...user,
//               profileImage: matchedUser ? matchedUser.profileImage : null,
//             };
//           }),
//         }));

//         setRfmData(updatedData);
//         setFilteredData(updatedData);
//       }
//     } catch (error) {
//       setSnackbarMessage("Failed to fetch RFM data");
//       setSnackbarOpen(true);
//       console.error("Error fetching RFM data:", error);
//     }
//   };
//   const RFMData = async () => {
//     try {
//       const response = await axiosInstance.post("/rfm/process-rfm");
//       if (response.data.success) {
//         }
//     } catch (error) {
//       console.error("Error fetching RFM data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchRFMData();
//   }, [users]);
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };
//   const handleSegmentChange = (event) => {
//     const segment = event.target.value;
//     setSelectedSegment(segment);
//     if (segment === "All") {
//       setFilteredData(rfmData);
//     } else {
//       setFilteredData(rfmData.filter((group) => group._id === segment));
//     }
//   };

//   const columns = [
//     {
//       field: "name",
//       headerName: "Name",
//       width: 150,
//       renderCell: (params) => {
//         const { name, profileImage } = params.row;
//         const firstLetter = name.charAt(0).toUpperCase();
//         const colors = [
//           "#8B0000",
//           "#8B4513",
//           "#2F4F4F",
//           "#556B2F",
//           "#8B008B",
//           "#483D8B",
//           "#2E8B57",
//           "#4B0082",
//           "#191970",
//           "#00008B",
//           "#8B0000",
//           "#8B4513",
//           "#2F4F4F",
//           "#556B2F",
//           "#8B008B",
//           "#483D8B",
//         ];
//         const backgroundColor =
//           colors[firstLetter.charCodeAt(0) - 65] || "#999";

//         return (
//           <div style={{ display: "flex", alignItems: "center" }}>
//             {profileImage ? (
//               <img
//                 src={profileImage}
//                 alt="Profile"
//                 style={{
//                   minWidth: 40,
//                   maxHeight: 40,
//                   minHeight: 40,
//                   maxWidth: 40,
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                   marginRight: 10,
//                 }}
//               />
//             ) : (
//               <div
//                 style={{
//                   minWidth: 40,
//                   maxHeight: 40,
//                   minHeight: 40,
//                   maxWidth: 40,
//                   borderRadius: "50%",
//                   backgroundColor,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: "white",
//                   marginRight: 10,
//                 }}
//               >
//                 {firstLetter}
//               </div>
//             )}
//             {name}
//           </div>
//         );
//       },
//     },
//     { field: "recency", headerName: "Recency (days)", width: 150 },
//     { field: "frequency", headerName: "Frequency", width: 120 },
//     { field: "monetary", headerName: "Total Spend ($)", width: 150 },
//     { field: "recencyScore", headerName: "Recency Score", width: 150 },
//     { field: "frequencyScore", headerName: "Frequency Score", width: 150 },
//     { field: "monetaryScore", headerName: "Monetary Score", width: 150 },
//   ];
//   return (
//     <div style={{ padding: "20px" }}>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={8} md={10}>
//           <FormControl fullWidth>
//             <InputLabel>Select Segment</InputLabel>
//             <Select
//               value={selectedSegment}
//               onChange={handleSegmentChange}
//               label="Select Segment"
//               sx={{ backgroundColor: "#FFFFFF" }}
//             >
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="VIP Customer">VIP Customer</MenuItem>
//               <MenuItem value="Loyal Customer">Loyal Customer</MenuItem>
//               <MenuItem value="At-Risk Customer">At-Risk Customer</MenuItem>
//               <MenuItem value="New Customer">New Customer</MenuItem>
//               <MenuItem value="Other">Other</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={1} md={2}>
//           <Button
//             variant="contained"
//             onClick={fetchRFMData}
//             sx={{
//               height: "50px",
//               width: "35px !important",
//               backgroundColor: "white",
//               color: "black",
//               boxShadow: "none",
//               borderRadius: "10px",
//               "&:hover": {
//                 backgroundColor: "#f5f5f5",
//                 color: "black",
//                 boxShadow: "none",
//               },
//             }}
//           >
//             <UpdateIcon sx={{ width: "35px !important" }} />
//           </Button>
//         </Grid>
//       </Grid>

//       <div style={{ width: "100%", marginTop: "20px" }}>
//         {filteredData.length > 0 ? (
//           filteredData.map((group) => (
//             <div key={group._id}>
//               <Typography
//                 variant="h6"
//                 gutterBottom
//                 sx={{
//                   marginTop: "20px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   backgroundColor: "white",
//                   color: "black",
//                   padding: "8px 16px",
//                   borderRadius: "8px",
//                   fontWeight: "",
//                 }}
//               >
//                 <GroupIcon sx={{ color: "black" }} />
//                 {group._id} ({group.users.length} customers)
//               </Typography>

//               <DataGrid
//                 rows={group.users.map((user) => ({
//                   id: user.userId,
//                   ...user,
//                 }))}
//                 columns={columns}
//                 // paginationMode="client"
//                 initialState={{
//                   pagination: { paginationModel: { pageSize: 5 } },
//                 }}
//                 autoPageSize
//                 sx={{
//                   borderRadius: "30px",
//                   border: "none",
//                   backgroundColor: "#FFFFFF",
//                   "& .MuiDataGrid-columnHeaders": {
//                     backgroundColor: "#031738",
//                     fontSize: "16px",
//                     fontWeight: "bold",
//                   },
//                   "& .MuiDataGrid-row:nth-of-type(even)": {
//                     backgroundColor: "#FFFFFF",
//                   },
//                   "& .MuiDataGrid-row:nth-of-type(odd)": {
//                     backgroundColor: "#FFFFFF",
//                   },
//                   "& .MuiDataGrid-cell": {
//                     fontSize: "14px",
//                   },
//                 }}
//               />
//             </div>
//           ))
//         ) : (
//           <Typography>No customer data available.</Typography>
//         )}
//       </div>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//       />
//     </div>
//   );
// };

// export default CustomerSegmentation;








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
const assignRFM = (rfmData) => {
  const today = moment();

  const scoredData = rfmData.map((user) => {
    const recencyDays = today.diff(moment(user.recency), "days");

    return {
      ...user,
      recency: recencyDays,
    };
  });

  const sortedByRecency = [...scoredData].sort((a, b) => a.recency - b.recency);
  const sortedByFrequency = [...scoredData].sort(
    (a, b) => b.frequency - a.frequency
  );
  const sortedByMonetary = [...scoredData].sort(
    (a, b) => b.monetary - a.monetary
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

    await RFM.deleteMany({});

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
