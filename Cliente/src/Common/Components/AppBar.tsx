import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Icon from "/assets/Pictures/IconMediLog.png";
import { Button, Collapse } from "@mui/material";
import ModalAlert from "../Modals/ModalAlert";
import useUserStore from "../Utils/setUserSession";
import { globalTheme } from "../../theme/globalTheme";

// Paginas para los pacientes
const pagesPatients = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Casos", link: "/cases" },
  { name: "Casos Terceros", link: "/externalCases" },
  { name: "Perfil", link: "/profile" },
];

// Paginas para los doctores
const pagesDoctors = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Casos", link: "/cases" },
  { name: "Pacientes", link: "/pacientes" },
  { name: "Perfil", link: "/profile" },
];

// Ajustes que aparecen al dar click en el logo de usuario, si quieres agregar alguno, pongo aqui
const settings = [
  { name: "Ajustes", link: "/settings", haveModal: false },
  { name: "Cerrar Sesion", link: "/", haveModal: true },
];

function Appbar() {
  const { logoutUser } = useUserStore();
  const { getUser } = useUserStore();
  const { authenticated } = useUserStore();

  useEffect(() => {
    if (!authenticated()) {
      navigate('/')
      return;
    }
    return;
  });

  const nombre = authenticated() ? getUser().nombre : null;
  const apellido = authenticated() ? getUser().apellido : null;
  const user_id = authenticated() ? getUser().member_id : null;
  const rol = authenticated() ? getUser().tipo : null;
  const pages = rol === 'Paciente' ? pagesPatients : pagesDoctors;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [checked, setChecked] = React.useState(false);

  // Para indicar debe aparecer o no el modal
  const [showModal, setshowModal] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
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
        backgroundColor: globalTheme.palette.FSH.main,
        minHeight: "72px",
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
          {/* Icono que se muestra cuando la pantalla esta grande */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img src={Icon} />
          </Box>

          {/* Letra que se muestra cuando la pantalla esta grande */}
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

          {/* Icono del boton que aparece cuando la pantalla esta pequeña */}
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
          </Box>

          {/* Imagen que aparece cuando la pantalla esta pequeña */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img src={Icon} />
          </Box>

          {/* Letra que se muestra cuando la pantalla esta pequeña */}
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

          {/* Links  de las diferentes paginas que aparecen en el navbar */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              height: "34px",
            }}
          >
            {/* Si quieres probar las diferentes opciones que aparecen puedes poder pageDoctors o pagesPatients */}
            {pages.map((page, idx) => (
              <NavLink
                key={idx}
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

          {/* Nombre y Rol de usuario */}
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              alignItem: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Typography variant="h5" fontSize={16} textAlign={"left"}>
                ID: {user_id}
              </Typography>
            </Box>
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
                {nombre} {apellido}
              </Typography>
              <Typography variant="h6" fontSize={14} textAlign={"center"}>
                {rol}
              </Typography>
            </Box>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {/* Opciones que aparecen al dar click en el boton de usuario */}
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
              {settings.map((setting, idx) => (
                <MenuItem key={idx} onClick={handleCloseUserMenu}>
                  {/* <Link to={setting.link} style={{
                    textDecoration:"none",
                    color:"#000000"
                  }}>
                  <Typography textAlign="center">{setting.name}</Typography>
                  </Link> */}
                  <Button
                    variant="text"
                    sx={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                      color: "#000000",
                    }}
                    onClick={() => {
                      {
                        setting.haveModal
                          ? setshowModal(true)
                          : navigate(setting.link);
                      }
                    }}
                  >
                    {setting.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Menu que aparece cuando el ancho de la pantalla es menor y presionan las barras de la esquina */}
      <Collapse
        in={checked}
        sx={{
          bgcolor: globalTheme.palette.secondary.main,
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        {pages.map((page, idx) => (
          <NavLink
            key={idx}
            // onClick={handleCloseNavMenu}
            to={page.link}
            onClick={handleChange}
            style={({ isActive }) => {
              return {
                padding: "10px 10px",
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

      {/* Modal para las alertas */}
      <ModalAlert
        title="Cerrar Sesion"
        description="¿Estas seguro que quieres cerrar sesion?"
        type="warning"
        open={showModal}
        handleClose={() => {
          setshowModal(false);
        }}
        handleOk={() => {
          //Poner Comandos AQUI
          logoutUser();
          navigate("/");
        }}
      />
    </AppBar>
  );
}
export default Appbar;
