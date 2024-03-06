import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Times New Roman",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});
