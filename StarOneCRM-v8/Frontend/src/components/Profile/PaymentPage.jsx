// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68"
// );

// const PaymentPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:5000/api/payment/payments", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setPayments(data);
//       } catch (error) {
//         console.error("Error fetching payments:", error);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const handlePayment = async () => {
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

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Stripe Payment</h1>
//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
//       >
//         {loading ? "Processing..." : "Pay $10"}
//       </button>
//       <div className="mt-8 w-full max-w-4xl">
//         <h2 className="text-xl font-bold mb-4">Payment History</h2>
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="py-2">ID</th>
//               <th className="py-2">User ID</th>
//               <th className="py-2">Session ID</th>
//               <th className="py-2">Status</th>
//               <th className="py-2">Amount</th>
//               <th className="py-2">Currency</th>
//               <th className="py-2">Method</th>
//               <th className="py-2">Created At</th>
//               <th className="py-2">Updated At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment) => (
//               <tr key={payment._id}>
//                 <td className="py-2">{payment._id}</td>
//                 <td className="py-2">{payment.userId}</td>
//                 <td className="py-2">{payment.sessionId}</td>
//                 <td className="py-2">{payment.paymentStatus}</td>
//                 <td className="py-2">{payment.amount}</td>
//                 <td className="py-2">{payment.currency}</td>
//                 <td className="py-2">{payment.paymentMethod}</td>
//                 <td className="py-2">{new Date(payment.createdAt).toLocaleString()}</td>
//                 <td className="py-2">{new Date(payment.updatedAt).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;




















// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Button, CircularProgress, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// const stripePromise = loadStripe(
//   "pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68"
// );

// const PaymentPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:5000/api/payment/payments", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setPayments(data);
//       } catch (error) {
//         console.error("Error fetching payments:", error);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const handlePayment = async () => {
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

//   return (
//     <Container maxWidth="md" style={{ marginTop: "2rem" }}>
//       <Typography variant="h4" gutterBottom>
//         Stripe Payment
//       </Typography>
//       <Button
//         onClick={handlePayment}
//         disabled={loading}
//         variant="contained"
//         color="primary"
//         startIcon={loading && <CircularProgress size={20} />}
//       >
//         {loading ? "Processing..." : "Pay $10"}
//       </Button>
//       <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
//         <Typography variant="h5" gutterBottom style={{ padding: "1rem" }}>
//           Payment History
//         </Typography>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {/* <TableCell>User ID</TableCell> */}
//               {/* <TableCell>Session ID</TableCell> */}
//               <TableCell>Status</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Currency</TableCell>
//               <TableCell>Method</TableCell>
//               <TableCell>Created At</TableCell>
//               <TableCell>Updated At</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {payments.map((payment) => (
//               <TableRow key={payment._id}>
//                 {/* <TableCell>{payment.userId}</TableCell> */}
//                 {/* <TableCell>{payment.sessionId}</TableCell> */}
//                 <TableCell>{payment.paymentStatus}</TableCell>
//                 <TableCell>{payment.amount}</TableCell>
//                 <TableCell>{payment.currency}</TableCell>
//                 <TableCell>{payment.paymentMethod}</TableCell>
//                 <TableCell>{new Date(payment.createdAt).toLocaleString()}</TableCell>
//                 <TableCell>{new Date(payment.updatedAt).toLocaleString()}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default PaymentPage;














// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Button, CircularProgress, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Grid } from "@mui/material";

// const stripePromise = loadStripe("pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68");

