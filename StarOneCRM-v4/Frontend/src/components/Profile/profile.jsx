// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Card,
//   CardContent,
// } from "@mui/material";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../../context/GlobalContext";

// const Profile = () => {
//   const { setUserMethod, logout } = useGlobalContext();
//   const [profile, setProfile] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     role: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axiosInstance.get("/profile");
//         setProfile(response.data.data);
//         setFormData({
//           name: response.data.data.name,
//           age: response.data.data.age,
//           email: response.data.data.email,
//           role: response.data.data.role,
//         });
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setUserMethod(null);
//         logout();
//         navigate("/login");
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axiosInstance.patch("/profile", formData);
//       setProfile(response.data.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete("/profile");
//       logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Error deleting profile:", error);
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
//       style={{
//         padding: "30px",
//         margin: "20px auto",
//         // maxWidth: "500px",
//         maxWidth: "500px",
//         textAlign: "center",
//       }}
//     >
//       <Card sx={{}}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom>
//             {isEditing ? "Edit Profile" : "Profile Details"}
//           </Typography>

//           <TextField
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             fullWidth
//             disabled={!isEditing}
//             margin="normal"
//           />
//           <TextField
//             label="Age"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             fullWidth
//             disabled={!isEditing}
//             margin="normal"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             disabled={!isEditing}
//             margin="normal"
//           />
//           <TextField
//             label="Role"
//             name="Role"
//             value={formData.role}
//             onChange={handleChange}
//             fullWidth
//             disabled={!isEditing}
//             margin="normal"
//           />

//           {!isEditing ? (
//             <>
//               <Button
//                 onClick={() => setIsEditing(true)}
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//               >
//                 Edit Profile
//               </Button>
//               <Button
//                 onClick={handleDelete}
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 style={{ marginTop: 10 }}
//               >
//                 Delete Profile
//               </Button>
//               <Button
//                 onClick={logout}
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 style={{ marginTop: 10 }}
//               >
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button
//                 onClick={handleSave}
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//               >
//                 Save Changes
//               </Button>
//               <Button
//                 onClick={() => setIsEditing(false)}
//                 variant="outlined"
//                 color="secondary"
//                 fullWidth
//                 style={{ marginTop: 10 }}
//               >
//                 Cancel
//               </Button>
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default Profile;








// import React, { useState, useEffect } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   IconButton,
//   TextField,
//   Typography,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import LogoutIcon from "@mui/icons-material/Logout";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../../context/GlobalContext";

// const Profile = () => {
//   const { setUserMethod, logout } = useGlobalContext();
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ name: "", age: "", email: "", role: "" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axiosInstance.get("/profile");
//         setProfile(response.data.data);
//         setFormData({
//           name: response.data.data.name,
//           age: response.data.data.age,
//           email: response.data.data.email,
//           role: response.data.data.role,
//         });
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setUserMethod(null);
//         logout();
//         navigate("/login");
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axiosInstance.patch("/profile", formData);
//       setProfile(response.data.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete("/profile");
//       logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Error deleting profile:", error);
//     }
//   };

//   if (!profile) return null;

//   return (
//     <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//       <Card sx={{ width: "100%", backgroundColor: "transparent", color: "white", p: 3, borderRadius: 3 }}>
//         <CardContent sx={{ textAlign: "center" }}>
//           <Avatar sx={{ bgcolor: "#201F2F", width: 80, height: 80, mx: "auto", fontSize: 32 }}>
//             {profile.name.charAt(0)}
//           </Avatar>
//           <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold", color: "#201F2F" }}>{profile.name}</Typography>
//           <Typography variant="body1" sx={{ color: "#201F2F" }}>{profile.role.toUpperCase()}</Typography>

