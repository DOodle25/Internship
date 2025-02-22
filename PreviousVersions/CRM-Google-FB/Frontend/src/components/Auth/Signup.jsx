








// import React, { useState, useEffect } from 'react';
// import { Button, TextField, Paper, Box, Typography, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import LockIcon from '@mui/icons-material/Lock';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { useGlobalContext } from '../../context/GlobalContext';
// import GoogleLogin from './GoogleLogin'; // Import Google Login Component

// function Signup() {
//     const [formData, setFormData] = useState({ name: '', email: '', age: '', role: '', password: '', otp: '' });
//     const [otpSent, setOtpSent] = useState(false);
//     const [timer, setTimer] = useState(0);
//     const [isSendingOtp, setIsSendingOtp] = useState(false);
//     const { handleSignup } = useGlobalContext();
//     const navigate = useNavigate();

//     useEffect(() => {
//         let interval;
//         if (timer > 0) {
//             interval = setInterval(() => {
//                 setTimer((prevTimer) => prevTimer - 1);
//             }, 1000);
//         } else if (timer === 0 && otpSent) {
//             setOtpSent(false);
//             setIsSendingOtp(false);
//         }
//         return () => clearInterval(interval);
//     }, [timer, otpSent]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const result = await handleSignup(formData, true);
//             if (result.success) {
//                 toast.success('Signup successful');
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 3000);
//             } else {
//                 toast.error(result.message);
//             }
//         } catch (error) {
//             toast.error('Signup failed. Please try again.');
//         }
//     };

//     return (
//         <Paper elevation={3} style={{ padding: '30px', margin: '20px auto', maxWidth: '500px', textAlign: 'center' }}>
//             <ToastContainer />
//             <Typography variant="h4" gutterBottom>Signup</Typography>
//             <form onSubmit={handleSubmit}>
//                 <Box mb={2}>
//                     <TextField fullWidth variant="outlined" label="Name" name="name" value={formData.name} onChange={handleChange} required={!otpSent} disabled={otpSent} />
//                 </Box>
//                 <Box mb={2}>
//                     <TextField fullWidth variant="outlined" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={otpSent} InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>), }} />
//                 </Box>
//                 <Box mb={2}>
//                     <TextField fullWidth variant="outlined" label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required={!otpSent} disabled={otpSent} />
//                 </Box>
//                 <Box mb={2}>
//                     <FormControl fullWidth variant="outlined" required={!otpSent} disabled={otpSent}>
//                         <InputLabel>Role</InputLabel>
//                         <Select label="Role" name="role" value={formData.role} onChange={handleChange}>
//                             <MenuItem value="customer">Customer</MenuItem>
//                             <MenuItem value="employee">Employee</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Box>
//                 <Box mb={2}>
//                     <TextField fullWidth variant="outlined" label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required={!otpSent} disabled={otpSent} InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>), }} />
//                 </Box>
//                 {otpSent && (
//                     <Box mb={2}>
//                         <TextField fullWidth variant="outlined" label="OTP" name="otp" value={formData.otp} onChange={handleChange} required />
//                     </Box>
//                 )}
//                 {otpSent && (
//                     <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit OTP</Button>
//                 )}
//                 <GoogleLogin />
//                 <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/login')} style={{ marginTop: '20px' }}>
//                     Go to Login
//                 </Button>
//             </form>
//         </Paper>
//     );
// }

// export default Signup;



// import React, { useState, useEffect } from 'react';
// import { Button, TextField, Paper, Box, Typography, InputAdornment, Select, MenuItem, FormControl, InputLabel, Link } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import LockIcon from '@mui/icons-material/Lock';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { useGlobalContext } from '../../context/GlobalContext';
// import GoogleLogin from './GoogleLogin'; // Import Google Login Component

// function Signup() {
//     const [formData, setFormData] = useState({ name: '', email: '', age: '', role: '', password: '', otp: '' });
//     const [otpSent, setOtpSent] = useState(false);
//     const [timer, setTimer] = useState(0);
//     const [isSendingOtp, setIsSendingOtp] = useState(false); // Tracks API call for sending OTP
//     const { handleSignup } = useGlobalContext();
//     const navigate = useNavigate();

//     useEffect(() => {
//         let interval;
//         if (timer > 0) {
//             interval = setInterval(() => {
//                 setTimer((prevTimer) => prevTimer - 1);
//             }, 1000);
//         } else if (timer === 0 && otpSent) {
//             setOtpSent(false);
//             setIsSendingOtp(false); // Allow sending OTP again
//         }
//         return () => clearInterval(interval);
//     }, [timer, otpSent]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const isFormValid = () => {
//         const { name, email, age, role, password } = formData;
//         return name && email && age && role && password;
//     };

//     const handleOtpRequest = async () => {
//         if (!isFormValid()) {
//             toast.error('Please fill out all required fields before requesting OTP.');
//             return;
//         }

//         setIsSendingOtp(true); // Hide the Send OTP button
//         try {
//             const result = await handleSignup(formData); // Call the handleSignup function
//             if (result.success) {
//                 setOtpSent(true);
//                 setTimer(100); // Start the 100 seconds timer
//                 toast.info('OTP sent to your email');
//             } else {
//                 setIsSendingOtp(false); // Re-show the button on failure
//                 toast.error(result.message); // Show error message from the response
//             }
//         } catch (error) {
//             setIsSendingOtp(false); // Re-show the button on failure
//             toast.error('Failed to send OTP. Please try again.');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const result = await handleSignup(formData, true);
//             if (result.success) {
//                 toast.success('Signup successful');
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 7000); 
//             } else {
//                 toast.error(result.message); 
//             }
//         } catch (error) {
//             toast.error('Signup failed. Please try again.');
//         }
//     };

//     return (
//         <Paper elevation={2} style={{ padding: '30px', margin: '20px auto', maxWidth: '350px', textAlign: 'center' }}>
//             <ToastContainer />
//             <Typography variant="h4" gutterBottom>Signup</Typography>
//             <form onSubmit={handleSubmit}>
//                 <Box mb={2}>
//                     <TextField
//                         fullWidth
//                         variant="outlined"
//                         label="Name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required={!otpSent}
//                         disabled={otpSent}
//                     />
//                 </Box>
//                 <Box mb={2}>
//                     <TextField
//                         fullWidth
//                         variant="outlined"
//                         label="Email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         disabled={otpSent}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <PersonIcon />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//                 <Box mb={2}>
//                     <TextField
//                         fullWidth
//                         variant="outlined"
//                         label="Age"
//                         name="age"
//                         type="number"
//                         value={formData.age}
//                         onChange={handleChange}
//                         required={!otpSent}
//                         disabled={otpSent}
//                     />
//                 </Box>
//                 <Box mb={2}>
//                     <FormControl fullWidth variant="outlined" required={!otpSent} disabled={otpSent}>
//                         <InputLabel>Role</InputLabel>
//                         <Select
//                             label="Role"
//                             name="role"
//                             value={formData.role}
//                             onChange={handleChange}
//                         >
//                             <MenuItem value="customer">Customer</MenuItem>
//                             <MenuItem value="employee">Employee</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Box>
//                 <Box mb={2}>
//                     <TextField
//                         fullWidth
//                         variant="outlined"
//                         label="Password"
//                         name="password"
//                         type="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required={!otpSent}
//                         disabled={otpSent}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <LockIcon />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//                 {otpSent ? (
//                     <Box mb={2}>
//                         <TextField
//                             fullWidth
//                             variant="outlined"
//                             label="OTP"
//                             name="otp"
//                             value={formData.otp}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Box>
//                 ) : null}
//                 {!otpSent && (
//                     <Button
//                         variant="outlined"
//                         color="primary"
//                         fullWidth
//                         onClick={handleOtpRequest}
//                         disabled={isSendingOtp || !isFormValid()}
//                     >
//                         {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
//                     </Button>
//                 )}
//                 {otpSent && (
//                     <Button
//                         variant="outlined"
//                         color="primary"
//                         fullWidth
//                         onClick={handleSubmit}
//                     >
//                         Submit OTP
//                     </Button>
//                 )}
//                 {timer > 0 && (
//                     <Typography variant="body2" color="textSecondary" mt={2}>
//                         You can resend OTP in {timer}s
//                     </Typography>
//                 )}
//                 <GoogleLogin style={{ marginTop: '20px !important' }} />  
//                 {/* <Button
//                     // mt={2}
//                     // variant="contained"
//                     // color="primary"
//                     fullWidth
//                     onClick={() => navigate('/login')}
//                     style={{ marginTop: '0px' }}
//                 >
//                     Go to Login
//                 </Button> */}
//                 <Typography 
//                     variant="body2" 
//                     style={{ textAlign: 'center', marginTop: '10px' }}
//                     >
//                     Already registered? 
//                     <Link 
//                         onClick={() => navigate('/login')} 
//                         style={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'none' }}
//                     >
//                         {" Go to Login"}
//                     </Link>
//                 </Typography>

                
//             </form>
//         </Paper>
//     );
// }

// export default Signup;















import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Paper,
    Box,
    Typography,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Link,
    Container
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import GoogleLogin from './GoogleLogin'; // Import Google Login Component

function Signup() {
        const [formData, setFormData] = useState({ name: '', email: '', age: '', role: '', password: '', otp: '' });
        const [otpSent, setOtpSent] = useState(false);
        const [timer, setTimer] = useState(0);
        const [isSendingOtp, setIsSendingOtp] = useState(false); // Tracks API call for sending OTP
        const { handleSignup } = useGlobalContext();
        const navigate = useNavigate();

        useEffect(() => {
                let interval;
                if (timer > 0) {
                        interval = setInterval(() => {
                                setTimer((prevTimer) => prevTimer - 1);
                        }, 1000);
                } else if (timer === 0 && otpSent) {
                        setOtpSent(false);
                        setIsSendingOtp(false); // Allow sending OTP again
                }
                return () => clearInterval(interval);
        }, [timer, otpSent]);

        const handleChange = (e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const isFormValid = () => {
                const { name, email, age, role, password } = formData;
                return name && email && age && role && password;
        };

        const handleOtpRequest = async () => {
                if (!isFormValid()) {
                        toast.error('Please fill out all required fields before requesting OTP.');
                        return;
                }

                setIsSendingOtp(true); // Hide the Send OTP button
                try {
                        const result = await handleSignup(formData); // Call the handleSignup function
                        if (result.success) {
                                setOtpSent(true);
                                setTimer(100); // Start the 100 seconds timer
                                toast.info('OTP sent to your email');
                        } else {
                                setIsSendingOtp(false); // Re-show the button on failure
                                toast.error(result.message); // Show error message from the response
                        }
                } catch (error) {
                        setIsSendingOtp(false); // Re-show the button on failure
                        toast.error('Failed to send OTP. Please try again.');
                }
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                        const result = await handleSignup(formData, true);
                        if (result.success) {
                                toast.success('Signup successful');
                                setTimeout(() => {
                                        navigate('/login');
                                }, 7000); 
                        } else {
                                toast.error(result.message); 
                        }
                } catch (error) {
                        toast.error('Signup failed. Please try again.');
                }
        };

        return (
                <Container 
                        maxWidth="md" 
                        sx={{ 
                                display: "flex", 
                                justifyContent: "center", 
                                alignItems: "center", 
                                minHeight: "100vh", 
                                backgroundColor: "#FFFFFF",
                                minWidth: "100%", 
                        }}
                >
                        <Paper
                                elevation={4}
                                sx={{
                                        display: "flex",
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        minHeight: "90vh",
                                }}
                        >
                                {/* Left Branding Section */}
                                <Box
                                        sx={{
                                                display: { xs: "none", sm: "flex" },
                                                flex: 1,
                                                backgroundColor: "#201F2F",
                                                color: "white",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: 4,
                                        }}
                                >
                                        <Typography variant="h3" fontWeight="bold" gutterBottom textAlign={"center"}
                                                sx={{
                                                        fontWeight: 600,
                                                        color:"#FFFFFF"
                                                }}
                                        >
                                                Star<span style={{color:"#FDB8DC", fontStyle:"italic", textShadow:"2px 3px 0px #FFFFFF" }}>One</span> <span style={{background:"#FDB8DC",color:"#201F2F", borderRadius:"50px", paddingRight:"19px", paddingLeft:"15px" }}>CRM</span>
                                        </Typography>
                                        <Typography variant="h6" textAlign="center"
                                                sx={{
                                                        fontWeight: 600,
                                                }}
                                        >
                                                {"Unlock endless possibilities to connect to you customers."}
                                        </Typography>
                                        <Typography  variant="h6" textAlign="center" marginTop={"20px"}
                                                sx={{
                                                        fontWeight: 600,
                                                }}
                                        >
                                                <span style={{borderRadius:"10px",color:"#201F2F", fontStyle:"", backgroundColor:"#FDB8DC", paddingRight:"10px", padding:"10px", marginTop:"20px" }}>Join us <span style={{color:"#201F2F", fontStyle:"italic", textDecoration:"underline" }}>today!</span></span>
                                        </Typography>
                                </Box>

                                {/* Right Signup Section */}
                                <Box
                                        sx={{
                                                flex: 1,
                                                padding: { xs: 4, md: 6 },
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                        }}
                                >
                                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                                                Signup
                                        </Typography>
                                        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 400 }}>
                                                <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        label="Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required={!otpSent}
                                                        disabled={otpSent}
                                                        margin="normal"
                                                />
                                                <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        label="Email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        disabled={otpSent}
                                                        margin="normal"
                                                        InputProps={{
                                                                startAdornment: (
                                                                        <InputAdornment position="start">
                                                                                <PersonIcon />
                                                                        </InputAdornment>
                                                                ),
                                                        }}
                                                />
                                                <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        label="Age"
                                                        name="age"
                                                        type="number"
                                                        value={formData.age}
                                                        onChange={handleChange}
                                                        required={!otpSent}
                                                        disabled={otpSent}
                                                        margin="normal"
                                                />
                                                <FormControl fullWidth variant="outlined" required={!otpSent} disabled={otpSent} margin="normal">
                                                        <InputLabel>Role</InputLabel>
                                                        <Select
                                                                label="Role"
                                                                name="role"
                                                                value={formData.role}
                                                                onChange={handleChange}
                                                        >
                                                                <MenuItem value="customer">Customer</MenuItem>
                                                                <MenuItem value="employee">Employee</MenuItem>
                                                        </Select>
                                                </FormControl>
                                                <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        label="Password"
                                                        name="password"
                                                        type="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required={!otpSent}
                                                        disabled={otpSent}
                                                        margin="normal"
                                                        InputProps={{
                                                                startAdornment: (
                                                                        <InputAdornment position="start">
                                                                                <LockIcon />
                                                                        </InputAdornment>
                                                                ),
                                                        }}
                                                />
                                                {otpSent && (
                                                        <TextField
                                                                fullWidth
                                                                variant="outlined"
                                                                label="OTP"
                                                                name="otp"
                                                                value={formData.otp}
                                                                onChange={handleChange}
                                                                required
                                                                margin="normal"
                                                        />
                                                )}
                                                {!otpSent && (
                                                        <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                fullWidth
                                                                onClick={handleOtpRequest}
                                                                disabled={isSendingOtp || !isFormValid()}
                                                                sx={{ mt: 2 }}
                                                        >
                                                                {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
                                                        </Button>
                                                )}
                                                {otpSent && (
                                                        <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                fullWidth
                                                                onClick={handleSubmit}
                                                                sx={{ mt: 2 }}
                                                        >
                                                                Submit OTP
                                                        </Button>
                                                )}
                                                {timer > 0 && (
                                                        <Typography variant="body2" color="textSecondary" mt={2}>
                                                                You can resend OTP in {timer}s
                                                        </Typography>
                                                )}
                                                <GoogleLogin style={{ marginTop: '20px !important' }} />  
                                                <Typography 
                                                        variant="body2" 
                                                        sx={{ textAlign: 'center', marginTop: '10px' }}
                                                >
                                                        Already registered? 
                                                        <Link 
                                                                onClick={() => navigate('/login')} 
                                                                sx={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'none' }}
                                                        >
                                                                {" Go to Login"}
                                                        </Link>
                                                </Typography>
                                        </Box>
                                </Box>
                        </Paper>
                </Container>
        );
}

export default Signup;
