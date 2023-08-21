import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#161c26" },
    secondary: { main: "#e31e30" },
  },
  typography: {
    fontFamily: ["almarai"].join(","),
  },
});

export const secondaryShadow = "0px 0px 10px 0px rgba(227, 30, 48, 0.5)";

export const primaryShadow = "0px 0px 10px 0px rgba(22, 28, 38, 0.5)";
