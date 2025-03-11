// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Button, CircularProgress, Container, Typography, TextField, Box, Card, CardContent, Grid, Chip, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
// import { format } from "date-fns";

// const stripePromise = loadStripe("pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68");

// const PaymentPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [payments, setPayments] = useState([]);
//   const [customAmount, setCustomAmount] = useState(10);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");

//   useEffect(() => {
//     const fetchadminPayments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/payment-admin", {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         setPayments(data.payments);

//         // Extract unique users
//         const uniqueUsers = [...new Map(data.payments.map(payment => [payment.userId._id, payment.userId])).values()];
//         setUsers(uniqueUsers);
//       } catch (error) {
//         console.error("Error fetching payments:", error);
//       }
//     };
//     fetchadminPayments();
//   }, []);


//   const filteredPayments = selectedUser ? payments.filter(payment => payment.userId._id === selectedUser) : payments;

//   return (
//     <>
//     <Container maxWidth="md" style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
//         <Grid item xs={12}>
//           <FormControl fullWidth variant="outlined" margin="normal">
//             <InputLabel>Select User</InputLabel>
//             <Select
//               value={selectedUser}
//               onChange={(e) => setSelectedUser(e.target.value)}
//               label="Select User"
//             >
//               <MenuItem value="">
//                 <em>All Users</em>
//               </MenuItem>
//               {users.map(user => (
//                 <MenuItem key={user._id} value={user._id}>
//                   {user.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Typography variant="h5" gutterBottom style={{ marginTop: "0rem", textAlign: "center" }}>
//             Payment History
//           </Typography>
//           <Grid container spacing={2}>
//             {filteredPayments.map((payment) => (
//               <Grid item xs={12} sm={6} md={4} key={payment._id}>
//                 <Card variant="outlined"
//                   sx={{
//                     border: "none",
//                     boxShadow: "none",
//                   }}>
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
//     </Container>
//     </>
//   );
// };

// export default PaymentPage;








import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button, CircularProgress, Container, Typography, TextField, Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

const stripePromise = loadStripe("pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68");

const PaymentAdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
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

  const columns = [
    // { field: 'id', headerName: 'ID', width: 200 },
    { field: 'userName', headerName: 'User Name', width: 200 },
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

  const rows = filteredPayments.map(payment => ({
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
    <Container maxWidth="none" style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
      <FormControl fullWidth variant="outlined" margin="normal" style={{ backgroundColor: "white" }}>
        <InputLabel>Select User</InputLabel>
        <Select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          label="Select User"
        >
          <MenuItem value="">
            <>All Users</>
          </MenuItem>
          {users.map(user => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <Typography variant="h5" gutterBottom style={{ marginTop: "0rem", textAlign: "center" }}>
        Payment History
      </Typography> */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
        sx={{backgroundColor: "white", border: "none", boxShadow: "none", borderRadius: "30px"}}
          rows={rows}
          columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5, 10, 20]}
          autoPageSize
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Container>
  );
};

export default PaymentAdminPage;






// import React from 'react';
// import { styled } from "@mui/system";
// import { motion } from "framer-motion";
// import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, IconButton, TextField, Avatar } from '@mui/material';
// import { Facebook, Google, LinkedIn, Twitter } from '@mui/icons-material';

// // Styled Components
// const Navbar = styled(AppBar)({
//   backgroundColor: '#031738',
// });

// const HeroSection = styled('div')({
//   background: 'linear-gradient(to bottom, #031738, #F6F8FA)',
//   padding: '100px 0',
//   textAlign: 'center',
//   color: '#FFFFFF',
// });

// const FeatureCard = styled(Card)({
//   backgroundColor: '#FFFFFF',
//   borderRadius: '15px',
//   padding: '20px',
//   textAlign: 'center',
//   transition: 'box-shadow 0.3s ease-in-out',
//   '&:hover': {
//     boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
//   },
// });

// const Footer = styled('footer')({
//   backgroundColor: '#031738',
//   color: '#FFFFFF',
//   padding: '40px 0',
//   textAlign: 'center',
// });

// const Logo = styled('img')({
//   height: '50px',
//   marginRight: '10px',
// });

// // Motion Components
// const MotionButton = motion(Button);
// const MotionCard = motion(Card);

// const PaymentAdminPage = () => {
//   return (
//     <div>
//       {/* Navbar */}
//       <Navbar position="static">
//         <Toolbar>
//           <Logo src="logo.png" alt="StarOne CRM Logo" />
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             StarOne CRM
//           </Typography>
//           <Button color="inherit">Home</Button>
//           <Button color="inherit">Features</Button>
//           <Button color="inherit">Pricing</Button>
//           <Button color="inherit">Contact</Button>
//           <IconButton color="inherit">
//             <Avatar alt="User" src="user.png" />
//           </IconButton>
//         </Toolbar>
//       </Navbar>

//       {/* Hero Section */}
//       <HeroSection>
//         <Container>
//           <Typography variant="h2" gutterBottom>
//             Streamline Your Customer Relationships with StarOne CRM
//           </Typography>
//           <Typography variant="h5" gutterBottom>
//             A comprehensive CRM solution built on the MERN stack.
//           </Typography>
//           <MotionButton
//             variant="contained"
//             color="primary"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             Get Started
//           </MotionButton>
//           <MotionButton
//             variant="outlined"
//             color="secondary"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             sx={{ ml: 2 }}
//           >
//             Learn More
//           </MotionButton>
//         </Container>
//       </HeroSection>

//       {/* Features Section */}
//       <Container sx={{ py: 8 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Features
//         </Typography>
//         <Grid container spacing={4}>
//           {[
//             'User Authentication',
//             'User Management',
//             'Admin Features',
//             'Payment Processing',
//             'Real-time Communication',
//             'File Management',
//           ].map((feature, index) => (
//             <Grid item key={index} xs={12} sm={6} md={4}>
//               <MotionCard whileHover={{ y: -10 }}>
//                 <FeatureCard>
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       {feature}
//                     </Typography>
//                     <Typography>
//                       Detailed description of {feature.toLowerCase()}.
//                     </Typography>
//                   </CardContent>
//                 </FeatureCard>
//               </MotionCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Testimonials Section */}
//       <Container sx={{ py: 8, backgroundColor: '#FFFFFF' }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Testimonials
//         </Typography>
//         <Grid container spacing={4}>
//           {[1, 2, 3].map((index) => (
//             <Grid item key={index} xs={12} sm={4}>
//               <Card>
//                 <CardContent>
//                   <Avatar alt="User" src={`user${index}.png`} sx={{ width: 56, height: 56, mb: 2 }} />
//                   <Typography variant="h6" gutterBottom>
//                     User {index}
//                   </Typography>
//                   <Typography>
//                     "StarOne CRM has transformed our business operations!"
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Pricing Section */}
//       <Container sx={{ py: 8, backgroundColor: '#F6F8FA' }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Pricing
//         </Typography>
//         <Grid container spacing={4}>
//           {['Basic', 'Pro', 'Enterprise'].map((plan, index) => (
//             <Grid item key={index} xs={12} sm={4}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     {plan}
//                   </Typography>
//                   <Typography variant="h4" gutterBottom>
//                     $ {index === 0 ? '10' : index === 1 ? '30' : '50'} / month
//                   </Typography>
//                   <Typography>
//                     Includes all {plan.toLowerCase()} features.
//                   </Typography>
//                   <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//                     Choose Plan
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Footer */}
//       <Footer>
//         <Container>
//           <Typography variant="h6" gutterBottom>
//             StarOne CRM
//           </Typography>
//           <Typography variant="body2" gutterBottom>
//             © 2023 StarOne CRM. All rights reserved.
//           </Typography>
//           <IconButton color="inherit">
//             <Facebook />
//           </IconButton>
//           <IconButton color="inherit">
//             <Google />
//           </IconButton>
//           <IconButton color="inherit">
//             <Twitter />
//           </IconButton>
//           <IconButton color="inherit">
//             <LinkedIn />
//           </IconButton>
//         </Container>
//       </Footer>
//     </div>
//   );
// };

