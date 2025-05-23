import React, { useState, useEffect } from "react";
import {
  Avatar,
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
} from "@mui/material";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const Profile = () => {
  const { setUserMethod, logout } = useGlobalContext();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        setProfile(response.data.data);
        setFormData({
          name: response.data.data.name,
          age: response.data.data.age,
          email: response.data.data.email,
          role: response.data.data.role,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUserMethod(null);
        logout();
        navigate("/login");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.patch("/profile", formData);
      setProfile(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete("/profile");
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          p: 3,
          backgroundColor: "",
          color: "white",
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems="center" gap={2}>
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: "#201F2F", fontSize: 40 }}
            >
              {profile.name[0]}
            </Avatar>
            <div>
              <Typography variant="h4" fontWeight="bold" color="#201F2F" textAlign={{ xs: "center", sm: "left" }}>
                {profile.name}
              </Typography>
              <Typography variant="h6" color="#201F2F" textAlign={{ xs: "center", sm: "left" }}>
                {profile.email}
              </Typography>
            </div>
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 2, color: "#201F2F" }}>
            Role: <strong>{profile.role}</strong>
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 1, mb: 1, color: "#201F2F" }}>
            Assigned Tasks
          </Typography>
          {profile.tasksAssigned.length > 0 ? (
            profile.tasksAssigned.map((task) => (
              <Chip key={task} label={task} sx={{ mr: 1, mb: 1, bgcolor: "", color: "black" }} />
            ))
          ) : (
            <Typography>No tasks assigned</Typography>
          )}

          <Box sx={{ mt: 3, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            {isEditing ? (
              <>
                <Button onClick={handleSave} variant="contained">
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outlined">
                  Cancel
                </Button>
              </>
            ) : (
              <div>
                <Button onClick={() => setIsEditing(true)} variant="outlined" sx={{ m: 1 }}>
                  Edit Profile
                </Button>
                <Button onClick={handleDelete} variant="outlined" sx={{ m: 1 }}>
                  Delete Profile
                </Button>
                <Button onClick={logout} variant="outlined" sx={{ m: 1 }}>
                  Logout
                </Button>
              </div>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;