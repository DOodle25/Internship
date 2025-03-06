import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import {
    Button,
    Grid,
    TextField,
    Snackbar,
    Typography,
    Paper,
    Box,
} from "@mui/material";
import { useGlobalContext } from "../../context/GlobalContext";

const CreateTask = () => {
    const { handleCreateTask, fetchTasks, user } = useGlobalContext();
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        customerId: user._id,
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleCreate = async () => {
        const result = await handleCreateTask(newTask);
        handleSnackbarOpen(result.message);
        if (result.success) {
            setNewTask({ title: "", description: "", userId: user?._id || "" });
        }
    };

    return (
        <Box sx={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold", color: "#031738" }}>
                    Create a New Task
                </Typography>
                <TextField
                    label="Title"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <TextField
                    label="Description"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleCreate}
                    sx={{ marginTop: 2, width: "100%" }}
                >
                    Create Task
                </Button>
            </Paper>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default CreateTask;