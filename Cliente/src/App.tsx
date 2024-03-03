import { Box, ThemeProvider } from "@mui/material";
import "./App.css";
import RoutesProvider from "./Routes/Routes";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <RoutesProvider />
      </Box>
    </ThemeProvider>
  );
}

export default App;