// export default PaymentAdminPage;


// import React, { useState } from "react";
// import { AppBar, Toolbar, Typography, Button, Container, Box, Tab, Tabs, Paper, Grid, IconButton } from "@mui/material";
// import { styled } from "@mui/system";
// import { motion } from "framer-motion";
// import GitHubIcon from "@mui/icons-material/GitHub";
// // import StarOneLogo from "./StarOneLogo"; // Recreated logo component

// // Styled Components
// const StyledAppBar = styled(AppBar)({
//   backgroundColor: "#031738",
// });

// const FeatureWindow = styled(Paper)({
//   backgroundColor: "#F6F8FA",
//   borderRadius: "12px",
//   padding: "16px",
//   position: "relative",
//   overflow: "hidden",
// });

// const AnimatedBoxShadow = styled(motion.div)({
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   background: "linear-gradient(145deg, rgba(0,0,0,0.05), rgba(255,255,255,0.05))",
//   borderRadius: "12px",
//   zIndex: 1,
// });

// const FeatureTab = styled(Tab)({
//   textTransform: "none",
//   fontWeight: "bold",
// });

// const ContributionSection = styled(Box)({
//   backgroundColor: "#031738",
//   color: "#F6F8FA",
//   padding: "40px",
//   borderRadius: "12px",
//   textAlign: "center",
// });

// // Logo Recreation (StarOneLogo.jsx)
// const StarOneLogo = () => (
//   <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <text x="0" y="30" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#F6F8FA">
//       StarOneCRM
//     </text>
//     <circle cx="100" cy="20" r="8" fill="#F6F8FA" />
//   </svg>
// );

// // Feature Tabs Data
// const features = [
//   {
//     label: "Chat",
//     content: (
//       <Box>
//         <Typography variant="h6">Real-time Chat</Typography>
//         <Typography>Experience seamless communication with Socket.io-powered chat.</Typography>
//         <Box mt={2} p={2} bgcolor="white" borderRadius="8px">
//           <Typography>User1: Hello!</Typography>
//           <Typography>User2: Hi there!</Typography>
//         </Box>
//       </Box>
//     ),
//   },
//   {
//     label: "Tasks",
//     content: (
//       <Box>
//         <Typography variant="h6">Task Management</Typography>
//         <Typography>Assign and manage tasks efficiently.</Typography>
//         <Box mt={2} p={2} bgcolor="white" borderRadius="8px">
//           <Typography>Task: Update Dashboard</Typography>
//           <Typography>Assigned to: John Doe</Typography>
//         </Box>
//       </Box>
//     ),
//   },
//   {
//     label: "Payments",
//     content: (
//       <Box>
//         <Typography variant="h6">Payment Processing</Typography>
//         <Typography>Integrated Stripe payments for seamless transactions.</Typography>
//         <Box mt={2} p={2} bgcolor="white" borderRadius="8px">
//           <Typography>Payment: $100</Typography>
//           <Typography>Status: Completed</Typography>
//         </Box>
//       </Box>
//     ),
//   },
//   {
//     label: "Video Call",
//     content: (
//       <Box>
//         <Typography variant="h6">Video Calls</Typography>
//         <Typography>Connect with peers using Peer.js and Socket.io.</Typography>
//         <Box mt={2} p={2} bgcolor="white" borderRadius="8px">
//           <Typography>Calling: User2...</Typography>
//         </Box>
//       </Box>
//     ),
//   },
// ];

// const PaymentAdminPage = () => {
//   const [tabIndex, setTabIndex] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };

//   return (
//     <Box sx={{ backgroundColor: "#F6F8FA", minHeight: "100vh" }}>
//       {/* Navbar */}
//       <StyledAppBar position="static">
//         <Toolbar>
//           <StarOneLogo />
//           <Box sx={{ flexGrow: 1 }} />
//           <Button color="inherit" href="https://github.com/DOodle25/Internship" target="_blank" startIcon={<GitHubIcon />}>
//             GitHub
//           </Button>
//         </Toolbar>
//       </StyledAppBar>

