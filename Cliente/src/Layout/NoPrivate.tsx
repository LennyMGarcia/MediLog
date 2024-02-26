import { Outlet } from "react-router";
import Navbar from "../Common/Components/Navbar";
import { Box } from "@mui/material";

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
    </Box>
  );
}
