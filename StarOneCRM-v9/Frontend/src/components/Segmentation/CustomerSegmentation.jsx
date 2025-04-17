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
import GroupIcon from "@mui/icons-material/Group";
import { useGlobalContext } from "../../context/GlobalContext";

const CustomerSegmentation = () => {
  const [rfmData, setRfmData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("All");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { users } = useGlobalContext();

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

        // Map profileImage from filteredUsers to rfmData users
        const updatedData = sortedData.map((group) => ({
          ...group,
          users: group.users.map((user) => {
            const matchedUser = users.find((u) => u._id === user.userId);
            return {
              ...user,
              profileImage: matchedUser ? matchedUser.profileImage : null,
              monetary: (user.monetary / 100).toFixed(2), // Convert monetary value to proper format
            };
          }),
        }));

        setRfmData(updatedData);
        setFilteredData(updatedData);
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
      }
    } catch (error) {
      console.error("Error fetching RFM data:", error);
    }
  };

  useEffect(() => {
    fetchRFMData();
  }, [users]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSegmentChange = (event) => {
    const segment = event.target.value;
    setSelectedSegment(segment);
    if (segment === "All") {
      setFilteredData(rfmData);
    } else {
      setFilteredData(rfmData.filter((group) => group._id === segment));
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        const { name, profileImage } = params.row;
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
        ];
        const backgroundColor =
          colors[firstLetter.charCodeAt(0) - 65] || "#999";

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  minWidth: 40,
                  maxHeight: 40,
                  minHeight: 40,
                  maxWidth: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: 10,
                }}
              />
            ) : (
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
            )}
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
          <Button
            variant="contained"
            onClick={fetchRFMData}
            sx={{
              height: "50px",
              width: "35px !important",
              backgroundColor: "white",
              color: "black",
              boxShadow: "none",
              borderRadius: 16,
              boxShadow: 1,
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

      <div style={{ width: "100%", marginTop: "20px" }}>
        {filteredData.length > 0 ? (
          filteredData.map((group) => (
            <div key={group._id}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "white",
                  color: "black",
                  padding: "8px 16px",
                  // borderRadius: "8px",
                  borderRadius: 16,
                  fontWeight: "",
                  boxShadow: 1,
                }}
              >
                <GroupIcon sx={{ color: "black" }} />
                {group._id} ({group.users.length} customers)
              </Typography>

              <DataGrid
                rows={group.users.map((user) => ({
                  id: user.userId,
                  ...user,
                }))}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                autoPageSize
                sx={{
                  // boxShadow: 1,
                  borderRadius: "30px",
                  border: "none",
                  backgroundColor: "#FFFFFF",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#031738",
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
