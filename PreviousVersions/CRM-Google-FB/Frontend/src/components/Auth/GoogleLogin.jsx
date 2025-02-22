// import React, { useState, useEffect } from "react";
// import { Button, Container, CircularProgress, SvgIcon } from "@mui/material";
// import { Google, GitHub, Facebook, Twitter, LinkedIn } from "@mui/icons-material";
// import axiosInstance from "../../utils/axios";

// const providers = [
//   { id: "google", name: "Google", icon: Google, color: "#DB4437" },
//   // { id: "github", name: "GitHub", icon: GitHub, color: "#333" },
//   { id: "facebook", name: "Facebook", icon: Facebook, color: "#3b5998" },
//   // { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2" },
//   // { id: "linkedin", name: "LinkedIn", icon: LinkedIn, color: "#0077B5" },
// ];

// const GoogleLogin = () => {
//   const [user, setUser] = useState(null);
//   const [loadingProvider, setLoadingProvider] = useState(null);

//   const handleOAuthLogin = (providerId) => {
//     setLoadingProvider(providerId);
//     const authUrl = `http://localhost:5000/auth/${providerId}?prompt=select_account`;
//     const newWindow = window.open(authUrl, "_blank", "width=500,height=600");

//     const handleMessage = (event) => {
//       if (event.origin !== "http://localhost:5000") return;
//       const { token } = event.data;
//       if (token) {
//         localStorage.setItem("token", token);
//         fetchUserDetails();
//         newWindow?.close();
//         window.location.reload();
//       }
//     };

//     window.addEventListener("message", handleMessage);

//     const checkWindow = setInterval(() => {
//       if (newWindow.closed) {
//         clearInterval(checkWindow);
//         window.removeEventListener("message", handleMessage);
//         setLoadingProvider(null);
//       }
//     }, 1000);
//   };

//   const fetchUserDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const response = await axiosInstance.get("/check-status", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error.response?.data || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   return (
//     <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "0px" }}>
//       <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginBottom:"15px", marginTop:"15px" }}>
//         {providers.map((provider) => (
//           <Button
//             key={provider.id}
//             color="white"
//             sx={{
//               borderRadius: "5px",
//               textTransform: "none",
//               fontWeight: "500",
//               backgroundColor: provider.color,
//               color: "white",
//               "&:hover": {
//                 backgroundColor: provider.color,
//               },
//             }}
//             onClick={() => handleOAuthLogin(provider.id)}
//             style={{ margin: "2px" }}
//             disabled={loadingProvider === provider.id}
//             startIcon={
//               loadingProvider === provider.id ? (
//                 <CircularProgress size={24} />
//               ) : (
//                 <SvgIcon component={provider.icon} />
//               )
//             }
//           >
//             Sign in with {provider.name}
//           </Button>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default GoogleLogin;


































// import React, { useState, useEffect } from "react";
// import { Button, Container, CircularProgress, SvgIcon } from "@mui/material";
// import { Google, GitHub, Facebook, Twitter, LinkedIn } from "@mui/icons-material";
// import axiosInstance from "../../utils/axios";

// const providers = [
//   { id: "google", name: "Google", icon: Google, color: "#DB4437" },
//   { id: "github", name: "GitHub", icon: GitHub, color: "#333" },
//   { id: "facebook", name: "Facebook", icon: Facebook, color: "#3b5998" },
//   { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2" },
//   { id: "linkedin", name: "LinkedIn", icon: LinkedIn, color: "#0077B5" },
// ];

// const GoogleLogin = () => {
//   const [user, setUser] = useState(null);
//   const [loadingProvider, setLoadingProvider] = useState(null);

//   const handleOAuthLogin = (providerId) => {
//     setLoadingProvider(providerId);
//     const authUrl = `http://localhost:5000/auth/${providerId}?prompt=select_account`;
//     const newWindow = window.open(authUrl, "_blank", "width=500,height=600");

//     const handleMessage = (event) => {
//       if (event.origin !== "http://localhost:5000") return;
//       const { token } = event.data;
//       if (token) {
//         localStorage.setItem("token", token);
//         fetchUserDetails();
//         newWindow?.close();
//         window.location.reload();
//       }
//     };

//     window.addEventListener("message", handleMessage);

//     const checkWindow = setInterval(() => {
//       if (newWindow.closed) {
//         clearInterval(checkWindow);
//         window.removeEventListener("message", handleMessage);
//         setLoadingProvider(null);
//       }
//     }, 1000);
//   };

//   const fetchUserDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const response = await axiosInstance.get("/check-status", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error.response?.data || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   return (
//     <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "0px", marginBottom: "15px" }}>
//       <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", overflow:"inherit" }}>
//         {providers.map((provider) => (
//           <Button
//             key={provider.id}
//             sx={{
//               border: "solid 0px black",
//               borderRadius: "5px",
//               textTransform: "none",
//               fontWeight: "500",
//               backgroundColor: provider.color,
//               color: "white",
//               "&:hover": {
//                 backgroundColor: "grey",
//               },
//               width: "40px",
//               height: "40px",
//               margin: "5px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//             onClick={() => handleOAuthLogin(provider.id)}
//             disabled={loadingProvider === provider.id}
//           >
//             {loadingProvider === provider.id ? (
//               <CircularProgress size={24} />
//             ) : (
//               <SvgIcon component={provider.icon} style={{ fontSize: 24 }} />
//             )}
//           </Button>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default GoogleLogin;



































