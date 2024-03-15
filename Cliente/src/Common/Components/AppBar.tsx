import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import Icon from "/assets/Pictures/IconMediLog.png";
import { Collapse } from "@mui/material";

const pagesPatients = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Casos", link: "/" },
  { name: "Casos Terceros", link: "/" },
  { name: "Perfil", link: "/" },
];
const pagesDoctors = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Casos", link: "/" },
  { name: "Pacietes", link: "/" },
  { name: "Perfil", link: "/" },
];
const settings = ["Ajustes", "Cerrar Sesion"];

function Appbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    console.log(checked);

    setChecked((prev) => !prev);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#184E77",
        height: "72px",
      }}
    >
      <Container
        maxWidth="xl"
        sx={
          {
            // padding: "10px 25px",
          }
        }
      >
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img src={Icon} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MEDILOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleChange}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pagesDoctors.map((page, idx) => (
                <MenuItem key={idx} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img src={Icon} />
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MEDILOG
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              height: "34px",
            }}
          >
            {pagesDoctors.map((page, idx) => (
              // <Button
              //   key={idx}
              //   onClick={handleCloseNavMenu}
              //   sx={{ my: 2, color: "white", display: "block" }}
              // >
              //   {page.name}
              // </Button>
              <NavLink
                key={idx}
                // onClick={handleCloseNavMenu}
                to={page.link}
                style={({ isActive }) => {
                  return {
                    padding: "5px 10px",
                    color: "white",
                    display: "block",
                    textDecoration: "none",
                    height: "100%",
                    marginTop: 2,
                    marginBottom: 2,
                    borderBottom: isActive ? "2px solid #FFF" : "none",
                    borderTop: isActive ? "2px solid transparent" : "none",
                  };
                }}
              >
                {page.name}
              </NavLink>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItem: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItem: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" fontSize={16} textAlign={"center"}>
                Nombre Apellido
              </Typography>
              <Typography variant="h6" fontSize={14} textAlign={"center"}>
                Rol
              </Typography>
            </Box>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Collapse
        in={checked}
        sx={{
          bgcolor: "#168AAD",
          display: {
            // xs: "flex",
            // md: "none",
          },
        }}
      >
        {pagesDoctors.map((page, idx) => (
          <NavLink
            key={idx}
            // onClick={handleCloseNavMenu}
            to={page.link}
            onClick={handleChange}
            style={({ isActive }) => {
              return {
                padding: "5px 10px",
                color: "white",
                fontSize: "18px",
                display: "block",
                textDecoration: isActive ? "underline" : "none",
                // textDecoration: "none",
                textAlign: "center",
                // height: "100%",
                // marginTop: 2,
                // marginBottom: 2,
                // borderBottom: isActive ? "1px solid #FFF" : "none",
                // borderTop: isActive ? "1px solid transparent" : "none",
              };
            }}
          >
            {page.name}
          </NavLink>
        ))}
      </Collapse>
    </AppBar>
  );
}
export default Appbar;
