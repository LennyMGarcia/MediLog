import Navbar from "../Common/Components/Navbar";
import { Box } from "@mui/material";
import Footer from "../Common/Components/Footer";
import { Outlet } from "react-router-dom";

export default function NoPrivate() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
