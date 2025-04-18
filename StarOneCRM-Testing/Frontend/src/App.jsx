import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./utils/theme";
import { GlobalProvider } from "./context/GlobalContext";
import AppRoutes from "./router/AppRoutes";

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  </MuiThemeProvider>
);

export default App;
