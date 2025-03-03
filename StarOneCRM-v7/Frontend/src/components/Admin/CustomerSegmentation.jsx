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
// const CustomerSegmentation = ( filteredUsers ) => {
//   const [rfmData, setRfmData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedSegment, setSelectedSegment] = useState("All");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   // Fetch RFM data from backend
//   const fetchRFMData = async () => {
//     try {
//       await RFMData();
//       const response = await axiosInstance.get("/rfm/get-rfm");
//       if (response.data.success) {
//         setRfmData(response.data.groupedRFM);
//         setFilteredData(response.data.groupedRFM);
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
//         // setRfmData(response.data.groupedRFM);
//         // setFilteredData(response.data.groupedRFM);
//       }
//     } catch (error) {
//       // setSnackbarMessage("Failed to fetch RFM data");
//       // setSnackbarOpen(true);
//       console.error("Error fetching RFM data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRFMData();
//   }, []);

//   // Handle Snackbar Close
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   // Handle segment filter change
//   const handleSegmentChange = (event) => {
//     const segment = event.target.value;
//     setSelectedSegment(segment);
//     if (segment === "All") {
//       setFilteredData(rfmData);
//     } else {
//       setFilteredData(rfmData.filter((group) => group._id === segment));
//     }
//   };

//   // RFM Table Columns
//   const columns = [
//     { field: "name", headerName: "Name", width: 150 },
//     { field: "recency", headerName: "Recency (days)", width: 150 },
//     { field: "frequency", headerName: "Frequency", width: 120 },
//     { field: "monetary", headerName: "Total Spend ($)", width: 150 },
//     { field: "recencyScore", headerName: "Recency Score", width: 150 },
//     { field: "frequencyScore", headerName: "Frequency Score", width: 150 },
//     { field: "monetaryScore", headerName: "Monetary Score", width: 150 },
//   ];

//   return (
//     <div style={{ padding: "20px" }}>
//       {/* <Typography variant="h4" gutterBottom>
//         Customer Segmentation
//       </Typography> */}

//       {/* Segment Filter */}
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={8} md={10}>
//             <FormControl fullWidth>
//           <InputLabel>Select Segment</InputLabel>
//           <Select
//             value={selectedSegment}
//             onChange={handleSegmentChange}
//             label="Select Segment"
//             sx={{backgroundColor: "#FFFFFF"}}
//           >
//             <MenuItem value="All">All</MenuItem>
//             <MenuItem value="VIP Customer">VIP Customer</MenuItem>
//             <MenuItem value="Loyal Customer">Loyal Customer</MenuItem>
//             <MenuItem value="At-Risk Customer">At-Risk Customer</MenuItem>
//             <MenuItem value="New Customer">New Customer</MenuItem>
//             <MenuItem value="Other">Other</MenuItem>
//           </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={1} md={2}>
//             {/* <Button variant="contained" color="primary" onClick={fetchRFMData} fullWidth>
//             Refresh Data
//           </Button> */}
//           <Button
//             variant="contained"
//             // color="primary"
//             onClick={fetchRFMData}
//             sx={{
//               height: "50px",
//               width: "35px !important",
//               backgroundColor: "white",
//               color: "black",
//               boxShadow: "none",
//               borderRadius: "10px",
//               "&:hover": {
//               backgroundColor: "#f5f5f5",
//               color: "black",
//               boxShadow: "none",
//               },
//             }}
//             >
//             <UpdateIcon sx={{width: "35px !important",}} />
//             </Button>
//           </Grid>
//           </Grid>

//           {/* RFM Data Table */}
//       <div style={{ width: "100%", marginTop: "20px" }}>
//         {filteredData.length > 0 ? (
//           filteredData.map((group) => (
//             <div key={group._id}>
//               <Typography
//                 variant="h6"
//                 gutterBottom
//                 style={{ marginTop: "20px" }}
//               >
//                 {group._id} ({group.users.length} customers)
//               </Typography>
//               <DataGrid
//                 rows={group.users.map((user) => ({
//                   id: user.userId,
//                   ...user,
//                 }))}
//                 columns={columns}
//                 pageSize={5}
//                 paginationMode="client"
//                 initialState={{
//                   pagination: { paginationModel: { pageSize: 5 } },
//                 }}
//                 pageSizeOptions={[5, 10, 25]}
//                 sx={{
//                   backgroundColor: "#FFFFFF",
//                   border: "1px solid #DFDFDF",
//                   "& .MuiDataGrid-columnHeaders": {
//                     backgroundColor: "#031738",
//                     // color: "#FFFFFF",
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

//       {/* Snackbar for Notifications */}
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







import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UpdateIcon from "@mui/icons-material/Update";

import GroupIcon from "@mui/icons-material/Group"; // Importing an icon for better UI

