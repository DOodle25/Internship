// import React, { useState, useEffect } from "react";
// import {
//   Avatar,
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Grid,
//   Box,
//   Divider,
// } from "@mui/material";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../../context/GlobalContext";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";
// import DeleteIcon from "@mui/icons-material/Delete";
// import LogoutIcon from "@mui/icons-material/Logout";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import WorkIcon from "@mui/icons-material/Work";
// import CakeIcon from "@mui/icons-material/Cake";
// import TaskIcon from "@mui/icons-material/Task";

// const Profile = () => {
//   const { setUserMethod, logout } = useGlobalContext();
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [selectedFile, setSelectedFile] = useState(null);
//   const navigate = useNavigate();
//   const colors = [
//     "#8B0000",
//     "#8B4513",
//     "#2F4F4F",
//     "#556B2F",
//     "#8B008B",
//     "#483D8B",
//     "#2E8B57",
//     "#4B0082",
//     "#191970",
//     "#00008B",
//     "#8B0000",
//     "#8B4513",
//     "#2F4F4F",
//     "#556B2F",
//     "#8B008B",
//     "#483D8B",
//   ];
//   const getColorForLetter = (letter) => {
//     const index = letter.charCodeAt(0) % colors.length;
//     return colors[index];
//   };

//   const fetchProfile = async () => {
//     try {
//       const response = await axiosInstance.get("/profile");
//       setProfile(response.data.data);
//       setFormData({
//         name: response.data.data.name,
//         age: response.data.data.age,
//         email: response.data.data.email,
//         role: response.data.data.role,
//         profileImage: response.data.data.profileImage || null,
//       });
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       setUserMethod(null);
//       logout();
//       navigate("/login");
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSave = async () => {
//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("age", formData.age);
//     formDataToSend.append("email", formData.email);
//     formDataToSend.append("role", formData.role);
//     if (selectedFile) {
//       formDataToSend.append("profileImage", selectedFile);
//     }

//     try {
//       await axiosInstance.patch("/profile", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setIsEditing(false);
//       fetchProfile();
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

//   if (!profile) return <Typography>Loading...</Typography>;

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         mt: 4,
//         mb: 4,
//       }}
//     >
//       <Card
//         sx={{
//           width: "100%",
//           backgroundColor: "#F6F8FA",
//           color: "black",
//           border: "none",
//           boxShadow: 0,
//           p: 3,
//         }}
//       >
//         <CardContent>
//           <Grid container spacing={4}>
//             {/* Left Column (Profile Info) */}
//             <Grid
//               item
//               xs={12}
//               md={4}
//               sx={{
//                 borderRight: { md: "2px solid #E7E9EB" },
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   textAlign: "center",
//                 }}
//               >
//                 {profile.profileImage ? (
//                   <Avatar
//                     sx={{
//                       width: 200,
//                       height: 200,
//                       bgcolor: "#201F2F",
//                       fontSize: 40,
//                     }}
//                     src={profile.profileImage}
//                   />
//                 ) : (
//                   <Avatar
//                     sx={{
//                       width: 200,
//                       height: 200,
//                       bgcolor: getColorForLetter(profile.name[0]),
//                       fontSize: 100,
//                     }}
//                   >
//                     {profile.name[0]}
//                   </Avatar>
//                 )}
//                 <Typography
//                   variant="h5"
//                   color="black"
//                   fontWeight={500}
//                   sx={{ mt: 2 }}
//                 >
//                   {profile.name}
//                 </Typography>
//                 <Typography variant="subtitle1" color="#201F2F">
//                   {profile.email}
//                 </Typography>
//                 <Typography
//                   variant="subtitle1"
//                   // sx={{ mt: 1, color: "#201F2F" }}
//                   sx={{
//                     mt: 0,
//                     // color: "#201F2F"
//                   }}
//                 >
//                   {/* Role: <strong>{profile.role}</strong> */}
//                   <strong>{profile.role}</strong>
//                 </Typography>
//                 {isEditing && (
//                   <Button
//                     variant="contained"
//                     component="label"
//                     sx={{ mt: 2 }}
//                     startIcon={<EditIcon />}
//                   >
//                     Upload Photo
//                     <input type="file" hidden onChange={handleFileChange} />
//                   </Button>
//                 )}
//               </Box>
//             </Grid>

//             {/* Right Column (Details and Actions) */}
//             <Grid item xs={12} md={8}>
//               <Box sx={{ mb: 4 }}>
//                 <Typography variant="h6" sx={{ mb: 2, color: "#201F2F" }}>
//                   Personal Information
//                 </Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       fullWidth
//                       disabled={!isEditing}
//                       sx={{ bgcolor: "white", borderRadius: 1 }}
//                       InputProps={{
//                         startAdornment: (
//                           <PersonIcon sx={{ color: "action.active", mr: 1 }} />
//                         ),
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Age"
//                       name="age"
//                       value={formData.age}
//                       onChange={handleChange}
//                       fullWidth
//                       disabled={!isEditing}
//                       sx={{ bgcolor: "white", borderRadius: 1 }}
//                       InputProps={{
//                         startAdornment: (
//                           <CakeIcon sx={{ color: "action.active", mr: 1 }} />
//                         ),
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Role"
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       fullWidth
//                       disabled={!isEditing}
//                       sx={{ bgcolor: "white", borderRadius: 1 }}
//                       InputProps={{
//                         startAdornment: (
//                           <WorkIcon sx={{ color: "action.active", mr: 1 }} />
//                         ),
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       fullWidth
//                       disabled={!isEditing}
//                       sx={{ bgcolor: "white", borderRadius: 1 }}
//                       InputProps={{
//                         startAdornment: (
//                           <EmailIcon sx={{ color: "action.active", mr: 1 }} />
//                         ),
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//               </Box>
//               <Divider sx={{ my: 3 }} />
//               <Typography variant="h6" sx={{ mb: 2, color: "#201F2F" }}>
//                 Assigned Tasks
//               </Typography>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: 1,
//                   alignItems: "center",
//                 }}
//               >
//                 {profile.tasksAssigned.map((task) => (
//                   <Box
//                     key={task.title}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 0.5,
//                       borderRadius: 1,
//                       px: 1,
//                       py: 0.5,
//                       p: 1,
//                       borderRadius: 1,
//                     }}
//                   >
//                     <TaskIcon fontSize="small" />
//                     <Typography variant="body2">{task.title}</Typography>
//                   </Box>
//                 ))}
//               </Box>
//               <Divider sx={{ my: 3 }} />
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: { xs: "column", sm: "row" },
//                   gap: 2,
//                 }}
//               >
//                 {isEditing ? (
//                   <>
//                     <Button
//                       onClick={handleSave}
//                       variant="contained"
//                       startIcon={<SaveIcon />}
//                     >
//                       Save Changes
//                     </Button>
//                     <Button
//                       onClick={() => setIsEditing(false)}
//                       variant="outlined"
//                       startIcon={<CancelIcon />}
//                       sx={{
//                         borderRadius: 1,
//                         boxShadow: " 0px 0px 0px 1px #201F2F",
//                         ":hover": {
//                           backgroundColor: "#F6F8FA",
//                         },
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button
//                       onClick={() => setIsEditing(true)}
//                       variant="contained"
//                       component="label"
//                       startIcon={<EditIcon />}
//                     >
//                       Edit Profile
//                     </Button>
//                     <Button
//                       onClick={handleDelete}
//                       variant="contained"
//                       component="label"
//                       startIcon={<DeleteIcon />}
//                       disabled
//                     >
//                       Delete Profile
//                     </Button>
//                     <Button
//                       onClick={logout}
//                       variant="outlined"
//                       startIcon={<LogoutIcon />}
//                       sx={{
//                         borderRadius: 1,
//                         boxShadow: " 0px 0px 0px 1px #201F2F",
//                         border: "none",
//                         ":hover": {
//                           backgroundColor: "#F6F8FA",
//                         },
//                       }}
//                     >
//                       Logout
//                     </Button>
//                   </>
//                 )}
//               </Box>
//             </Grid>
//           </Grid>
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
  Box,
  Divider,
  Chip,
  Fade,
  Grow,
  Zoom,
  Slide,
  Paper,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import CakeIcon from "@mui/icons-material/Cake";
import TaskIcon from "@mui/icons-material/Task";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { styled } from "@mui/material/styles";

const ColorAvatar = styled(Avatar)(({ theme, lettercolor }) => ({
  width: 180,
  height: 180,
  fontSize: 72,
  backgroundColor: lettercolor,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[8],
  },
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: theme.shadows[0],
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    // transform: "translateY(-4px)",
    // boxShadow: theme.shadows[1],
  },
}));