//       {/* Hero Section */}
//       <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
//         <Typography variant="h2" gutterBottom>
//           Welcome to StarOneCRM
//         </Typography>
//         <Typography variant="h6" color="textSecondary">
//           A comprehensive CRM system built with the MERN stack.
//         </Typography>
//       </Container>

//       {/* Feature Tabs */}
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <FeatureWindow>
//           <AnimatedBoxShadow
//             animate={{
//               x: [0, 100, 0],
//               y: [0, 50, 0],
//               transition: { duration: 10, repeat: Infinity },
//             }}
//           />
//           <Tabs value={tabIndex} onChange={handleTabChange} centered>
//             {features.map((feature, index) => (
//               <FeatureTab key={index} label={feature.label} />
//             ))}
//           </Tabs>
//           <Box mt={4}>{features[tabIndex].content}</Box>
//         </FeatureWindow>
//       </Container>

//       {/* Contribution Section */}
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         <ContributionSection>
//           <Typography variant="h4" gutterBottom>
//             Contribute to StarOneCRM
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             StarOneCRM is an open-source project developed by Dipen Patel. Feel free to contribute and make it better!
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             href="https://github.com/DOodle25/Internship"
//             target="_blank"
//             startIcon={<GitHubIcon />}
//             sx={{ mt: 2 }}
//           >
//             Fork on GitHub
//           </Button>
//         </ContributionSection>
//       </Container>
//     </Box>
//   );
// };

// export default PaymentAdminPage;













// import React from 'react';
// import { Box, Typography, Button, Container, Grid, IconButton } from '@mui/material';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { GitHub, LinkedIn, Email } from '@mui/icons-material';

// // Recreated Logo (Simple Text-Based Logo)
// const Logo = styled(Typography)`
//   font-family: 'Montserrat', sans-serif;
//   font-weight: 700;
//   font-size: 2rem;
//   color: white;
//   cursor: pointer;
//   &:hover {
//     color: #f6f8fa;
//   }
// `;

// // Navbar Styling
// const Navbar = styled(Box)`
//   background-color: #031738;
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: sticky;
//   top: 0;
//   z-index: 1000;
// `;

// // Chrome Window Styling
// const ChromeWindow = styled(motion.div)`
//   background-color: #f6f8fa;
//   border-radius: 12px;
//   padding: 1rem;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
//   position: relative;
// `;

// const ChromeTabs = styled(Box)`
//   display: flex;
//   gap: 0.5rem;
//   padding: 0.5rem;
//   background-color: #e4e6e8;
//   border-radius: 8px 8px 0 0;
// `;

// const ChromeTab = styled(Box)`
//   background-color: ${({ active }) => (active ? '#f6f8fa' : '#d1d3d4')};
//   padding: 0.5rem 1rem;
//   border-radius: 6px 6px 0 0;
//   cursor: pointer;
//   font-size: 0.9rem;
//   color: ${({ active }) => (active ? '#031738' : '#6c757d')};
//   &:hover {
//     background-color: #f6f8fa;
//   }
// `;

// const ChromeContent = styled(Box)`
//   background-color: white;
//   padding: 1.5rem;
//   border-radius: 0 0 8px 8px;
//   min-height: 300px;
// `;

// // Feature Section Styling
// const FeatureSection = styled(Box)`
//   padding: 4rem 0;
//   background-color: #f6f8fa;
// `;

// // Contribution Section Styling
// const ContributionSection = styled(Box)`
//   padding: 4rem 0;
//   background-color: white;
//   text-align: center;
// `;

// // Footer Styling
// const Footer = styled(Box)`
//   background-color: #031738;
//   padding: 2rem;
//   color: white;
//   text-align: center;
// `;

// // Framer Motion Variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// const staggerChildren = {
//   visible: { transition: { staggerChildren: 0.2 } },
// };

// const PaymentAdminPage = () => {
//   const [activeTab, setActiveTab] = React.useState('chat');

//   const features = [
//     {
//       id: 'chat',
//       title: 'Real-Time Chat',
//       content: (
//         <Box>
//           <Typography variant="h6">Chat with your team in real-time.</Typography>
//           <Box mt={2}>
//             <img src="https://via.placeholder.com/400x200" alt="Chat UI" style={{ borderRadius: '8px' }} />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'tasks',
//       title: 'Task Management',
//       content: (
//         <Box>
//           <Typography variant="h6">Create and assign tasks effortlessly.</Typography>
//           <Box mt={2}>
//             <img src="https://via.placeholder.com/400x200" alt="Task UI" style={{ borderRadius: '8px' }} />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'payments',
//       title: 'Payment Processing',
//       content: (
//         <Box>
//           <Typography variant="h6">Seamless payments with Stripe integration.</Typography>
//           <Box mt={2}>
//             <img src="https://via.placeholder.com/400x200" alt="Payment UI" style={{ borderRadius: '8px' }} />
//           </Box>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box>
//       {/* Navbar */}
//       <Navbar>
//         <Logo>StarOneCRM</Logo>
//         <Box>
//           <Button variant="contained" sx={{ backgroundColor: '#f6f8fa', color: '#031738', mr: 2 }}>
//             Login
//           </Button>
//           <Button variant="contained" sx={{ backgroundColor: '#f6f8fa', color: '#031738' }}>
//             Sign Up
//           </Button>
//         </Box>
//       </Navbar>

