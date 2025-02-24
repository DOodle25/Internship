// import React, { createContext, useState, useEffect, useContext } from "react";
// import axiosInstance from "../utils/axios";

// const GlobalContext = createContext();

// const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net"
//     : "http://localhost:5000";

// export const GlobalProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );
//   const [loginloadingProvider, setloginLoadingProvider] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [tasks, setTasks] = useState([]);

//   const setTokenMethod = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("token", newToken);
//   };
//   const setUserMethod = (newUser) => {
//     setUser(newUser);
//     localStorage.setItem("user", JSON.stringify(newUser));
//   };
//   useEffect(() => {
//     const checkTokenValidity = async () => {
//       if (token) {
//         try {
//           const response = await axiosInstance.get("/status/check-status", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUser({ ...response.data.status.user, token });
//           localStorage.setItem(
//             "user",
//             JSON.stringify(response.data.status.user)
//           );
//         } catch (error) {
//           console.error(
//             "Token expired or invalid",
//             error?.response?.data?.message
//           );
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           setToken(null);
//           setUser(null);
//         }
//       }
//     };

//     checkTokenValidity();
//   }, [token]);
//   const handleLogin = async (credentials) => {
//     try {
//       const response = await axiosInstance.post("/auth/login", credentials);
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.user));

//       // Assuming `setToken` and `setUser` update the global state or context
//       setToken(response.data.token);
//       setUser({ ...response.data.user, token: response.data.token });

//       return true;
//     } catch (error) {
//       console.error("Login error:", error?.response?.data?.message);

//       // Show error message via toast
//       toast.error(error?.response?.data?.message || "Login failed");

//       return false;
//     }
//   };
//   const handleSignup = async (data, isOtpValidation = false) => {
//     try {
//       let response;
//       if (!isOtpValidation) {
//         // Step 1: Request OTP
//         response = await axiosInstance.post("/auth/send-otp", {
//           email: data.email,
//         });
//         return { success: true, message: response.data.message };
//       } else {
//         // Step 2: Validate OTP and Complete Signup
//         response = await axiosInstance.post("/auth/register", data);
//         return { success: true, message: response.data.message };
//       }
//     } catch (error) {
//       console.error("Signup error:", error?.response?.data?.message);
//       return {
//         success: false,
//         message: error?.response?.data?.message || "An error occurred",
//       };
//     }
//   };
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken(null);
//     setUser(null);
//   };
//   const handleOAuthLogin = (providerId) => {
//     setloginLoadingProvider(providerId);
//     const authUrl = `${BASE_URL}/api/auth/${providerId}?prompt=select_account`;
//     const newWindow = window.open(authUrl, "_blank", "width=500,height=600");

//     const handleMessage = (event) => {
//       if (event.origin !== BASE_URL) return;
//       const { token } = event.data;
//       if (token) {
//         setTokenMethod(token);
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
//         setloginLoadingProvider(null);
//       }
//     }, 1000);
//   };
//   const fetchUserDetails = async () => {
//     try {
//       if (!token) return;

