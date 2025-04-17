// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Button,
//   CircularProgress,
//   Container,
//   Typography,
//   TextField,
//   Box,
//   Grid,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { format } from "date-fns";

// const stripePromise = loadStripe(
//   "pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68"
// );
// const PaymentPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [payments, setPayments] = useState([]);
//   const [customAmount, setCustomAmount] = useState(10);
//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/payments",
//           {
//             method: "GET",
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const data = await response.json();
//         setPayments(data);
//       } catch (error) {
//         console.error("Error fetching payments:", error);
//       }
//     };
//     fetchPayments();
//   }, []);
//   const handlePayment = async () => {
//     const amountInCents = Math.round(parseFloat(customAmount) * 100);
//     if (amountInCents <= 0) {
//       alert("Please enter a valid amount");
//       return;
//     }
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/create-checkout-session",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ amount: amountInCents }),
//         }
//       );
//       const { id } = await response.json();
//       const stripe = await stripePromise;
//       await stripe.redirectToCheckout({ sessionId: id });
//     } catch (error) {
//       console.error("Payment error:", error);
//     }
//     setLoading(false);
//   };
//   const columns = [
//     {
//       field: "amount",
//       headerName: "Amount",
//       width: 150,
//       renderCell: (params) => `$${(params.value / 100).toFixed(2)}`,
//     },
//     { field: "currency", headerName: "Currency", width: 100 },
//     { field: "paymentMethod", headerName: "Payment Method", width: 150 },
//     {
//       field: "paymentStatus",
//       headerName: "Status",
//       width: 120,
//       renderCell: (params) => (
//         <span
//           style={{ color: params.value === "completed" ? "green" : "orange" }}
//         >
//           {params.value.toUpperCase()}
//         </span>
//       ),
//     },
//     {
//       field: "createdAt",
//       headerName: "Created At",
//       width: 200,
//       renderCell: (params) => format(new Date(params.value), "PPpp"),
//     },
//     {
//       field: "updatedAt",
//       headerName: "Updated At",
//       width: 200,
//       renderCell: (params) => format(new Date(params.value), "PPpp"),
//     },
//   ];
//   const rows = payments.map((payment) => ({
//     id: payment._id,
//     amount: payment.amount,
//     currency: payment.currency.toUpperCase(),
//     paymentMethod: payment.paymentMethod.toUpperCase(),
//     paymentStatus: payment.paymentStatus,
//     createdAt: payment.createdAt,
//     updatedAt: payment.updatedAt,
//   }));
//   return (
//     <Container
//       maxWidth="lg"
//       style={{ marginTop: "2rem", paddingBottom: "2rem" }}
//     >
//       <Grid
//         container
//         spacing={3}
//         justifyContent="center"
//         sx={{ display: "flex", justifyContent: "center" }}
//       >
//         <Grid item xs={12} sm={10} md={8}>
//           <Box
//             textAlign="center"
//             p={3}
//             boxShadow={3}
//             borderRadius={2}
//             bgcolor="white"
//             sx={{ boxShadow: "none", maxWidth: 400, margin: "0 auto" }}
//           >
//             {/* <Typography variant="h4" gutterBottom>
//               Pay Required Amount
//             </Typography> */}
//             <TextField
//               label="Enter Amount ($)"
//               type="number"
//               fullWidth
//               value={customAmount}
//               onChange={(e) => setCustomAmount(e.target.value)}
//               inputProps={{ min: 1 }}
//               variant="outlined"
//               margin="normal"
//             />
//             <Button
//               onClick={handlePayment}
//               disabled={loading}
//               variant="contained"
//               color="primary"
//               fullWidth
//               size="large"
//               startIcon={loading && <CircularProgress size={20} />}
//             >
//               {loading ? "Processing..." : `Pay $${customAmount}`}
//             </Button>
//           </Box>
//         </Grid>

//         <Grid item xs={12}>
//           {/* <Typography variant="h5" gutterBottom style={{ marginTop: "0rem", textAlign: "center" }}>
//             Payment History
//           </Typography> */}
//           <div style={{ height: 400, width: "100%" }}>
//             <DataGrid
//               sx={{
//                 border: "none",
//                 boxShadow: "none",
//                 borderRadius: "30px",
//                 backgroundColor: "white",
//               }}
//               rows={rows}
//               columns={columns}
//               // pageSize={5}
//               autoPageSize
//               rowsPerPageOptions={[5, 10, 20]}
//               checkboxSelection
//               disableSelectionOnClick
//             />
//           </div>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default PaymentPage;




import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Button,
  CircularProgress,
  Container,
  Typography,
  TextField,
  Box,
  Grid,
  Paper,
  Fade,
  Grow,
  Zoom,
  Divider,
  Chip,
  Avatar,
  Tooltip,
  IconButton,
  Snackbar,
  styled,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import {
  Payment as PaymentIcon,
  History as HistoryIcon,
  Info as InfoIcon,
  CheckCircle,
  Error,
  AttachMoney,
} from "@mui/icons-material";

const stripePromise = loadStripe(
  "pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68"
);