// const PaymentPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [payments, setPayments] = useState([]);
//   const [customAmount, setCustomAmount] = useState(10);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:5000/api/payment/payments", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setPayments(data);
//       } catch (error) {
//         console.error("Error fetching payments:", error);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const handlePayment = async () => {
//     if (customAmount <= 0) {
//       alert("Please enter a valid amount");
//       return;
//     }
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ amount: customAmount * 100 }),
//       });
//       const { id } = await response.json();
//       const stripe = await stripePromise;
//       await stripe.redirectToCheckout({ sessionId: id });
//     } catch (error) {
//       console.error("Payment error:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <Container maxWidth="md" style={{ marginTop: "2rem" }}>
//       <Typography variant="h4" gutterBottom>
//         Stripe Payment
//       </Typography>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} sm={8}>
//           <TextField
//             label="Enter Amount"
//             type="number"
//             fullWidth
//             value={customAmount}
//             onChange={(e) => setCustomAmount(e.target.value)}
//             inputProps={{ min: 1 }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Button
//             onClick={handlePayment}
//             disabled={loading}
//             variant="contained"
//             color="primary"
//             fullWidth
//             startIcon={loading && <CircularProgress size={20} />}
//           >
//             {loading ? "Processing..." : `Pay $${customAmount}`}
//           </Button>
//         </Grid>
//       </Grid>
//       <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
//         <Typography variant="h5" gutterBottom style={{ padding: "1rem" }}>
//           Payment History
//         </Typography>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Status</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Currency</TableCell>
//               <TableCell>Method</TableCell>
//               <TableCell>Created At</TableCell>
//               <TableCell>Updated At</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {payments.map((payment) => (
//               <TableRow key={payment._id}>
//                 <TableCell>{payment.paymentStatus}</TableCell>
//                 <TableCell>{payment.amount / 100}</TableCell>
//                 <TableCell>{payment.currency}</TableCell>
//                 <TableCell>{payment.paymentMethod}</TableCell>
//                 <TableCell>{new Date(payment.createdAt).toLocaleString()}</TableCell>
//                 <TableCell>{new Date(payment.updatedAt).toLocaleString()}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default PaymentPage;














// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Button, CircularProgress, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Grid, Box } from "@mui/material";

// const stripePromise = loadStripe("pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68");

// const PaymentPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [payments, setPayments] = useState([]);
//   const [customAmount, setCustomAmount] = useState(10);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:5000/api/payment/payments", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
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
//       // const response = await fetch("https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/create-checkout-session", {
//       const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ amount: amountInCents }),
//       });
//       const { id } = await response.json();
//       const stripe = await stripePromise;
//       await stripe.redirectToCheckout({ sessionId: id });
//     } catch (error) {
//       console.error("Payment error:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
//       <Box textAlign="center" p={3} boxShadow={3} borderRadius={2} bgcolor="white">
//         <Typography variant="h4" gutterBottom>
//           Stripe Payment
//         </Typography>
//         <TextField
//           label="Enter Amount ($)"
//           type="number"
//           fullWidth
//           value={customAmount}
//           onChange={(e) => setCustomAmount(e.target.value)}
//           inputProps={{ min: 1 }}
//           variant="outlined"
//           margin="normal"
//         />
//         <Button
//           onClick={handlePayment}
//           disabled={loading}
//           variant="contained"
//           color="primary"
//           fullWidth
//           size="large"
//           startIcon={loading && <CircularProgress size={20} />}
//         >
//           {loading ? "Processing..." : `Pay $${customAmount}`}
//         </Button>
//       </Box>
//       <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
//         <Typography variant="h5" gutterBottom style={{ padding: "1rem" }}>
//           Payment History
//         </Typography>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Status</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Currency</TableCell>
//               <TableCell>Method</TableCell>
//               <TableCell>Created At</TableCell>
//               <TableCell>Updated At</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {payments.map((payment) => (
//               <TableRow key={payment._id}>
//                 <TableCell>{payment.paymentStatus}</TableCell>
//                 <TableCell>${(payment.amount / 100).toFixed(2)}</TableCell>
//                 <TableCell>{payment.currency}</TableCell>
//                 <TableCell>{payment.paymentMethod}</TableCell>
//                 <TableCell>{new Date(payment.createdAt).toLocaleString()}</TableCell>
//                 <TableCell>{new Date(payment.updatedAt).toLocaleString()}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default PaymentPage;












// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Button, CircularProgress, Container, Typography, TextField, Box, Card, CardContent, Grid, Chip } from "@mui/material";
// import { format } from "date-fns";

// const stripePromise = loadStripe("pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68");