//       const response = await axiosInstance.get("/status/check-status", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         setTokenMethod(response.data.token);
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       console.error(
//         "Error fetching user:",
//         error.response?.data || error.message
//       );
//     }
//   };
//   const handleFillFormSubmit = async (e, formData, setFormData) => {
//     e.preventDefault();
//     if (user?.loginMethod !== "traditional") {
//       if (formData.password !== formData.confirmPassword) {
//         toast.error("Passwords do not match");
//         return;
//       }
//     }
//     try {
//       const response = await axiosInstance.post("/status/fill-form", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response) {
//         const updatedUser = { ...user, isFormFilled: true };
//         setUserMethod(updatedUser);
//       }
//       setUserMethod(response.data.user);
//       toast.success("Form submitted successfully");
//     } catch (error) {
//       console.error(error.response?.data?.message || error.message);
//       toast.error("Form submission failed");
//     }
//   };
//   const handleAddStudentSubmit = async (formData, callback) => {
//     try {
//       const response = await axiosInstance.post(`/admin/`, {
//         ...formData,
//         age: Number(formData.age),
//       });

//       const { message, data } = response.data;

//       if (data) {
//         setTimeout(() => {
//           if (callback) callback();
//         }, 5000);
//       }
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };
//   const fetchUsers = async (token, logout, setUserMethod) => {
//     try {
//       const response = await axiosInstance.get("/admin/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(response.data.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setUserMethod(null);
//       logout();
//       // navigate("/");
//     }
//   };
//   const handleDelete = async (token) => {
//     try {
//       await Promise.all(
//         selectedUsers.map(async (id) => {
//           await axiosInstance.delete(`/admin/${id}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//         })
//       );
//       setUsers((prevUsers) =>
//         prevUsers.filter((user) => !selectedUsers.includes(user._id))
//       );
//       setSelectedUsers([]);
//     } catch (error) {
//       console.error("Error deleting users:", error);
//     }
//   };
//   const handleVerify = async (token) => {
//     try {
//       await Promise.all(
//         selectedUsers.map(async (id) => {
//           await axiosInstance.patch(
//             `/admin/verify/${id}`,
//             {},
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//         })
//       );
//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           selectedUsers.includes(user._id)
//             ? { ...user, isFormVerified: true }
//             : user
//         )
//       );
//       setSelectedUsers([]);
//     } catch (error) {
//       console.error("Error verifying users:", error);
//     }
//   };
//   const handleUpdateUserSubmit = async (e, user, id) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.patch(
//         `/admin/${id}`,
//         { ...user, age: Number(user.age) },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const { message, data } = response.data;
//       if (data) {
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 5000);
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };
//   const fetchUserWithId = async (id) => {
//     axiosInstance
//       .get(`/admin/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setUser(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user:", error);
//       });
//     return user;
//   };
//   const fetchTasks = async () => {
//     try {
//       const response = await axiosInstance.get("/chat/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(response.data.tasks);
//     } catch (error) {
//       console.error("Failed to fetch tasks");
//       setTasks([]);
//     }
//   };
//   const handleCreateTask = async (newTask) => {
//     try {
//       const response = await axiosInstance.post("/chat/task", newTask, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks([...tasks, response.data.task]);
//       return { success: true, message: "Task created successfully!" };
//     } catch (error) {
//       return { success: false, message: "Failed to create task" };
//     }
//   };
//   const handleUpdateTask = async (editTask) => {
//     try {
//       const response = await axiosInstance.put(
//         `/chat/task/${editTask.id}`,
//         editTask,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setTasks(
//         tasks.map((task) =>
//           task._id === editTask.id ? response.data.task : task
//         )
//       );
//       return { success: true, message: "Task updated successfully!" };
//     } catch (error) {
//       return { success: false, message: "Failed to update task" };
//     }
//   };
//   const handleDeleteTask = async (taskId) => {
//     try {
//       await axiosInstance.delete(`/chat/task/${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(tasks.filter((task) => task._id !== taskId));
//       return { success: true, message: "Task deleted successfully!" };
//     } catch (error) {
//       return { success: false, message: "Failed to delete task" };
//     }
//   };
//   const handleAssignTask = async (
//     selectedTask,
//     selectedCustomer,
//     selectedEmployee
//   ) => {
//     if (!selectedTask || !selectedCustomer || !selectedEmployee) {
//       return {
//         success: false,
//         message: "Please select task, customer, and employee.",
//       };
//     }
//     try {
//       await axiosInstance.post(
//         "/chat/assign",
//         {
//           taskId: selectedTask,
//           customerId: selectedCustomer,
//           employeeId: selectedEmployee,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchTasks();
//       return {
//         success: true,
//         message: "Task assigned to employee successfully!",
//       };
//     } catch (error) {
//       return { success: false, message: "Failed to assign task." };
//     }
//   };

