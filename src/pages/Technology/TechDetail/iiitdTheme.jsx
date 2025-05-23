import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

// Custom IIITD Theme
const iiitdTheme = createTheme({
  palette: {
    primary: {
      main: "#2A9D8F",
      light: "#4DB6A9",
      dark: "#1E7268",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#264653",
      light: "#3A5F6F",
      dark: "#1A323C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F7F8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#5F6368",
    },
    divider: "#E0E0E0",
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h3: { fontWeight: 600, fontSize: "2rem", lineHeight: 1.2 },
    h5: { fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: "1rem", lineHeight: 1.4 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.6 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
          padding: "8px 16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
  },
});

export default iiitdTheme;
