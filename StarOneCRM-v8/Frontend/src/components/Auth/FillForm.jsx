// import React, { useState } from "react";
// import { Button, TextField, Paper, Box, Typography } from "@mui/material";
// import { useGlobalContext } from "../../context/GlobalContext";

// function FillForm() {
//   const { logout, user, handleFillFormSubmit } = useGlobalContext();
//   const loginMethod = user.loginMethod;
//   const [formData, setFormData] = useState({
//     Taskassigned: "",
//     age: "",
//     role: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   return (
//     <Paper
//       elevation={3}
//       style={{
//         padding: "30px",
//         margin: "20px auto",
//         maxWidth: "500px",
//         textAlign: "center",
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Complete Your Profile
//       </Typography>

//       <form onSubmit={(e) => handleFillFormSubmit(e, formData, setFormData)}>
//         <Box mb={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Task"
//             name="Taskassigned"
//             value={formData.Taskassigned}
//             onChange={handleChange}
//             required
//             multiline
//             rows={4}
//           />
//         </Box>
//         {loginMethod !== "traditional" && (
//           <>
//             <Box mb={2}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Age"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//             <Box mb={2}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//             <Box mb={2}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//             <Box mb={2}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//           </>
//         )}
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Submit
//         </Button>
//       </form>
//       <Box mt={2}>
//         <Button variant="contained" color="primary" fullWidth onClick={logout}>
//           Logout
//         </Button>
//       </Box>
//     </Paper>
//   );
// }

// export default FillForm;



import React, { useState } from "react";
import { Button, TextField, Paper, Box, Typography, MenuItem } from "@mui/material";
import { useGlobalContext } from "../../context/GlobalContext";

function FillForm() {
  const { logout, user, handleFillFormSubmit } = useGlobalContext();
  const loginMethod = user.loginMethod;
  const [formData, setFormData] = useState({
    role: "",
    Taskassigned: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData({ ...formData, role, Taskassigned: role === "employee" ? "" : formData.Taskassigned });
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "30px",
        margin: "20px auto",
        maxWidth: "500px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Complete Your Profile
      </Typography>

      <form onSubmit={(e) => handleFillFormSubmit(e, formData, setFormData)}>
        <Box mb={2}>
        {loginMethod !== "traditional" && (
          <TextField
            select
            fullWidth
            variant="outlined"
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            required
          >
            <MenuItem value="customer">customer</MenuItem>
            <MenuItem value="employee">employee</MenuItem>
          </TextField>
          )}
        </Box>
        {formData.role !== "employee" && (
          <Box mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Task"
              name="Taskassigned"
              value={formData.Taskassigned}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />
          </Box>
        )}
        {loginMethod !== "traditional" && (
          <>
            <Box mb={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Box>
          </>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth onClick={logout}>
          Logout
        </Button>
      </Box>
    </Paper>
  );
}

export default FillForm;
