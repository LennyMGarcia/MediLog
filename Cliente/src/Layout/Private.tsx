import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router";
import Appbar from "../Common/Components/AppBar";
import Footer from "../Common/Components/Footer";

export default function Private() {
  return (
    <Box
      // xs={12}
      sx={{
        width: "100%",
        // minHeight: "100vh",
      }}
    >
      <Appbar />
      {/* <Navbar /> */}
      <Box
        sx={{
          width: "100%",
          minHeight: "90vh",
          bgcolor: "#E9ECEF",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