//   return (
//     <GlobalContext.Provider
//       value={{
//         token,
//         user,
//         handleLogin,
//         handleSignup,
//         logout,
//         setUserMethod,
//         setTokenMethod,
//         handleOAuthLogin,
//         fetchUserDetails,
//         loginloadingProvider,
//         setloginLoadingProvider,
//         handleFillFormSubmit,
//         handleAddStudentSubmit,
//         fetchUsers,
//         handleDelete,
//         handleVerify,
//         users,
//         setUsers,
//         selectedUsers,
//         setSelectedUsers,
//         handleUpdateUserSubmit,
//         fetchUserWithId,
//         fetchTasks,
//         handleCreateTask,
//         handleUpdateTask,
//         handleDeleteTask,
//         handleAssignTask,
//         tasks,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalContext = () => useContext(GlobalContext);














import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axios";
import { Snackbar, Alert } from "@mui/material";

const GlobalContext = createContext();

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net"
    : "http://localhost:5000";

export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loginloadingProvider, setloginLoadingProvider] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const setTokenMethod = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const setUserMethod = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get("/status/check-status", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser({ ...response.data.status.user, token });
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.status.user)
          );
        } catch (error) {
          showSnackbar("Token expired or invalid", "error");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        }
      }
    };

    checkTokenValidity();
  }, [token]);

  const handleLogin = async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setToken(response.data.token);
      setUser({ ...response.data.user, token: response.data.token });

      showSnackbar("Login successful");
      return true;
    } catch (error) {
      showSnackbar(error?.response?.data?.message || "Login failed", "error");
      return false;
    }
  };

  const handleSignup = async (data, isOtpValidation = false) => {
    try {
      let response;
      if (!isOtpValidation) {
        response = await axiosInstance.post("/auth/send-otp", {
          email: data.email,
        });
        showSnackbar(response.data.message);
        return { success: true, message: response.data.message };
      } else {
        response = await axiosInstance.post("/auth/register", data);
        showSnackbar(response.data.message);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      showSnackbar(error?.response?.data?.message || "An error occurred", "error");
      return {
        success: false,
        message: error?.response?.data?.message || "An error occurred",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    showSnackbar("Logged out successfully");
  };

  const handleOAuthLogin = (providerId) => {
    setloginLoadingProvider(providerId);
    const authUrl = `${BASE_URL}/api/auth/${providerId}?prompt=select_account`;
    const newWindow = window.open(authUrl, "_blank", "width=500,height=600");

    const handleMessage = (event) => {
      if (event.origin !== BASE_URL) return;
      const { token } = event.data;
      if (token) {
        setTokenMethod(token);
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
        setloginLoadingProvider(null);
      }
    }, 1000);
  };

  const fetchUserDetails = async () => {
    try {
      if (!token) return;

      const response = await axiosInstance.get("/status/check-status", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setTokenMethod(response.data.token);
        setUser(response.data.user);
      }
    } catch (error) {
      showSnackbar("Error fetching user details", "error");
    }
  };

  const handleFillFormSubmit = async (e, formData, setFormData) => {
    e.preventDefault();
    if (user?.loginMethod !== "traditional") {
      if (formData.password !== formData.confirmPassword) {
        showSnackbar("Passwords do not match", "error");
        return;
      }
    }
    try {
      const response = await axiosInstance.post("/status/fill-form", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        const updatedUser = { ...user, isFormFilled: true };
        setUserMethod(updatedUser);
      }
      setUserMethod(response.data.user);
      showSnackbar("Form submitted successfully");
    } catch (error) {
      showSnackbar("Form submission failed", "error");
    }
  };

  const handleAddStudentSubmit = async (formData, callback) => {
    try {
      const response = await axiosInstance.post(`/admin/`, {
        ...formData,
        age: Number(formData.age),
      });

      const { message, data } = response.data;

      if (data) {
        if (callback) callback();
      }
      showSnackbar(message);
    } catch (error) {
      showSnackbar("Error adding user", "error");
    }
  };

  const fetchUsers = async (token, logout, setUserMethod) => {
    try {
      const response = await axiosInstance.get("/admin/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.data);
    } catch (error) {
      showSnackbar("Error fetching users", "error");
      setUserMethod(null);
      logout();
    }
  };

  const handleDelete = async (token) => {
    try {
      await Promise.all(
        selectedUsers.map(async (id) => {
          await axiosInstance.delete(`/admin/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        })
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => !selectedUsers.includes(user._id))
      );
      setSelectedUsers([]);
      showSnackbar("Users deleted successfully");
    } catch (error) {
      showSnackbar("Error deleting users", "error");
    }
  };

  const handleVerify = async (token) => {
    try {
      await Promise.all(
        selectedUsers.map(async (id) => {
          await axiosInstance.patch(
            `/admin/verify/${id}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        })
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user._id)
            ? { ...user, isFormVerified: true }
            : user
        )
      );
      setSelectedUsers([]);
      showSnackbar("Users verified successfully");
    } catch (error) {
      showSnackbar("Error verifying users", "error");
    }
  };

  const handleUpdateUserSubmit = async (e, user, id) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/admin/${id}`,
        { ...user, age: Number(user.age) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { message, data } = response.data;
      if (data) {
        window.location.href = "/";
      }
      showSnackbar(message);
    } catch (error) {
      showSnackbar("Error updating user", "error");
    }
  };

  const fetchUserWithId = async (id) => {
    axiosInstance
      .get(`/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        showSnackbar("Error fetching user", "error");
      });
    return user;
  };

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/chat/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      showSnackbar("Failed to fetch tasks", "error");
      setTasks([]);
    }
  };

  const handleCreateTask = async (newTask) => {
    try {
      const response = await axiosInstance.post("/chat/task", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, response.data.task]);
      showSnackbar("Task created successfully!");
      return { success: true, message: "Task created successfully!" };
    } catch (error) {
      showSnackbar("Failed to create task", "error");
      return { success: false, message: "Failed to create task" };
    }
  };

  const handleUpdateTask = async (editTask) => {
    try {
      const response = await axiosInstance.put(
        `/chat/task/${editTask.id}`,
        editTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(
        tasks.map((task) =>
          task._id === editTask.id ? response.data.task : task
        )
      );
      showSnackbar("Task updated successfully!");
      return { success: true, message: "Task updated successfully!" };
    } catch (error) {
      showSnackbar("Failed to update task", "error");
      return { success: false, message: "Failed to update task" };
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInstance.delete(`/chat/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      showSnackbar("Task deleted successfully!");
      return { success: true, message: "Task deleted successfully!" };
    } catch (error) {
      showSnackbar("Failed to delete task", "error");
      return { success: false, message: "Failed to delete task" };
    }
  };

  const handleAssignTask = async (
    selectedTask,
    selectedCustomer,
    selectedEmployee
  ) => {
    if (!selectedTask || !selectedCustomer || !selectedEmployee) {
      showSnackbar("Please select task, customer, and employee.", "error");
      return {
        success: false,
        message: "Please select task, customer, and employee.",
      };
    }
    try {
      await axiosInstance.post(
        "/chat/assign",
        {
          taskId: selectedTask,
          customerId: selectedCustomer,
          employeeId: selectedEmployee,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
      showSnackbar("Task assigned to employee successfully!");
      return {
        success: true,
        message: "Task assigned to employee successfully!",
      };
    } catch (error) {
      showSnackbar("Failed to assign task.", "error");
      return { success: false, message: "Failed to assign task." };
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        token,
        user,
        handleLogin,
        handleSignup,
        logout,
        setUserMethod,
        setTokenMethod,
        handleOAuthLogin,
        fetchUserDetails,
        loginloadingProvider,
        setloginLoadingProvider,
        handleFillFormSubmit,
        handleAddStudentSubmit,
        fetchUsers,
        handleDelete,
        handleVerify,
        users,
        setUsers,
        selectedUsers,
        setSelectedUsers,
        handleUpdateUserSubmit,
        fetchUserWithId,
        fetchTasks,
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask,
        handleAssignTask,
        tasks,
      }}
    >
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
