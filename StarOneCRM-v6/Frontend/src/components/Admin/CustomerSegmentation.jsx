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

const CustomerSegmentation = () => {
  const [rfmData, setRfmData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("All");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch RFM data from backend
  const fetchRFMData = async () => {
    try {
      const response = await axiosInstance.get("/rfm/get-rfm");
      if (response.data.success) {
        setRfmData(response.data.groupedRFM);
        setFilteredData(response.data.groupedRFM);
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
    { field: "name", headerName: "Name", width: 150 },
    { field: "recency", headerName: "Recency (days)", width: 150 },
    { field: "frequency", headerName: "Frequency", width: 120 },
    { field: "monetary", headerName: "Total Spend ($)", width: 150 },
    { field: "recencyScore", headerName: "Recency Score", width: 150 },
    { field: "frequencyScore", headerName: "Frequency Score", width: 150 },
    { field: "monetaryScore", headerName: "Monetary Score", width: 150 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Customer Segmentation (RFM Analysis)
      </Typography>

      {/* Segment Filter */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Select Segment</InputLabel>
            <Select value={selectedSegment} onChange={handleSegmentChange} label="Select Segment">
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="VIP Customer">VIP Customer</MenuItem>
              <MenuItem value="Loyal Customer">Loyal Customer</MenuItem>
              <MenuItem value="At-Risk Customer">At-Risk Customer</MenuItem>
              <MenuItem value="New Customer">New Customer</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="contained" color="primary" onClick={RFMData}>
            Perform RFM Analysis
          </Button>
          <Button variant="contained" color="primary" onClick={fetchRFMData}>
            Refresh Data
          </Button>
        </Grid>
      </Grid>

      {/* RFM Data Table */}
      <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
        {filteredData.length > 0 ? (
          filteredData.map((group) => (
            <div key={group._id}>
              <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
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
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #DFDFDF",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#031738",
                    color: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-row:nth-of-type(even)": {
                    backgroundColor: "#F9F9F9",
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </div>
  );
};

export default CustomerSegmentation;