//       {/* Hero Section */}
//       <Box sx={{ backgroundColor: '#f6f8fa', py: 8 }}>
//         <Container>
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <motion.div variants={fadeInUp} initial="hidden" animate="visible">
//                 <Typography variant="h2" sx={{ fontWeight: 700, color: '#031738' }}>
//                   Streamline Your Business with StarOneCRM
//                 </Typography>
//                 <Typography variant="h6" sx={{ mt: 2, color: '#6c757d' }}>
//                   A comprehensive CRM solution built on the MERN stack.
//                 </Typography>
//                 <Box mt={4}>
//                   <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa', mr: 2 }}>
//                     Get Started
//                   </Button>
//                   <Button variant="outlined" sx={{ borderColor: '#031738', color: '#031738' }}>
//                     Learn More
//                   </Button>
//                 </Box>
//               </motion.div>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <motion.div variants={fadeInUp} initial="hidden" animate="visible">
//                 <img
//                   src="https://via.placeholder.com/600x400"
//                   alt="CRM Dashboard"
//                   style={{ borderRadius: '12px', width: '100%' }}
//                 />
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Feature Section */}
//       <FeatureSection>
//         <Container>
//           <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, color: '#031738', mb: 4 }}>
//             Features
//           </Typography>
//           <ChromeWindow>
//             <ChromeTabs>
//               {features.map((feature) => (
//                 <ChromeTab
//                   key={feature.id}
//                   active={activeTab === feature.id}
//                   onClick={() => setActiveTab(feature.id)}
//                 >
//                   {feature.title}
//                 </ChromeTab>
//               ))}
//             </ChromeTabs>
//             <ChromeContent>
//               {features.find((feature) => feature.id === activeTab)?.content}
//             </ChromeContent>
//           </ChromeWindow>
//         </Container>
//       </FeatureSection>

//       {/* Contribution Section */}
//       <ContributionSection>
//         <Container>
//           <Typography variant="h4" sx={{ fontWeight: 700, color: '#031738', mb: 4 }}>
//             How to Contribute
//           </Typography>
//           <Typography variant="h6" sx={{ color: '#6c757d', mb: 4 }}>
//             StarOneCRM is an open-source project. Join us on GitHub to contribute and improve the platform.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}
//             startIcon={<GitHub />}
//             href="https://github.com/DOodle25/Internship"
//             target="_blank"
//           >
//             Contribute on GitHub
//           </Button>
//         </Container>
//       </ContributionSection>

//       {/* Footer */}
//       <Footer>
//         <Typography variant="h6">Developed by Dipen Patel</Typography>
//         <Box mt={2}>
//           <IconButton href="https://github.com/DOodle25" target="_blank" sx={{ color: '#f6f8fa' }}>
//             <GitHub />
//           </IconButton>
//           <IconButton href="https://linkedin.com/in/dipen-patel" target="_blank" sx={{ color: '#f6f8fa' }}>
//             <LinkedIn />
//           </IconButton>
//           <IconButton href="mailto:cocply135@gmail.com" sx={{ color: '#f6f8fa' }}>
//             <Email />
//           </IconButton>
//         </Box>
//       </Footer>
//     </Box>
//   );
// };

// export default PaymentAdminPage;






// import React from 'react';
// import { Box, Typography, Button, Container, Grid, IconButton, Avatar, TextField } from '@mui/material';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { GitHub, LinkedIn, Email } from '@mui/icons-material';

// // Recreated Logo (Simple Text-Based Logo)
// const Logo = styled(Typography)`
//   font-family: 'Montserrat', sans-serif;
//   font-weight: 700;
//   font-size: 2rem;
//   color: white;
//   cursor: pointer;
//   &:hover {
//     color: #f6f8fa;
//   }
// `;

// // Navbar Styling
// const Navbar = styled(Box)`
//   background-color: #031738;
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: sticky;
//   top: 0;
//   z-index: 1000;
// `;

// // Chrome Window Styling
// const ChromeWindow = styled(motion.div)`
//   background-color: #f6f8fa;
//   border-radius: 12px;
//   padding: 1rem;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
//   position: relative;
// `;

// const ChromeTabs = styled(Box)`
//   display: flex;
//   gap: 0.5rem;
//   padding: 0.5rem;
//   background-color: #e4e6e8;
//   border-radius: 8px 8px 0 0;
// `;

// const ChromeTab = styled(Box)`
//   background-color: ${({ active }) => (active ? '#f6f8fa' : '#d1d3d4')};
//   padding: 0.5rem 1rem;
//   border-radius: 6px 6px 0 0;
//   cursor: pointer;
//   font-size: 0.9rem;
//   color: ${({ active }) => (active ? '#031738' : '#6c757d')};
//   &:hover {
//     background-color: #f6f8fa;
//   }
// `;

// const ChromeContent = styled(Box)`
//   background-color: white;
//   padding: 1.5rem;
//   border-radius: 0 0 8px 8px;
//   min-height: 300px;
// `;

// // Feature Section Styling
// const FeatureSection = styled(Box)`
//   padding: 4rem 0;
//   background-color: #f6f8fa;
// `;

// // Contribution Section Styling
// const ContributionSection = styled(Box)`
//   padding: 4rem 0;
//   background-color: white;
//   text-align: center;
// `;

// // Footer Styling
// const Footer = styled(Box)`
//   background-color: #031738;
//   padding: 2rem;
//   color: white;
//   text-align: center;
// `;

// // Framer Motion Variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// const staggerChildren = {
//   visible: { transition: { staggerChildren: 0.2 } },
// };

// // Custom UI Components for Features
// const VideoCallUI = () => (
//   <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
//     <Box sx={{ width: '70%', height: '200px', backgroundColor: '#031738', borderRadius: '8px', position: 'relative' }}>
//       <Avatar sx={{ position: 'absolute', top: '10px', left: '10px' }}>DP</Avatar>
//       <Typography variant="body2" sx={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white' }}>
//         Dipen Patel
//       </Typography>
//     </Box>
//     <Box sx={{ width: '25%', height: '150px', backgroundColor: '#031738', borderRadius: '8px', position: 'relative' }}>
//       <Avatar sx={{ position: 'absolute', top: '10px', left: '10px' }}>YP</Avatar>
//       <Typography variant="body2" sx={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white' }}>
//         You
//       </Typography>
//     </Box>
//   </Box>
// );

// const ChatUI = () => (
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '200px', overflowY: 'auto' }}>
//     <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
//       <Box sx={{ backgroundColor: '#e4e6e8', p: 1.5, borderRadius: '8px', maxWidth: '70%' }}>
//         <Typography variant="body2">Hi, how can I help you today?</Typography>
//       </Box>
//     </Box>
//     <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//       <Box sx={{ backgroundColor: '#031738', p: 1.5, borderRadius: '8px', maxWidth: '70%' }}>
//         <Typography variant="body2" sx={{ color: 'white' }}>I need help with my account.</Typography>
//       </Box>
//     </Box>
//     <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
//       <Box sx={{ backgroundColor: '#e4e6e8', p: 1.5, borderRadius: '8px', maxWidth: '70%' }}>
//         <Typography variant="body2">Sure, let me check that for you.</Typography>
//       </Box>
//     </Box>
//   </Box>
// );