//           <Box sx={{ mt: 3 }}>
//             <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth disabled={!isEditing} margin="normal" InputProps={{ sx: { color: "white" } }} sx={{ "& .MuiInputLabel-root": { color: "#FDB8DC" } }} />
//             <TextField label="Age" name="age" value={formData.age} onChange={handleChange} fullWidth disabled={!isEditing} margin="normal" InputProps={{ sx: { color: "white" } }} sx={{ "& .MuiInputLabel-root": { color: "#FDB8DC" } }} />
//             <TextField label="Email" name="email" value={formData.email} fullWidth disabled margin="normal" InputProps={{ sx: { color: "white" } }} sx={{ "& .MuiInputLabel-root": { color: "#FDB8DC" } }} />
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
//             {!isEditing ? (
//               <>
//                 <IconButton onClick={() => setIsEditing(true)} sx={{ color: "#201F2F" }}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={handleDelete} sx={{ color: "red" }}>
//                   <DeleteIcon />
//                 </IconButton>
//                 <IconButton onClick={logout} sx={{ color: "#201F2F" }}>
//                   <LogoutIcon />
//                 </IconButton>
//               </>
//             ) : (
//               <>
//                 <Button onClick={handleSave} variant="contained" sx={{ bgcolor: "#FDB8DC", color: "black" }}>
//                   Save
//                 </Button>
//                 <Button onClick={() => setIsEditing(false)} variant="outlined" sx={{ color: "#FDB8DC", borderColor: "#FDB8DC" }}>
//                   Cancel
//                 </Button>
//               </>
//             )}
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default Profile;










// import React, { useState, useEffect } from "react";
// import {
//   Avatar,
//   Button,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Grid,
//   Chip,
//   Divider,
// } from "@mui/material";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../../context/GlobalContext";

// const Profile = () => {
//   const { logout } = useGlobalContext();
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axiosInstance.get("/profile");
//         setProfile(response.data.data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         logout();
//         navigate("/login");
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (!profile) return <Typography>Loading...</Typography>;

//   return (
//     <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
//       <Card sx={{ width: "100%", maxWidth: 600, background: "#201F2F", color: "#FDB8DC", p: 3, borderRadius: 3, boxShadow: 5 }}>
//         <CardContent>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
//               <Avatar sx={{ width: 80, height: 80, fontSize: 30, bgcolor: "#FDB8DC", color: "#201F2F", fontWeight: "bold" }}>
//                 {profile.name[0].toUpperCase()}
//               </Avatar>
//             </Grid>
//             <Grid item xs={9}>
//               <Typography variant="h5" fontWeight="bold">{profile.name}</Typography>
//               <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>{profile.email}</Typography>
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: 2, bgcolor: "#FDB8DC" }} />
//           <Typography variant="body1"><strong>Age:</strong> {profile.age}</Typography>
//           <Typography variant="body1"><strong>Role:</strong> {profile.role}</Typography>
//           <Typography variant="body1"><strong>Login Method:</strong> {profile.loginMethod}</Typography>
//           <Typography variant="body1"><strong>Form Status:</strong> {profile.isFormFilled ? "Filled" : "Not Filled"} / {profile.isFormVerified ? "Verified" : "Not Verified"}</Typography>
//           <Typography variant="body1"><strong>Admin:</strong> {profile.isAdmin ? "Yes" : "No"}</Typography>
//           <Typography variant="body1"><strong>Tasks Assigned:</strong></Typography>
//           <Grid container spacing={1} sx={{ mt: 1 }}>
//             {profile.tasksAssigned.length > 0 ? (
//               profile.tasksAssigned.map((task, index) => (
//                 <Grid item key={index}>
//                   <Chip label={`Task ${index + 1}`} sx={{ bgcolor: "#FDB8DC", color: "#201F2F" }} />
//                 </Grid>
//               ))
//             ) : (
//               <Typography variant="body2">No tasks assigned</Typography>
//             )}
//           </Grid>
//           <Divider sx={{ my: 2, bgcolor: "#FDB8DC" }} />
//           <Button onClick={logout} variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#FDB8DC", color: "#201F2F", fontWeight: "bold" }}>
//             Logout
//           </Button>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default Profile;












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
        // minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          my: 5,
          width: "100%",
          p: 3,
          backgroundColor: "",
          color: "white",
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: "#201F2F", fontSize: 40 }}
            >
              {profile.name[0]}
            </Avatar>
            <div>
            <Typography variant="h4" fontWeight="bold" color="#201F2F">
              {profile.name}
            </Typography>
            <Typography variant="h6" fontWeight="" color="#201F2F">
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

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
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
                <Button onClick={() => setIsEditing(true)} variant="outlined" sx={{m:1}}>
                  Edit Profile
                </Button>
                <Button onClick={handleDelete} variant="outlined" sx={{m:1}}>
                  Delete Profile
                </Button>
                <Button onClick={logout} variant="outlined" sx={{m:1}}>
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