const CustomerSegmentation = (filteredUsers) => {
  const [rfmData, setRfmData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("All");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch RFM data from backend
  const fetchRFMData = async () => {
    try {
      await RFMData();
      const response = await axiosInstance.get("/rfm/get-rfm");
      if (response.data.success) {
        const sortedData = response.data.groupedRFM.sort((a, b) => {
          const order = [
            "At-Risk Customer",
            "Loyal Customer",
            "New Customer",
            "VIP Customer",
          ];
          return order.indexOf(a._id) - order.indexOf(b._id);
        });
        setRfmData(sortedData);
        setFilteredData(sortedData);
      }
    } catch (error) {
      setSnackbarMessage("Failed to fetch RFM data");
      setSnackbarOpen(true);
      console.error("Error fetching RFM data:", error);
    }
  };
  const RFMData = async () => {
    try {
      const response = await axiosInstance.post("/rfm/process-rfm");
      if (response.data.success) {
        // setRfmData(response.data.groupedRFM);
        // setFilteredData(response.data.groupedRFM);
      }
    } catch (error) {
      // setSnackbarMessage("Failed to fetch RFM data");
      // setSnackbarOpen(true);
      console.error("Error fetching RFM data:", error);
    }
  };

  useEffect(() => {
    fetchRFMData();
  }, []);

  // Handle Snackbar Close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle segment filter change
  const handleSegmentChange = (event) => {
    const segment = event.target.value;
    setSelectedSegment(segment);
    if (segment === "All") {
      setFilteredData(rfmData);
    } else {
      setFilteredData(rfmData.filter((group) => group._id === segment));
    }
  };

  // RFM Table Columns
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        const name = params.value;
        const firstLetter = name.charAt(0).toUpperCase();
        const colors = [
          "#8B0000",
          "#8B4513",
          "#2F4F4F",
          "#556B2F",
          "#8B008B",
          "#483D8B",
          "#2E8B57",
          "#4B0082",
          "#191970",
          "#00008B",
          "#8B0000",
          "#8B4513",
          "#2F4F4F",
          "#556B2F",
          "#8B008B",
          "#483D8B",
          "#2E8B57",
          "#4B0082",
          "#191970",
          "#00008B",
          "#8B0000",
          "#8B4513",
          "#2F4F4F",
          "#556B2F",
          "#8B008B",
          "#483D8B",
        ];
        const backgroundColor =
          colors[firstLetter.charCodeAt(0) - 65] || "#999";
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                minWidth: 40,
                maxHeight: 40,
                minHeight: 40,
                maxWidth: 40,
                borderRadius: "50%",
                backgroundColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                marginRight: 10,
              }}
            >
              {firstLetter}
            </div>
            {name}
          </div>
        );
      },
    },
    { field: "recency", headerName: "Recency (days)", width: 150 },
    { field: "frequency", headerName: "Frequency", width: 120 },
    { field: "monetary", headerName: "Total Spend ($)", width: 150 },
    { field: "recencyScore", headerName: "Recency Score", width: 150 },
    { field: "frequencyScore", headerName: "Frequency Score", width: 150 },
    { field: "monetaryScore", headerName: "Monetary Score", width: 150 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* <Typography variant="h4" gutterBottom>
        Customer Segmentation
      </Typography> */}

      {/* Segment Filter */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8} md={10}>
          <FormControl fullWidth>
            <InputLabel>Select Segment</InputLabel>
            <Select
              value={selectedSegment}
              onChange={handleSegmentChange}
              label="Select Segment"
              sx={{ backgroundColor: "#FFFFFF" }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="VIP Customer">VIP Customer</MenuItem>
              <MenuItem value="Loyal Customer">Loyal Customer</MenuItem>
              <MenuItem value="At-Risk Customer">At-Risk Customer</MenuItem>
              <MenuItem value="New Customer">New Customer</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} md={2}>
          {/* <Button variant="contained" color="primary" onClick={fetchRFMData} fullWidth>
            Refresh Data
          </Button> */}
          <Button
            variant="contained"
            // color="primary"
            onClick={fetchRFMData}
            sx={{
              height: "50px",
              width: "35px !important",
              backgroundColor: "white",
              color: "black",
              boxShadow: "none",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "black",
                boxShadow: "none",
              },
            }}
          >
            <UpdateIcon sx={{ width: "35px !important" }} />
          </Button>
        </Grid>
      </Grid>

      {/* RFM Data Table */}
      <div style={{ width: "100%", marginTop: "20px" }}>
        {filteredData.length > 0 ? (
          filteredData.map((group) => (
            <div key={group._id}>
              {/* <Typography
                variant="h6"
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                {group._id} ({group.users.length} customers)
              </Typography> */}


<Typography
  variant="h6"
  gutterBottom
  sx={{
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: 1, // Adds spacing between icon and text
    backgroundColor: "hsl(220, 90%, 95%)", // Light blue background
    color: "hsl(220, 60%, 30%)", // Darker blue text
    padding: "8px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow
  }}
>
  <GroupIcon sx={{ color: "hsl(220, 60%, 40%)" }} /> {/* Adding an icon */}
  {group._id} ({group.users.length} customers)
</Typography>

              <DataGrid
                rows={group.users.map((user) => ({
                  id: user.userId,
                  ...user,
                }))}
                columns={columns}
                pageSize={5}
                paginationMode="client"
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                sx={{
                  borderRadius: "30px",
                  border: "none",
                  backgroundColor: "#FFFFFF",
                  // border: "1px solid #DFDFDF",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#031738",
                    // color: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-row:nth-of-type(even)": {
                    backgroundColor: "#FFFFFF",
                  },
                  "& .MuiDataGrid-row:nth-of-type(odd)": {
                    backgroundColor: "#FFFFFF",
                  },
                  "& .MuiDataGrid-cell": {
                    fontSize: "14px",
                  },
                }}
              />
            </div>
          ))
        ) : (
          <Typography>No customer data available.</Typography>
        )}
      </div>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default CustomerSegmentation;