// const TaskManagementUI = () => (
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//       <Box sx={{ width: '20px', height: '20px', border: '2px solid #031738', borderRadius: '4px' }} />
//       <Typography variant="body2">Complete the landing page design</Typography>
//     </Box>
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//       <Box sx={{ width: '20px', height: '20px', border: '2px solid #031738', borderRadius: '4px' }} />
//       <Typography variant="body2">Integrate payment gateway</Typography>
//     </Box>
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//       <Box sx={{ width: '20px', height: '20px', border: '2px solid #031738', borderRadius: '4px' }} />
//       <Typography variant="body2">Test the chat feature</Typography>
//     </Box>
//   </Box>
// );

// const PaymentAdminPage = () => {
//   const [activeTab, setActiveTab] = React.useState('chat');

//   const features = [
//     {
//       id: 'chat',
//       title: 'Real-Time Chat',
//       content: (
//         <Box>
//           <Typography variant="h6">Chat with your team in real-time.</Typography>
//           <Box mt={2}>
//             <ChatUI />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'tasks',
//       title: 'Task Management',
//       content: (
//         <Box>
//           <Typography variant="h6">Create and assign tasks effortlessly.</Typography>
//           <Box mt={2}>
//             <TaskManagementUI />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'video',
//       title: 'Video Calls',
//       content: (
//         <Box>
//           <Typography variant="h6">Seamless video calls with your team.</Typography>
//           <Box mt={2}>
//             <VideoCallUI />
//           </Box>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box>
//       {/* Navbar */}
//       <Navbar>
//         <Logo>StarOneCRM</Logo>
//         <Box>
//           <Button variant="contained" sx={{ backgroundColor: '#f6f8fa', color: '#031738', mr: 2 }}>
//             Login
//           </Button>
//           <Button variant="contained" sx={{ backgroundColor: '#f6f8fa', color: '#031738' }}>
//             Sign Up
//           </Button>
//         </Box>
//       </Navbar>

//       {/* Hero Section */}
//       <Box sx={{ backgroundColor: '#f6f8fa', py: 8 }}>
//         <Container>
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <motion.div variants={fadeInUp} initial="hidden" animate="visible">
//                 <Typography variant="h2" sx={{ fontWeight: 700, color: '#031738' }}>
//                   Streamline Your Business with StarOneCRM
//                 </Typography>
//                 <Typography variant="h6" sx={{ mt: 2, color: '#6c757d' }}>
//                   A comprehensive CRM solution built on the MERN stack.
//                 </Typography>
//                 <Box mt={4}>
//                   <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa', mr: 2 }}>
//                     Get Started
//                   </Button>
//                   <Button variant="outlined" sx={{ borderColor: '#031738', color: '#031738' }}>
//                     Learn More
//                   </Button>
//                 </Box>
//               </motion.div>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <motion.div variants={fadeInUp} initial="hidden" animate="visible">
//                 <img
//                   src="https://via.placeholder.com/600x400"
//                   alt="CRM Dashboard"
//                   style={{ borderRadius: '12px', width: '100%' }}
//                 />
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Feature Section */}
//       <FeatureSection>
//         <Container>
//           <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, color: '#031738', mb: 4 }}>
//             Features
//           </Typography>
//           <ChromeWindow>
//             <ChromeTabs>
//               {features.map((feature) => (
//                 <ChromeTab
//                   key={feature.id}
//                   active={activeTab === feature.id}
//                   onClick={() => setActiveTab(feature.id)}
//                 >
//                   {feature.title}
//                 </ChromeTab>
//               ))}
//             </ChromeTabs>
//             <ChromeContent>
//               {features.find((feature) => feature.id === activeTab)?.content}
//             </ChromeContent>
//           </ChromeWindow>
//         </Container>
//       </FeatureSection>

//       {/* Contribution Section */}
//       <ContributionSection>
//         <Container>
//           <Typography variant="h4" sx={{ fontWeight: 700, color: '#031738', mb: 4 }}>
//             How to Contribute
//           </Typography>
//           <Typography variant="h6" sx={{ color: '#6c757d', mb: 4 }}>
//             StarOneCRM is an open-source project. Join us on GitHub to contribute and improve the platform.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}
//             startIcon={<GitHub />}
//             href="https://github.com/DOodle25/Internship"
//             target="_blank"
//           >
//             Contribute on GitHub
//           </Button>
//         </Container>
//       </ContributionSection>

//       {/* Footer */}
//       <Footer>
//         <Typography variant="h6">Developed by Dipen Patel</Typography>
//         <Box mt={2}>
//           <IconButton href="https://github.com/DOodle25" target="_blank" sx={{ color: '#f6f8fa' }}>
//             <GitHub />
//           </IconButton>
//           <IconButton href="https://linkedin.com/in/dipen-patel" target="_blank" sx={{ color: '#f6f8fa' }}>
//             <LinkedIn />
//           </IconButton>
//           <IconButton href="mailto:cocply135@gmail.com" sx={{ color: '#f6f8fa' }}>
//             <Email />
//           </IconButton>
//         </Box>
//       </Footer>
//     </Box>
//   );
// };

// export default PaymentAdminPage;








// import React from 'react';
// import { Box, Typography, Button, Container, Grid, IconButton, Avatar, TextField } from '@mui/material';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { GitHub, LinkedIn, Email } from '@mui/icons-material';

// // Recreated Logo (Simple Text-Based Logo)
// const Logo = styled(Typography)`
//   font-family: 'Montserrat', sans-serif;
//   font-weight: 700;
//   font-size: 2rem;
//   color: white;
//   cursor: pointer;
//   &:hover {
//     color: #f6f8fa;
//   }
// `;

// // Navbar Styling
// const Navbar = styled(Box)`
//   background-color: #031738;
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: sticky;
//   top: 0;
//   z-index: 1000;
// `;

