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
  Divider,
} from "@mui/material";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";

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
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: 4,
        mb: 4,
      }}
    >
      <Card
        sx={{
          width: "100%",
          backgroundColor: "#F6F8FA",
          color: "black",
          border: "none",
          boxShadow: 0,
          p: 3,
        }}
      >
        <CardContent>
          <Grid container spacing={4}>
            {/* Left Column (Profile Info) */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
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
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="#201F2F"
                  sx={{ mt: 2 }}
                >
                  {profile.name}
                </Typography>
                <Typography variant="subtitle1" color="#201F2F">
                  {profile.email}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, color: "#201F2F" }}>
                  Role: <strong>{profile.role}</strong>
                </Typography>
                {isEditing && (
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2 }}
                    startIcon={<EditIcon />}
                  >
                    Upload Photo
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                )}
              </Box>
            </Grid>

            {/* Right Column (Details and Actions) */}
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, color: "#201F2F" }}>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
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
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, color: "#201F2F" }}>
                  Assigned Tasks
                </Typography>
                {profile.tasksAssigned.length > 0 ? (
                  profile.tasksAssigned.map((task) => (
                    <Chip
                      key={task.title}
                      label={task.title}
                      sx={{
                        borderRadius: 1,
                        boxShadow: 1,  
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
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      variant="contained"
                      startIcon={<SaveIcon />}
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      sx={{
                        borderRadius: 1,
                        boxShadow: 1,
                        ":hover": {
                          backgroundColor: "#201F2F",
                          color: "#F6F8FA",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outlined"
                      startIcon={<EditIcon />}
                      sx={{
                        borderRadius: 1,
                        boxShadow: 1,
                        ":hover": {
                          backgroundColor: "#201F2F",
                          color: "#F6F8FA",
                        },
                      }}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      onClick={handleDelete}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      sx={{
                        borderRadius: 1,
                        boxShadow: 1,
                        ":hover": {
                          backgroundColor: "#201F2F",
                          color: "#F6F8FA",
                        },
                      }}
                    >
                      Delete Profile
                    </Button>
                    <Button
                      onClick={logout}
                      variant="outlined"
                      startIcon={<LogoutIcon />}
                      sx={{
                        borderRadius: 1,
                        boxShadow: 1,
                        ":hover": {
                          backgroundColor: "#201F2F",
                          color: "#F6F8FA",
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;