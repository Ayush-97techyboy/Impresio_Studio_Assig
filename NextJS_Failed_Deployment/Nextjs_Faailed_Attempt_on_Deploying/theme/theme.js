import { createTheme } from "@mui/material/styles";

// Custom color palette based on provided colors
const customColors = {
  isabelline: "#F6F5F1",
  timberwolf: "#DBD7D2",
  isabelline2: "#EDEAE6",
  isabelline3: "#F6F5F1",
  isabelline4: "#F6F5F1",
  // Additional colors for better contrast
  darkBrown: "#5C4033", // Example color, replace with your desired value
  mediumBrown: "#A68B5B",
  lightBrown: "#C4A484",
  accent: "#6B5B73",
  text: "#4A4A4A",
  textSecondary: "#6B6B6B",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: customColors.darkBrown,
      light: customColors.mediumBrown,
      dark: "#6B5B47",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: customColors.accent,
      light: "#8B7B8B",
      dark: "#4A3A4A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: customColors.isabelline,
      paper: customColors.isabelline2,
    },
    text: {
      primary: customColors.text,
      secondary: customColors.textSecondary,
    },
    divider: customColors.timberwolf,
    action: {
      hover: customColors.timberwolf,
      selected: customColors.isabelline2,
    },
    custom: customColors,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: customColors.text,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: customColors.text,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: customColors.text,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: customColors.text,
    },
    body1: {
      fontSize: "1rem",
      color: customColors.text,
    },
    body2: {
      fontSize: "0.875rem",
      color: customColors.textSecondary,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: customColors.isabelline2,
          boxShadow: "0 2px 8px rgba(139, 115, 85, 0.1)",
          border: `1px solid ${customColors.timberwolf}`,
          "&:hover": {
            boxShadow: "0 4px 16px rgba(139, 115, 85, 0.15)",
            transform: "translateY(-2px)",
            transition: "all 0.3s ease-in-out",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
        },
        contained: {
          backgroundColor: customColors.darkBrown,
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: customColors.mediumBrown,
          },
        },
        outlined: {
          borderColor: customColors.timberwolf,
          color: customColors.text,
          "&:hover": {
            backgroundColor: customColors.timberwolf,
            borderColor: customColors.darkBrown,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: customColors.isabelline,
            "& fieldset": {
              borderColor: customColors.timberwolf,
            },
            "&:hover fieldset": {
              borderColor: customColors.darkBrown,
            },
            "&.Mui-focused fieldset": {
              borderColor: customColors.darkBrown,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: customColors.timberwolf,
          color: customColors.text,
          "&:hover": {
            backgroundColor: customColors.darkBrown,
            color: "#FFFFFF",
          },
        },
      },
    },
  },
});

export default theme;