// // Chrome Window Styling
// const ChromeWindow = styled(motion.div)`
//   background-color: #f6f8fa;
//   border-radius: 12px;
//   padding: 1rem;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
//   position: relative;
// `;

// const ChromeTabs = styled(Box)`
//   display: flex;
//   gap: 0.5rem;
//   padding: 0.5rem;
//   background-color: #e4e6e8;
//   border-radius: 8px 8px 0 0;
// `;

// const ChromeTab = styled(Box)`
//   background-color: ${({ active }) => (active ? '#f6f8fa' : '#d1d3d4')};
//   padding: 0.5rem 1rem;
//   border-radius: 6px 6px 0 0;
//   cursor: pointer;
//   font-size: 0.9rem;
//   color: ${({ active }) => (active ? '#031738' : '#6c757d')};
//   &:hover {
//     background-color: #f6f8fa;
//   }
// `;

// const ChromeContent = styled(Box)`
//   background-color: white;
//   padding: 1.5rem;
//   border-radius: 0 0 8px 8px;
//   min-height: 300px;
// `;

// // Feature Section Styling
// const FeatureSection = styled(Box)`
//   padding: 4rem 0;
//   background-color: #f6f8fa;
// `;

// // Contribution Section Styling
// const ContributionSection = styled(Box)`
//   padding: 4rem 0;
//   background-color: white;
//   text-align: center;
// `;

// // Footer Styling
// const Footer = styled(Box)`
//   background-color: #031738;
//   padding: 2rem;
//   color: white;
//   text-align: center;
// `;

// // Framer Motion Variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// const staggerChildren = {
//   visible: { transition: { staggerChildren: 0.2 } },
// };

// // Custom UI Components for Features
// const VideoCallUI = () => (
//   <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
//     <Box sx={{ width: '70%', height: '200px', backgroundColor: '#031738', borderRadius: '8px', position: 'relative' }}>
//       <Avatar sx={{ position: 'absolute', top: '10px', left: '10px' }}>DP</Avatar>
//       <Typography variant="body2" sx={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white' }}>
//         Dipen Patel
//       </Typography>
//     </Box>
//     <Box sx={{ width: '25%', height: '150px', backgroundColor: '#031738', borderRadius: '8px', position: 'relative' }}>
//       <Avatar sx={{ position: 'absolute', top: '10px', left: '10px' }}>YP</Avatar>
//       <Typography variant="body2" sx={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white' }}>
//         You
//       </Typography>
//     </Box>
//   </Box>
// );

// const ChatUI = () => (
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '200px', overflowY: 'auto' }}>
//     <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
//       <Box sx={{ backgroundColor: '#e4e6e8', p: 1.5, borderRadius: '8px', maxWidth: '70%' }}>
//         <Typography variant="body2">Hi, how can I help you today?</Typography>
//       </Box>
//     </Box>
//     <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//       <Box sx={{ backgroundColor: '#031738', p: 1.5, borderRadius: '8px', maxWidth: '70%' }}>
//         <Typography variant="body2" sx={{ color: 'white' }}>I need help with my account.</Typography>
//       </Box>
//     </Box>
//     <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
//       <Box sx={{ backgroundColor: '#e4e6e8', p: 1.5, borderRadius: '8px', maxWidth: '70%' }}>
//         <Typography variant="body2">Sure, let me check that for you.</Typography>
//       </Box>
//     </Box>
//   </Box>
// );

// const TaskManagementUI = () => (
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//       <Box sx={{ width: '20px', height: '20px', border: '2px solid #031738', borderRadius: '4px' }} />
//       <Typography variant="body2">Complete the landing page design</Typography>
//     </Box>
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//       <Box sx={{ width: '20px', height: '20px', border: '2px solid #031738', borderRadius: '4px' }} />
//       <Typography variant="body2">Integrate payment gateway</Typography>
//     </Box>
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//       <Box sx={{ width: '20px', height: '20px', border: '2px solid #031738', borderRadius: '4px' }} />
//       <Typography variant="body2">Test the chat feature</Typography>
//     </Box>
//   </Box>
// );

// const UserAuthenticationUI = () => (
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//     <Typography variant="h6">User Authentication</Typography>
//     <Box sx={{ display: 'flex', gap: 2 }}>
//       <Button variant="contained" sx={{ backgroundColor: '#db4437', color: '#f6f8fa' }}>
//         Google Login
//       </Button>
//       <Button variant="contained" sx={{ backgroundColor: '#4267B2', color: '#f6f8fa' }}>
//         Facebook Login
//       </Button>
//     </Box>
//     <TextField label="OTP" variant="outlined" fullWidth />
//     <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//       Submit OTP
//     </Button>
//   </Box>
// );

// const UserManagementUI = () => (
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//     <Typography variant="h6">User Management</Typography>
//     <Box sx={{ display: 'flex', gap: 2 }}>
//       <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//         Edit Profile
//       </Button>
//       <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//         Upload Images
//       </Button>
//     </Box>
//     <Box sx={{ display: 'flex', gap: 2 }}>
//       <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//         Create Tasks
//       </Button>
//       <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//         Assign Tasks
//       </Button>
//     </Box>
//     <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//       View Payment History
//     </Button>
//   </Box>
// );

// const AdminFeaturesUI = () => (
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//     <Typography variant="h6">Admin Features</Typography>
//     <Box sx={{ display: 'flex', gap: 2 }}>
//       <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//         Verify User Data
//       </Button>
//       <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//         Manage Users
//       </Button>
//     </Box>
//     <Box sx={{ display: 'flex', gap: 2 }}>
//       <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//         Manage Tasks
//       </Button>
//       <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//         RFM Model
//       </Button>
//     </Box>
//   </Box>
// );

// const PaymentProcessingUI = () => (
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//     <Typography variant="h6">Payment Processing</Typography>
//     <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//       Stripe Integration
//     </Button>
//     <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//       View Payment History
//     </Button>
//   </Box>
// );

// const FileManagementUI = () => (
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//     <Typography variant="h6">File Management</Typography>
//     <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}>
//       Upload Photos
//     </Button>
//   </Box>
// );

