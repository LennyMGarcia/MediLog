import { Box } from "@mui/material";
import "./App.css";
import RoutesProvider from "./Routes/Routes";

function App() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <RoutesProvider />
    </Box>
  );
}

export default App;
