import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button, CircularProgress, Container, Typography, TextField, Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

const stripePromise = loadStripe("pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68");
const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [customAmount, setCustomAmount] = useState(10);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/payments", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);
  const handlePayment = async () => {
    const amountInCents = Math.round(parseFloat(customAmount) * 100);
    if (amountInCents <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: amountInCents }),
      });
      const { id } = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Payment error:", error);
    }
    setLoading(false);
  };
  const columns = [
    { field: 'amount', headerName: 'Amount', width: 150, renderCell: (params) => `$${(params.value / 100).toFixed(2)}` },
    { field: 'currency', headerName: 'Currency', width: 100 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 150 },
    { field: 'paymentStatus', headerName: 'Status', width: 120, renderCell: (params) => (
      <span style={{ color: params.value === 'completed' ? 'green' : 'orange' }}>
        {params.value.toUpperCase()}
      </span>
    )},
    { field: 'createdAt', headerName: 'Created At', width: 200, renderCell: (params) => format(new Date(params.value), "PPpp") },
    { field: 'updatedAt', headerName: 'Updated At', width: 200, renderCell: (params) => format(new Date(params.value), "PPpp") },
  ];
  const rows = payments.map(payment => ({
    id: payment._id,
    amount: payment.amount,
    currency: payment.currency.toUpperCase(),
    paymentMethod: payment.paymentMethod.toUpperCase(),
    paymentStatus: payment.paymentStatus,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  }));
  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
      <Grid container spacing={3} justifyContent="center" sx={{display: "flex", justifyContent: "center"}}>
        <Grid item xs={12} sm={10} md={8}>
          <Box textAlign="center" p={3} boxShadow={3} borderRadius={2} bgcolor="white" sx={{boxShadow: "none", maxWidth: 400, margin: "0 auto"}}>
            {/* <Typography variant="h4" gutterBottom>
              Pay Required Amount
            </Typography> */}
            <TextField
              label="Enter Amount ($)"
              type="number"
              fullWidth
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              inputProps={{ min: 1 }}
              variant="outlined"
              margin="normal"
            />
            <Button
              onClick={handlePayment}
              disabled={loading}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? "Processing..." : `Pay $${customAmount}`}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          {/* <Typography variant="h5" gutterBottom style={{ marginTop: "0rem", textAlign: "center" }}>
            Payment History
          </Typography> */}
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
            sx={{border: "none", boxShadow: "none", borderRadius: "30px", backgroundColor: "white"}}
              rows={rows}
              columns={columns}
              // pageSize={5}
              autoPageSize
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage;