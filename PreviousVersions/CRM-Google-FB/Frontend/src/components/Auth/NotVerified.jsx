import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotVerified = ({ logout }) => {
    const navigate = useNavigate();

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Box textAlign="center" style={{ maxWidth: '500px' }}>
                <Typography variant="h4" color="error">
                    Your form has not been verified yet!
                </Typography>
                <Typography variant="body1" mt={2}>
                    Please wait for admin verification. If you have any questions, contact support.
                </Typography>

                {/* Logout button */}
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={logout}
                        style={{ marginTop: 10 }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default NotVerified;
