import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button, CircularProgress, Container, Typography, TextField, Box, Card, CardContent, Grid, Chip, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { format } from "date-fns";

const stripePromise = loadStripe("pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68");

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [customAmount, setCustomAmount] = useState(10);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchadminPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/payment-admin", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPayments(data.payments);

        // Extract unique users
        const uniqueUsers = [...new Map(data.payments.map(payment => [payment.userId._id, payment.userId])).values()];
        setUsers(uniqueUsers);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchadminPayments();
  }, []);


  const filteredPayments = selectedUser ? payments.filter(payment => payment.userId._id === selectedUser) : payments;

  return (
    <>
    <Container maxWidth="md" style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Select User</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              label="Select User"
            >
              <MenuItem value="">
                <em>All Users</em>
              </MenuItem>
              {users.map(user => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="h5" gutterBottom style={{ marginTop: "0rem", textAlign: "center" }}>
            Payment History
          </Typography>
          <Grid container spacing={2}>
            {filteredPayments.map((payment) => (
              <Grid item xs={12} sm={6} md={4} key={payment._id}>
                <Card variant="outlined"
                  sx={{
                    border: "none",
                    boxShadow: "none",
                  }}>
                  <CardContent>
                    <Typography variant="h6">
                      Amount: ${((payment.amount || 0) / 100).toFixed(2)} {payment.currency.toUpperCase()}
                    </Typography>
                    <Typography color="textSecondary">Method: {payment.paymentMethod.toUpperCase()}</Typography>
                    <Typography color="textSecondary">Created: {format(new Date(payment.createdAt), "PPpp")}</Typography>
                    <Typography color="textSecondary">Updated: {format(new Date(payment.updatedAt), "PPpp")}</Typography>
                    <Chip
                      label={payment.paymentStatus.toUpperCase()}
                      color={payment.paymentStatus === "completed" ? "success" : "warning"}
                      style={{ marginTop: "10px" }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
    </Container>
    </>
  );
};

export default PaymentPage;