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
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const colors = [
    "#8B0000",
    "#8B4513",
    "#2F4F4F",
    "#556B2F",
    "#8B008B",
    "#483D8B",
    "#2E8B57",
    "#4B0082",
    "#191970",
    "#00008B",
    "#8B0000",
    "#8B4513",
    "#2F4F4F",
    "#556B2F",
    "#8B008B",
    "#483D8B",
    "#2E8B57",
    "#4B0082",
    "#191970",
    "#00008B",
    "#8B0000",
    "#8B4513",
    "#2F4F4F",
    "#556B2F",
    "#8B008B",
    "#483D8B",
  ];
  const getColorForLetter = (letter) => {
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/profile");
      setProfile(response.data.data);
      setFormData({
        name: response.data.data.name,
        age: response.data.data.age,
        email: response.data.data.email,
        role: response.data.data.role,
        profileImage: response.data.data.profileImage || null,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUserMethod(null);
      logout();
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSave = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("role", formData.role);
    if (selectedFile) {
      formDataToSend.append("profileImage", selectedFile);
    }

    try {
      await axiosInstance.patch("/profile", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEditing(false);
      fetchProfile();
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
        border: "none",
        boxShadow: 0,
        mt: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          backgroundColor: "#F6F8FA",
          color: "black",
          border: "none",
          boxShadow: 0,
        }}
      >
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid
              item
              xs={12}
              sm={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {profile.profileImage ? (
                <Avatar
                  sx={{
                    width: 200,
                    height: 200,
                    bgcolor: "#201F2F",
                    fontSize: 40,
                  }}
                  src={profile.profileImage}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 200,
                    height: 200,
                    bgcolor: getColorForLetter(profile.name[0]),
                    fontSize: 100,
                  }}
                >
                  {profile.name[0]}
                </Avatar>
              )}
              {isEditing && (
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                  Upload Photo
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="#201F2F"
                overflow={"break-word"}
              >
                {profile.name}
              </Typography>
              <Typography variant="h6" color="#201F2F" overflow={"hidden"}>
                {profile.email}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, color: "#201F2F" }}>
                Role: <strong>{profile.role}</strong>
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
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
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#201F2F" }}>
            Assigned Tasks
          </Typography>
          {profile.tasksAssigned.length > 0 ? (
            profile.tasksAssigned.map((task) => (
              <Chip
                key={task.title}
                label={task.title}
                sx={{
                  mr: 1,
                  mb: 1,
                  color: "black",
                  backgroundColor: "#FFFFFF",
                }}
              />
            ))
          ) : (
            <Typography>No tasks assigned</Typography>
          )}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
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
              <>
                <Button onClick={() => setIsEditing(true)} variant="outlined">
                  Edit Profile
                </Button>
                <Button onClick={handleDelete} variant="outlined">
                  Delete Profile
                </Button>
                <Button onClick={logout} variant="outlined">
                  Logout
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
