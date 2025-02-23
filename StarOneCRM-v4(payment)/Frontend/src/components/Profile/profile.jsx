import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const Profile = () => {
  const { setUserMethod, logout } = useGlobalContext();
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    role: "",
  });
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

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      style={{
        padding: "30px",
        margin: "20px auto",
        // maxWidth: "500px",
        maxWidth: "500px",
        textAlign: "center",
      }}
    >
      <Card sx={{}}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {isEditing ? "Edit Profile" : "Profile Details"}
          </Typography>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            margin="normal"
          />
          <TextField
            label="Role"
            name="Role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
            margin="normal"
          />

          {!isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                variant="contained"
                color="primary"
                fullWidth
              >
                Edit Profile
              </Button>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 10 }}
              >
                Delete Profile
              </Button>
              <Button
                onClick={logout}
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 10 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                fullWidth
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outlined"
                color="secondary"
                fullWidth
                style={{ marginTop: 10 }}
              >
                Cancel
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