// import React, { useState, useEffect } from "react";
// import { Button, Container, CircularProgress, SvgIcon, useMediaQuery, useTheme } from "@mui/material";
// import { Google, GitHub, Facebook, Twitter, LinkedIn } from "@mui/icons-material";
// import axiosInstance from "../../utils/axios";

// const providers = [
//   { id: "google", name: "Google", icon: Google, color: "#DB4437" },
//   // { id: "github", name: "GitHub", icon: GitHub, color: "#333" },
//   { id: "facebook", name: "Facebook", icon: Facebook, color: "#3b5998" },
//   // { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2" },
//   // { id: "linkedin", name: "LinkedIn", icon: LinkedIn, color: "#0077B5" },
// ];

// const GoogleLogin = () => {
//   const [user, setUser] = useState(null);
//   const [loadingProvider, setLoadingProvider] = useState(null);
  
//   // Media query to check if the screen width is less than 300px
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down(335));

//   const handleOAuthLogin = (providerId) => {
//     setLoadingProvider(providerId);
//     const authUrl = `https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/auth/${providerId}?prompt=select_account`;
//     const newWindow = window.open(authUrl, "_blank", "width=500,height=600");

//     const handleMessage = (event) => {
//       if (event.origin !== "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net") return;
//       const { token } = event.data;
//       if (token) {
//         localStorage.setItem("token", token);
//         fetchUserDetails();
//         newWindow?.close();
//         window.location.reload();
//       }
//     };

//     window.addEventListener("message", handleMessage);

//     const checkWindow = setInterval(() => {
//       if (newWindow.closed) {
//         clearInterval(checkWindow);
//         window.removeEventListener("message", handleMessage);
//         setLoadingProvider(null);
//       }
//     }, 1000);
//   };

//   const fetchUserDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const response = await axiosInstance.get("/check-status", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error.response?.data || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   return (
//     <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "0px" }}>
//       <div style={{ display: "flex", flexDirection: isSmallScreen ? "row" : "column", justifyContent: "center", marginBottom: "15px", marginTop: "15px" }}>
//         {providers.map((provider) => (
//           <Button
//             key={provider.id}
//             color="white"
//             sx={{
//               borderRadius: "5px",
//               textTransform: "none",
//               fontWeight: "500",
//               backgroundColor: provider.color,
//               color: "white",
//               "&:hover": {
//                 backgroundColor: provider.color,
//               },
//             }}
//             onClick={() => handleOAuthLogin(provider.id)}
//             style={{ margin: "2px" }}
//             disabled={loadingProvider === provider.id}
//             startIcon={
//               loadingProvider === provider.id ? (
//                 <CircularProgress size={24} />
//               ) : (
//                 <SvgIcon component={provider.icon} />
//               )
//             }
//           >
//             {/* Hide the sign-in text if the screen width is less than 300px */}
//             {!isSmallScreen && `Sign in with ${provider.name}`}
//           </Button>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default GoogleLogin;






















import React, { useState, useEffect } from "react";
import { Button, Container, CircularProgress, SvgIcon, useMediaQuery, useTheme } from "@mui/material";
import { Google, GitHub, Facebook, Twitter, LinkedIn } from "@mui/icons-material";
import axiosInstance from "../../utils/axios";

const providers = [
  { id: "google", name: "Google", icon: Google, color: "#DB4437" },
  // { id: "github", name: "GitHub", icon: GitHub, color: "#333" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "#3b5998" },
  // { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2" },
  // { id: "linkedin", name: "LinkedIn", icon: LinkedIn, color: "#0077B5" },
];

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net' 
  : 'http://localhost:5000';

const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [loadingProvider, setLoadingProvider] = useState(null);
  
  // Media query to check if the screen width is less than 300px
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(335));

  const handleOAuthLogin = (providerId) => {
    setLoadingProvider(providerId);
    const authUrl = `${BASE_URL}/auth/${providerId}?prompt=select_account`;
    const newWindow = window.open(authUrl, "_blank", "width=500,height=600");

    const handleMessage = (event) => {
      if (event.origin !== BASE_URL) return;
      const { token } = event.data;
      if (token) {
        localStorage.setItem("token", token);
        fetchUserDetails();
        newWindow?.close();
        window.location.reload();
      }
    };

    window.addEventListener("message", handleMessage);

    const checkWindow = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(checkWindow);
        window.removeEventListener("message", handleMessage);
        setLoadingProvider(null);
      }
    }, 1000);
  };

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axiosInstance.get("/check-status", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "0px" }}>
      <div style={{ display: "flex", flexDirection: isSmallScreen ? "row" : "column", justifyContent: "center", marginBottom: "15px", marginTop: "15px" }}>
        {providers.map((provider) => (
          <Button
            key={provider.id}
            color="white"
            sx={{
              borderRadius: "5px",
              textTransform: "none",
              fontWeight: "500",
              backgroundColor: provider.color,
              color: "white",
              "&:hover": {
                backgroundColor: provider.color,
              },
            }}
            onClick={() => handleOAuthLogin(provider.id)}
            style={{ margin: "2px" }}
            disabled={loadingProvider === provider.id}
            startIcon={
              loadingProvider === provider.id ? (
                <CircularProgress size={24} />
              ) : (
                <SvgIcon component={provider.icon} />
              )
            }
          >
            {/* Hide the sign-in text if the screen width is less than 300px */}
            {!isSmallScreen && `Sign in with ${provider.name}`}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default GoogleLogin;
