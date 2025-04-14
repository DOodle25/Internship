import { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

const PaymentAdminPage = () => {
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchadminPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/payment-admin",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setPayments(data.payments);

        const uniqueUsers = [
          ...new Map(
            data.payments.map((payment) => [payment.userId._id, payment.userId])
          ).values(),
        ];
        setUsers(uniqueUsers);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchadminPayments();
  }, []);
  const filteredPayments = selectedUser
    ? payments.filter((payment) => payment.userId._id === selectedUser)
    : payments;
  const columns = [
    { field: "userName", headerName: "User Name", width: 200 },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => `$${(params.value / 100).toFixed(2)}`,
    },
    { field: "currency", headerName: "Currency", width: 100 },
    { field: "paymentMethod", headerName: "Payment Method", width: 150 },
    {
      field: "paymentStatus",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span
          style={{ color: params.value === "completed" ? "green" : "orange" }}
        >
          {params.value.toUpperCase()}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      renderCell: (params) => format(new Date(params.value), "PPpp"),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 200,
      renderCell: (params) => format(new Date(params.value), "PPpp"),
    },
  ];
  const rows = filteredPayments.map((payment) => ({
    id: payment._id,
    userName: payment.userId.name,
    amount: payment.amount,
    currency: payment.currency.toUpperCase(),
    paymentMethod: payment.paymentMethod.toUpperCase(),
    paymentStatus: payment.paymentStatus,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  }));

  return (
    <Container
      maxWidth="none"
      style={{ marginTop: "2rem", paddingBottom: "2rem" }}
    >
      <FormControl
        fullWidth
        variant="outlined"
        margin="normal"
        style={{ backgroundColor: "white" }}
      >
        <InputLabel>Select User</InputLabel>
        <Select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          label="Select User"
        >
          <MenuItem value="">
            <>All Users</>
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{
            backgroundColor: "white",
            border: "none",
            boxShadow: "none",
            borderRadius: "30px",
          }}
          rows={rows}
          columns={columns}
          autoPageSize
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Container>
  );
};

export default PaymentAdminPage;