// const PaymentAdminPage = () => {
//   const [activeTab, setActiveTab] = React.useState('chat');

//   const features = [
//     {
//       id: 'chat',
//       title: 'Real-Time Chat',
//       content: (
//         <Box>
//           <Typography variant="h6">Chat with your team in real-time.</Typography>
//           <Box mt={2}>
//             <ChatUI />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'tasks',
//       title: 'Task Management',
//       content: (
//         <Box>
//           <Typography variant="h6">Create and assign tasks effortlessly.</Typography>
//           <Box mt={2}>
//             <TaskManagementUI />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'video',
//       title: 'Video Calls',
//       content: (
//         <Box>
//           <Typography variant="h6">Seamless video calls with your team.</Typography>
//           <Box mt={2}>
//             <VideoCallUI />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'auth',
//       title: 'User Authentication',
//       content: (
//         <Box>
//           <Typography variant="h6">Secure and flexible user authentication.</Typography>
//           <Box mt={2}>
//             <UserAuthenticationUI />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'user',
//       title: 'User Management',
//       content: (
//         <Box>
//           <Typography variant="h6">Manage users and tasks efficiently.</Typography>
//           <Box mt={2}>
//             <UserManagementUI />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'admin',
//       title: 'Admin Features',
//       content: (
//         <Box>
//           <Typography variant="h6">Advanced admin capabilities.</Typography>
//           <Box mt={2}>
//             <AdminFeaturesUI />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'payment',
//       title: 'Payment Processing',
//       content: (
//         <Box>
//           <Typography variant="h6">Integrated payment solutions.</Typography>
//           <Box mt={2}>
//             <PaymentProcessingUI />
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: 'file',
//       title: 'File Management',
//       content: (
//         <Box>
//           <Typography variant="h6">Efficient file handling.</Typography>
//           <Box mt={2}>
//             <FileManagementUI />
//           </Box>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box>
//       {/* Navbar */}
//       <Navbar>
//         <Logo>StarOneCRM</Logo>
//         <Box>
//           <Button variant="contained" sx={{ backgroundColor: '#f6f8fa', color: '#031738', mr: 2 }}>
//             Login
//           </Button>
//           <Button variant="contained" sx={{ backgroundColor: '#f6f8fa', color: '#031738' }}>
//             Sign Up
//           </Button>
//         </Box>
//       </Navbar>

//       {/* Hero Section */}
//       <Box sx={{ backgroundColor: '#f6f8fa', py: 8 }}>
//         <Container>
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <motion.div variants={fadeInUp} initial="hidden" animate="visible">
//                 <Typography variant="h2" sx={{ fontWeight: 700, color: '#031738' }}>
//                   Streamline Your Business with StarOneCRM
//                 </Typography>
//                 <Typography variant="h6" sx={{ mt: 2, color: '#6c757d' }}>
//                   A comprehensive CRM solution built on the MERN stack.
//                 </Typography>
//                 <Box mt={4}>
//                   <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa', mr: 2 }}>
//                     Get Started
//                   </Button>
//                   <Button variant="outlined" sx={{ borderColor: '#031738', color: '#031738' }}>
//                     Learn More
//                   </Button>
//                 </Box>
//               </motion.div>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <motion.div variants={fadeInUp} initial="hidden" animate="visible">
//                 <img
//                   src="https://via.placeholder.com/600x400"
//                   alt="CRM Dashboard"
//                   style={{ borderRadius: '12px', width: '100%' }}
//                 />
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Feature Section */}
//       <FeatureSection>
//         <Container>
//           <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, color: '#031738', mb: 4 }}>
//             Features
//           </Typography>
//           <ChromeWindow>
//             <ChromeTabs>
//               {features.map((feature) => (
//                 <ChromeTab
//                   key={feature.id}
//                   active={activeTab === feature.id}
//                   onClick={() => setActiveTab(feature.id)}
//                 >
//                   {feature.title}
//                 </ChromeTab>
//               ))}
//             </ChromeTabs>
//             <ChromeContent>
//               {features.find((feature) => feature.id === activeTab)?.content}
//             </ChromeContent>
//           </ChromeWindow>
//         </Container>
//       </FeatureSection>

//       {/* Contribution Section */}
//       <ContributionSection>
//         <Container>
//           <Typography variant="h4" sx={{ fontWeight: 700, color: '#031738', mb: 4 }}>
//             How to Contribute
//           </Typography>
//           <Typography variant="h6" sx={{ color: '#6c757d', mb: 4 }}>
//             StarOneCRM is an open-source project. Join us on GitHub to contribute and improve the platform.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}
//             startIcon={<GitHub />}
//             href="https://github.com/DOodle25/Internship"
//             target="_blank"
//           >
//             Contribute on GitHub
//           </Button>
//         </Container>
//       </ContributionSection>

//       {/* Footer */}
//       <Footer>
//         <Typography variant="h6">Developed by Dipen Patel</Typography>
//         <Box mt={2}>
//           <IconButton href="https://github.com/DOodle25" target="_blank" sx={{ color: '#f6f8fa' }}>
//             <GitHub />
//           </IconButton>
//           <IconButton href="https://linkedin.com/in/dipen-patel" target="_blank" sx={{ color: '#f6f8fa' }}>
//             <LinkedIn />
//           </IconButton>
//           <IconButton href="mailto:cocply135@gmail.com" sx={{ color: '#f6f8fa' }}>
//             <Email />
//           </IconButton>
//         </Box>
//       </Footer>
//     </Box>
//   );
// };

// export default PaymentAdminPage;



// import React from 'react';
// import { Box, Typography, Button, Container, Grid, IconButton, Avatar } from '@mui/material';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { GitHub, LinkedIn, Email } from '@mui/icons-material';

// // Recreated Logo (Simple Text-Based Logo)
// const Logo = styled(Typography)`
//   font-family: 'Montserrat', sans-serif;
//   font-weight: 700;
//   font-size: 2rem;
//   color: white;
//   cursor: pointer;
//   &:hover {
//     color: #f6f8fa;
//   }
// `;