// Styled components
const AnimatedContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  transition: "all 0.3s ease",
}));

const PaymentCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: theme.shadows[1],
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[1],
    transform: "translateY(-2px)",
  },
  maxWidth: 500,
  margin: "0 auto",
  backgroundColor: theme.palette.background.paper,
}));

const HistoryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  marginTop: theme.spacing(4),
  boxShadow: theme.shadows[1],
  transition: "all 0.3s ease",
  backgroundColor: theme.palette.background.paper,
}));

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [customAmount, setCustomAmount] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/payments",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
        showSnackbar("Failed to load payment history", "error");
      }
    };
    fetchPayments();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePayment = async () => {
    const amountInCents = Math.round(parseFloat(customAmount) * 100);
    if (amountInCents <= 0) {
      showSnackbar("Please enter a valid amount", "error");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: amountInCents }),
        }
      );
      const { id } = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Payment error:", error);
      showSnackbar("Payment failed. Please try again.", "error");
    }
    setLoading(false);
  };

  const columns = [
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AttachMoney fontSize="small" color="success" sx={{ mr: 0.5 }} />
          <Typography>{(params.value / 100).toFixed(2)}</Typography>
        </Box>
      ),
    },
    {
      field: "currency",
      headerName: "Currency",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value.toUpperCase()}
          size="small"
          variant="outlined"
          color="info"
        />
      ),
    },
    {
      field: "paymentMethod",
      headerName: "Method",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value.toUpperCase()}
          size="small"
          variant="outlined"
          color="secondary"
        />
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {params.value === "completed" ? (
            <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
          ) : (
            <Error fontSize="small" color="warning" sx={{ mr: 1 }} />
          )}
          <Typography
            sx={{
              color:
                params.value === "completed"
                  ? "success.main"
                  : "warning.main",
              fontWeight: 500,
            }}
          >
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </Typography>
        </Box>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      renderCell: (params) => (
        <Tooltip title={format(new Date(params.value), "PPpp")} arrow>
          <Typography variant="body2">
            {format(new Date(params.value), "MMM d, yyyy")}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 200,
      renderCell: (params) => (
        <Tooltip title={format(new Date(params.value), "PPpp")} arrow>
          <Typography variant="body2">
            {format(new Date(params.value), "MMM d, yyyy")}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "actions",
      headerName: "Details",
      width: 100,
      renderCell: (params) => (
        <Tooltip title="View details" arrow>
          <IconButton size="small">
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const rows = payments.map((payment) => ({
    id: payment._id,
    amount: payment.amount,
    currency: payment.currency.toUpperCase(),
    paymentMethod: payment.paymentMethod.toUpperCase(),
    paymentStatus: payment.paymentStatus,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  }));

  return (
    <Fade in={true} timeout={500}>
      <AnimatedContainer maxWidth="lg">
        <Grow in={true} timeout={600}>
          <Box>
            {/* Payment Section */}
            <Zoom in={true} style={{ transitionDelay: "100ms" }}>
              <PaymentCard elevation={3}>
                <Box textAlign="center" mb={3}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 56,
                      height: 56,
                      mb: 2,
                      mx: "auto",
                    }}
                  >
                    <PaymentIcon fontSize="large" />
                  </Avatar>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600, color: "primary.main" }}
                  >
                    Make a Payment
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enter the amount you wish to pay
                  </Typography>
                </Box>

                <TextField
                  label="Amount in USD"
                  type="number"
                  fullWidth
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  inputProps={{ min: 1, step: 0.01 }}
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <AttachMoney sx={{ color: "action.active", mr: 1 }} />
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <PaymentIcon />
                    )
                  }
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    boxShadow: "none",
                    "&:hover": {
                      boxShadow: "none",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {loading ? "Processing..." : `Pay $${customAmount}`}
                </Button>
              </PaymentCard>
            </Zoom>

            {/* Payment History Section */}
            <Zoom in={true} style={{ transitionDelay: "200ms" }}>
              <HistoryCard elevation={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <HistoryIcon
                    color="primary"
                    sx={{ fontSize: 32, mr: 2, color: "primary.main" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "primary.main" }}
                  >
                    Payment History
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ height: 500, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    autoPageSize
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    sx={{
                      border: "none",
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "background.default",
                        borderRadius: 1,
                      },
                      "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                      },
                      "& .MuiDataGrid-row": {
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "primary.light",
                        },
                      },
                    }}
                  />
                </Box>
              </HistoryCard>
            </Zoom>
          </Box>
        </Grow>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Box
            sx={{
              backgroundColor:
                snackbarSeverity === "error" ? "error.main" : "success.main",
              color: "white",
              px: 3,
              py: 2,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            {snackbarSeverity === "error" ? (
              <Error sx={{ mr: 1 }} />
            ) : (
              <CheckCircle sx={{ mr: 1 }} />
            )}
            <Typography>{snackbarMessage}</Typography>
          </Box>
        </Snackbar>
      </AnimatedContainer>
    </Fade>
  );
};

export default PaymentPage;