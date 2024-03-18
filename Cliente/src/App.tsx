import { Box, ThemeProvider } from "@mui/material";
import "./App.css";
import { theme } from "./theme/theme";
import RoutesMain from "./Routes/RoutesMain";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <RoutesMain />
      </Box>
    </ThemeProvider>
  );
}

export default App;