const Profile = () => {
  const { setUserMethod, logout, user } = useGlobalContext();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
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
    const index = letter?.charCodeAt(0) % colors.length || 0;
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
      setPreviewImage(response.data.data.profileImage || null);
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
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  if (!profile) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography variant="h6">Loading profile...</Typography>
      </Container>
    );
  }

  return (
    <Fade in={true} timeout={500}>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // minHeight: "100vh",
        }}
      >
        <ProfileCard>
          <CardContent sx={{}}>
            <Grid container>
              {/* Left Column (Profile Info) */}
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  bgcolor: "primary.main",
                  p: 4,
                  // borderTopLeftRadius: 16,
                  borderTopLeftRadius: { xs: 16, md: 16 },
                  borderTopRightRadius: { xs: 16, md: 0 },
                  borderBottomRightRadius: { xs: 16, md: 0 },
                  borderBottomLeftRadius: { xs: 16, md: 16 },
                  // borderBottomLeftRadius: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "common.white",
                }}
              >
                <Slide direction="down" in={true} timeout={600}>
                  <Box sx={{ position: "relative", mb: 3 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        isEditing ? (
                          <Tooltip title="Change photo" arrow>
                            <IconButton
                              component="label"
                              sx={{
                                bgcolor: "white",
                                "&:hover": { bgcolor: "#EEEEEE" },
                              }}
                            >
                              <AddAPhotoIcon fontSize="small" />
                              <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                accept="image/*"
                              />
                            </IconButton>
                          </Tooltip>
                        ) : null
                      }
                    >
                      {previewImage ? (
                        <Avatar
                          src={previewImage}
                          sx={{
                            width: 180,
                            height: 180,
                            border: "4px solid",
                            borderColor: "common.white",
                          }}
                        />
                      ) : (
                        <ColorAvatar
                          lettercolor={getColorForLetter(profile.name?.[0])}
                        >
                          {profile.name?.[0]?.toUpperCase() || "U"}
                        </ColorAvatar>
                      )}
                    </Badge>
                  </Box>
                </Slide>

                <Grow in={true} timeout={800}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {profile.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ opacity: 0.8, mb: 1 }}
                    >
                      {profile.email}
                    </Typography>
                    <Chip
                      label={profile.role}
                      color={
                        profile.role === "admin"
                          ? "secondary"
                          : profile.role === "employee"
                          ? "primary"
                          : "default"
                      }
                      size="small"
                      sx={{ textTransform: "capitalize", fontWeight: 500 }}
                    />
                    {profile.isFormVerified && (
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Chip
                          icon={<VerifiedUserIcon />}
                          label="Verified"
                          color="success"
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    )}
                  </Box>
                </Grow>
              </Grid>

              {/* Right Column (Details and Actions) */}
              <Grid item xs={12} md={8}>
                <Box sx={{ p: 4 }}>
                  <Zoom in={true} style={{ transitionDelay: "300ms" }}>
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        gutterBottom
                        color="text.primary"
                      >
                        Personal Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Name"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                              startAdornment: (
                                <PersonIcon
                                  sx={{ color: "action.active", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Age"
                            name="age"
                            value={formData.age || ""}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                              startAdornment: (
                                <CakeIcon
                                  sx={{ color: "action.active", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Role"
                            name="role"
                            value={formData.role || ""}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                              startAdornment: (
                                <WorkIcon
                                  sx={{ color: "action.active", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                              startAdornment: (
                                <EmailIcon
                                  sx={{ color: "action.active", mr: 1 }}
                                />
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Zoom>

                  <Divider sx={{ my: 3 }} />

                  <Zoom in={true} style={{ transitionDelay: "400ms" }}>
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        gutterBottom
                        color="text.primary"
                      >
                        Assigned Tasks
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        {profile.tasksAssigned.length > 0 ? (
                          profile.tasksAssigned.map((task) => (
                            <Chip
                              key={task.title}
                              icon={<TaskIcon fontSize="small" />}
                              label={task.title}
                              size="small"
                              // variant="outlined"
                              sx={{
                                borderRadius: 1,
                                "& .MuiChip-icon": {
                                  color: "primary.main",
                                },
                                "& .MuiChip-label": {
                                  color: "text.primary",
                                },
                                bgcolor: "background.paper",
                              }}
                            />
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No tasks assigned
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Zoom>

                  <Divider sx={{ my: 3 }} />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    {isEditing ? (
                      <>
                        <Zoom
                          in={isEditing}
                          style={{ transitionDelay: "500ms" }}
                        >
                          <Button
                            onClick={handleSave}
                            variant="contained"
                            startIcon={<SaveIcon />}
                            sx={{
                              px: 4,
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 500,
                            }}
                          >
                            Save Changes
                          </Button>
                        </Zoom>
                        <Zoom
                          in={isEditing}
                          style={{ transitionDelay: "550ms" }}
                        >
                          <Button
                            onClick={() => {
                              setIsEditing(false);
                              setPreviewImage(profile.profileImage || null);
                            }}
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            sx={{
                              px: 4,
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 500,
                            }}
                          >
                            Cancel
                          </Button>
                        </Zoom>
                      </>
                    ) : (
                      <>
                        <Zoom
                          in={!isEditing}
                          style={{ transitionDelay: "500ms" }}
                        >
                          <Button
                            onClick={() => setIsEditing(true)}
                            variant="contained"
                            startIcon={<EditIcon />}
                            sx={{
                              px: 4,
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 500,
                            }}
                          >
                            Edit Profile
                          </Button>
                        </Zoom>
                        <Zoom
                          in={!isEditing}
                          style={{ transitionDelay: "550ms" }}
                        >
                          <Button
                            onClick={handleDelete}
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            disabled
                            sx={{
                              px: 4,
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 500,
                            }}
                          >
                            Delete Account
                          </Button>
                        </Zoom>
                        <Zoom
                          in={!isEditing}
                          style={{ transitionDelay: "600ms" }}
                        >
                          <Button
                            onClick={logout}
                            variant="outlined"
                            startIcon={<LogoutIcon />}
                            sx={{
                              px: 4,
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 500,
                              borderColor: "error.main",
                              color: "error.main",
                              "&:hover": {
                                // bgcolor: "error.light",
                                // borderColor: "error.dark",
                              },
                            }}
                          >
                            Logout
                          </Button>
                        </Zoom>
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </ProfileCard>
      </Container>
    </Fade>
  );
};

export default Profile;
