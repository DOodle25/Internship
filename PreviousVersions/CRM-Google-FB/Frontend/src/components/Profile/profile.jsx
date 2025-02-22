// // Profile.jsx
// import React, { useState, useEffect } from "react";
// import { TextField, Button, Typography, Container, Card, CardContent, AppBar, Toolbar, IconButton } from "@mui/material";
// import { Chat, AccountCircle } from "@mui/icons-material";
// import axiosInstance from "../../utils/axios"; // Import the axiosInstance
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// const Profile = ({ logout, setUserMethod, token }) => {
//   const [profile, setProfile] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     role: "",
//   });
//   const [currentPage, setCurrentPage] = useState("profile");
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     // Fetch profile data on component mount
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
//       localStorage.removeItem("token");
//       navigate("/login"); // Use navigate to redirect after deletion
//     } catch (error) {
//       console.error("Error deleting profile:", error);
//     }
//   };

//   const renderContent = () => {
//     if (currentPage === "profile") {
//       return (
//         <Card>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               {isEditing ? "Edit Profile" : "Profile Details"}
//             </Typography>

//             <TextField
//               label="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//               margin="normal"
//             />
//             <TextField
//               label="Age"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//               margin="normal"
//             />
//             <TextField
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//               margin="normal"
//             />
//             <TextField
//               label="Role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//               margin="normal"
//             />

//             {!isEditing ? (
//               <>
//                 <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" fullWidth>
//                   Edit Profile
//                 </Button>
//                 <Button onClick={handleDelete} variant="outlined" color="secondary" fullWidth style={{ marginTop: 10 }}>
//                   Delete Profile
//                 </Button>
//                 <Button onClick={logout} variant="contained" color="primary" fullWidth style={{ marginTop: 10 }}>
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
//                   Save Changes
//                 </Button>
//                 <Button onClick={() => setIsEditing(false)} variant="outlined" color="secondary" fullWidth style={{ marginTop: 10 }}>
//                   Cancel
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       );
//     } else if (currentPage === "chat") {
//       return (
//         <Card>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               Chat Page
//             </Typography>
//             {/* Add your chat page content here */}
//           </CardContent>
//         </Card>
//       );
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" style={{ flexGrow: 1 }}>
//             CRM
//           </Typography>
//           <IconButton color="inherit" onClick={() => setCurrentPage("profile")}>
//             <AccountCircle />
//           </IconButton>
//           <IconButton color="inherit" onClick={() => setCurrentPage("chat")}>
//             <Chat />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       {renderContent()}
//     </Container>
//   );
// };

// export default Profile;








// import React, { useState, useEffect } from "react";
// import { TextField, Button, Typography, Container, Card, CardContent, AppBar, Toolbar, IconButton } from "@mui/material";
// import { Chat, AccountCircle } from "@mui/icons-material";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import ChatPage from "./chat";
// const Profile = ({ logout, setUserMethod, token }) => {
//   const [profile, setProfile] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     role: "",
//   });
//   const [currentPage, setCurrentPage] = useState("profile");
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
//       localStorage.removeItem("token");
//       navigate("/login");
//     } catch (error) {
//       console.error("Error deleting profile:", error);
//     }
//   };

//   const renderContent = () => {
//     if (currentPage === "profile") {
//       return (
//         <Card style={{ maxWidth: '400px', alignContent  : 'center', margin: 'auto', marginTop: '20px' }}>
//           <CardContent>
//         <Typography variant="h5" gutterBottom>
//           {isEditing ? "Edit Profile" : "Profile Details"}
//         </Typography>

//         <TextField
//           label="Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           fullWidth
//           disabled={!isEditing}
//           margin="normal"
//         />
//         <TextField
//           label="Age"
//           name="age"
//           value={formData.age}
//           onChange={handleChange}
//           fullWidth
//           disabled={!isEditing}
//           margin="normal"
//         />
//         <TextField
//           label="Email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           fullWidth
//           disabled={!isEditing}
//           margin="normal"
//         />
//         <TextField
//           label="Role"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           fullWidth
//           disabled={!isEditing}
//           margin="normal"
//         />

//         {!isEditing ? (
//           <>
//             <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" fullWidth>
//           Edit Profile
//             </Button>
//             <Button onClick={handleDelete} variant="outlined" color="secondary" fullWidth style={{ marginTop: 10 }}>
//           Delete Profile
//             </Button>
//             <Button onClick={logout} variant="contained" color="primary" fullWidth style={{ marginTop: 10 }}>
//           Logout
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
//           Save Changes
//             </Button>
//             <Button onClick={() => setIsEditing(false)} variant="outlined" color="secondary" fullWidth style={{ marginTop: 10 }}>
//           Cancel
//             </Button>
//           </>
//         )}
//           </CardContent>
//         </Card>
//       );
//     } else if (currentPage === "chat") {
//       return (
//         <Card>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               <ChatPage />
//             </Typography>
//             {/* Add your chat page content here */}
//           </CardContent>
//         </Card>
//       );
//     }
//   };

//   return (
//     <Container maxWidth="">
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" style={{ flexGrow: 1 }}>
//             CRM
//           </Typography>
//           <IconButton color="inherit" onClick={() => setCurrentPage("profile")}>
//             <AccountCircle />
//           </IconButton>
//           <IconButton color="inherit" onClick={() => setCurrentPage("chat")}>
//             <Chat />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       {renderContent()}
//     </Container>
//   );
// };

// export default Profile;










// Profile.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Card, CardContent } from "@mui/material";
import axiosInstance from "../../utils/axios"; // Import the axiosInstance
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Profile = ({ logout, setUserMethod, token }) => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    role: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch profile data on component mount
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
      localStorage.removeItem("token");
      navigate("/login"); // Use navigate to redirect after deletion
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    style={{
      padding: '30px',
      margin: '20px auto',
      maxWidth: '500px',
      textAlign: 'center',
    }}>
      <Card sx={{
        // display: 'flex', 
        // flexDirection: 'column'
        }}>
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
              <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" fullWidth>
                Edit Profile
              </Button>
              <Button onClick={handleDelete} variant="contained" color="primary" fullWidth style={{ marginTop: 10 }}>
                Delete Profile
              </Button>
              <Button onClick={logout} variant="contained" color="primary" fullWidth style={{ marginTop: 10 }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
                Save Changes
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outlined" color="secondary" fullWidth style={{ marginTop: 10 }}>
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