// const PaymentPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [payments, setPayments] = useState([]);
//   const [customAmount, setCustomAmount] = useState(10);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:5000/api/payment/payments", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
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
//       const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ amount: amountInCents }),
//       });
//       const { id } = await response.json();
//       const stripe = await stripePromise;
//       await stripe.redirectToCheckout({ sessionId: id });
//     } catch (error) {
//       console.error("Payment error:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
//       <Box textAlign="center" p={3} boxShadow={3} borderRadius={2} bgcolor="white">
//         <Typography variant="h4" gutterBottom>
//           Stripe Payment
//         </Typography>
//         <TextField
//           label="Enter Amount ($)"
//           type="number"
//           fullWidth
//           value={customAmount}
//           onChange={(e) => setCustomAmount(e.target.value)}
//           inputProps={{ min: 1 }}
//           variant="outlined"
//           margin="normal"
//         />
//         <Button
//           onClick={handlePayment}
//           disabled={loading}
//           variant="contained"
//           color="primary"
//           fullWidth
//           size="large"
//           startIcon={loading && <CircularProgress size={20} />}
//         >
//           {loading ? "Processing..." : `Pay $${customAmount}`}
//         </Button>
//       </Box>

//       <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
//         Payment History
//       </Typography>
//       <Grid container spacing={2}>
//         {payments.map((payment) => (
//           <Grid item xs={12} key={payment._id}>
//             <Card variant="outlined">
//               <CardContent>
//                 <Typography variant="h6">
//                   Amount: ${((payment.amount || 0) / 100).toFixed(2)} {payment.currency.toUpperCase()}
//                 </Typography>
//                 <Typography color="textSecondary">Method: {payment.paymentMethod.toUpperCase()}</Typography>
//                 <Typography color="textSecondary">Created: {format(new Date(payment.createdAt), "PPpp")}</Typography>
//                 <Typography color="textSecondary">Updated: {format(new Date(payment.updatedAt), "PPpp")}</Typography>
//                 <Chip
//                   label={payment.paymentStatus.toUpperCase()}
//                   color={payment.paymentStatus === "completed" ? "success" : "warning"}
//                   style={{ marginTop: "10px" }}
//                 />
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default PaymentPage;









// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Button, CircularProgress, Container, Typography, TextField, Box, Card, CardContent, Grid, Chip } from "@mui/material";
// import { format } from "date-fns";

// const stripePromise = loadStripe("pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68");

// const PaymentPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [payments, setPayments] = useState([]);
//   const [customAmount, setCustomAmount] = useState(10);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/payments", {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });
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
//       const response = await fetch("https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ amount: amountInCents }),
//       });
//       const { id } = await response.json();
//       const stripe = await stripePromise;
//       await stripe.redirectToCheckout({ sessionId: id });
//     } catch (error) {
//       console.error("Payment error:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <Container maxWidth="md" style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
//       <Grid container spacing={3} justifyContent="center">
//         <Grid item xs={12} sm={10} md={8}>
//           <Box textAlign="center" p={3} boxShadow={3} borderRadius={2} bgcolor="white"
//           sx={{
//             border:"none",
//             boxShadow: "none",
//           }}
//           >
//             <Typography variant="h4" gutterBottom>
//               Pay Required Amount
//             </Typography>
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
//           <Typography variant="h5" gutterBottom style={{ marginTop: "0rem", textAlign: "center" }}>
//             Payment History
//           </Typography>
//           <Grid container spacing={2}>
//             {payments.map((payment) => (
//               <Grid item xs={12} sm={6} md={4} key={payment._id}>
//                 <Card variant="outlined"
//                 sx={{
//                   border:"none",
//                   boxShadow: "none",
//                 }}>
//                   <CardContent>
//                     <Typography variant="h6">
//                       Amount: ${((payment.amount || 0) / 100).toFixed(2)} {payment.currency.toUpperCase()}
//                     </Typography>
//                     <Typography color="textSecondary">Method: {payment.paymentMethod.toUpperCase()}</Typography>
//                     <Typography color="textSecondary">Created: {format(new Date(payment.createdAt), "PPpp")}</Typography>
//                     <Typography color="textSecondary">Updated: {format(new Date(payment.updatedAt), "PPpp")}</Typography>
//                     <Chip
//                       label={payment.paymentStatus.toUpperCase()}
//                       color={payment.paymentStatus === "completed" ? "success" : "warning"}
//                       style={{ marginTop: "10px" }}
//                     />
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default PaymentPage;




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
    // { field: 'id', headerName: 'ID', width: 200 },
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