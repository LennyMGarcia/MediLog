import Navbar from "../Common/Components/Navbar";
import { Box } from "@mui/material";
import Footer from "../Common/Components/Footer";
import { Outlet } from "react-router-dom";

export default function NoPrivate() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
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