// // Navbar Styling
// const Navbar = styled(Box)`
//   background-color: #031738;
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: sticky;
//   top: 0;
//   z-index: 1000;
// `;

// // Feature Section Styling
// const FeatureSection = styled(Box)`
//   padding: 4rem 0;
//   background-color: #f6f8fa;
// `;

// const FeatureContainer = styled(Container)`
//   display: flex;
//   flex-direction: column;
//   gap: 4rem;
// `;

// const FeatureItem = styled(Grid)`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 2rem;
// `;

// const FeatureText = styled(Box)`
//   max-width: 50%;
// `;

// const FeatureImage = styled(Box)`
//   max-width: 50%;
//   img {
//     border-radius: 12px;
//     width: 100%;
//   }
// `;

// // Contribution Section Styling
// const ContributionSection = styled(Box)`
//   padding: 4rem 0;
//   background-color: white;
//   text-align: center;
// `;

// // Footer Styling
// const Footer = styled(Box)`
//   background-color: #031738;
//   padding: 2rem;
//   color: white;
//   text-align: center;
// `;

// // Framer Motion Variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };

// const staggerChildren = {
//   visible: { transition: { staggerChildren: 0.2 } },
// };

// const LandingPage = () => {
//   const features = [
//     {
//       id: 'chat',
//       title: 'Real-Time Chat',
//       description:
//         'Communicate with your team in real-time using our advanced chat feature. Stay connected and collaborate seamlessly.',
//       image: 'https://via.placeholder.com/400x300',
//     },
//     {
//       id: 'tasks',
//       title: 'Task Management',
//       description:
//         'Efficiently create, assign, and track tasks. Our task management system ensures productivity and organization.',
//       image: 'https://via.placeholder.com/400x300',
//     },
//     {
//       id: 'video',
//       title: 'Video Calls',
//       description:
//         'Conduct high-quality video calls with your team. Our video call feature ensures smooth and uninterrupted communication.',
//       image: 'https://via.placeholder.com/400x300',
//     },
//   ];

//   return (
//     <Box>
//       {/* Navbar */}
//       <Navbar>
//         <Logo>StarOneCRM</Logo>
//         <Box>
//           <Button variant="contained" sx={{ backgroundColor: '#f6f8fa', color: '#031738', mr: 2 }}>
//             Login
//           </Button>
//           <Button variant="contained" sx={{ backgroundColor: '#f6f8fa', color: '#031738' }}>
//             Sign Up
//           </Button>
//         </Box>
//       </Navbar>

//       {/* Hero Section */}
//       <Box sx={{ backgroundColor: '#f6f8fa', py: 8 }}>
//         <Container>
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <motion.div variants={fadeInUp} initial="hidden" animate="visible">
//                 <Typography variant="h2" sx={{ fontWeight: 700, color: '#031738' }}>
//                   Streamline Your Business with StarOneCRM
//                 </Typography>
//                 <Typography variant="h6" sx={{ mt: 2, color: '#6c757d' }}>
//                   A comprehensive CRM solution built on the MERN stack.
//                 </Typography>
//                 <Box mt={4}>
//                   <Button variant="contained" sx={{ backgroundColor: '#031738', color: '#f6f8fa', mr: 2 }}>
//                     Get Started
//                   </Button>
//                   <Button variant="outlined" sx={{ borderColor: '#031738', color: '#031738' }}>
//                     Learn More
//                   </Button>
//                 </Box>
//               </motion.div>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <motion.div variants={fadeInUp} initial="hidden" animate="visible">
//                 <img
//                   src="https://via.placeholder.com/600x400"
//                   alt="CRM Dashboard"
//                   style={{ borderRadius: '12px', width: '100%' }}
//                 />
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Feature Section */}
//       <FeatureSection>
//         <FeatureContainer>
//           <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, color: '#031738', mb: 4 }}>
//             Key Features
//           </Typography>
//           {features.map((feature, index) => (
//             <FeatureItem
//               key={feature.id}
//               container
//               direction={index % 2 === 0 ? 'row' : 'row-reverse'}
//             >
//               <Grid item xs={12} md={6}>
//                 <FeatureText>
//                   <Typography variant="h5" sx={{ fontWeight: 700, color: '#031738', mb: 2 }}>
//                     {feature.title}
//                   </Typography>
//                   <Typography variant="body1" sx={{ color: '#6c757d' }}>
//                     {feature.description}
//                   </Typography>
//                 </FeatureText>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FeatureImage>
//                   <motion.div variants={fadeInUp} initial="hidden" animate="visible">
//                     <img src={feature.image} alt={feature.title} />
//                   </motion.div>
//                 </FeatureImage>
//               </Grid>
//             </FeatureItem>
//           ))}
//         </FeatureContainer>
//       </FeatureSection>

//       {/* Contribution Section */}
//       <ContributionSection>
//         <Container>
//           <Typography variant="h4" sx={{ fontWeight: 700, color: '#031738', mb: 4 }}>
//             How to Contribute
//           </Typography>
//           <Typography variant="h6" sx={{ color: '#6c757d', mb: 4 }}>
//             StarOneCRM is an open-source project. Join us on GitHub to contribute and improve the platform.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: '#031738', color: '#f6f8fa' }}
//             startIcon={<GitHub />}
//             href="https://github.com/DOodle25/Internship"
//             target="_blank"
//           >
//             Contribute on GitHub
//           </Button>
//         </Container>
//       </ContributionSection>

//       {/* Footer */}
//       <Footer>
//         <Typography variant="h6">Developed by Dipen Patel</Typography>
//         <Box mt={2}>
//           <IconButton href="https://github.com/DOodle25" target="_blank" sx={{ color: '#f6f8fa' }}>
//             <GitHub />
//           </IconButton>
//           <IconButton href="https://linkedin.com/in/dipen-patel" target="_blank" sx={{ color: '#f6f8fa' }}>
//             <LinkedIn />
//           </IconButton>
//           <IconButton href="mailto:cocply135@gmail.com" sx={{ color: '#f6f8fa' }}>
//             <Email />
//           </IconButton>
//         </Box>
//       </Footer>
//     </Box>
//   );
// };

// export default LandingPage;