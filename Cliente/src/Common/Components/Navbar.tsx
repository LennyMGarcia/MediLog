import { Button, Grid, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useModalLogin from "../Modals/useModalLogin";
import useUserStore from "../Utils/setUserSession";

export default function Navbar() {
  const { authenticated } = useUserStore();
  const { logoutUser } = useUserStore();

  //Funccion que desloguea a un usuario
  const logout = () => {
    logoutUser();
    navigate("/");
  };
  const navbarLinks = [
    {
      name: "Planes",
      link: "#planes",
    },
    {
      name: "Sobre Nosotros",
      link: "#acercaDe",
    },
    {
      name: "Testimonios",
      link: "#testimonios",
    },
    {
      name: "Preguntas",
      link: "#preguntas",
    },
    {
      name: "Contactarnos",
      link: "#contactarnos",
    },
  ];

  const navigate = useNavigate();

  const { ModalLogin, handleOpenModal } = useModalLogin();

  const location = useLocation();

  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          backgroundColor: "#184E77",
          minHeight: "72px",
        }}
        display={"flex"}
        justifyContent={"space-between"}
        color={"#FFFFFF"}
        flexDirection={"row"}
        padding={"10px 35px"}
      >
        <Grid
          xs={12}
          sm={12}
          md={1}
          item
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "600",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
            // variant="text"
            onClick={() => {
              navigate("/");
            }}
          >
            MediLog
          </Typography>
        </Grid>

        <Grid
          item
          container
          xs={12}
          sm={12}
          md={11}
          lg={8}
          display={"flex"}
          flexDirection={"row"}
          // gap={"24px"}
          alignItems={"center"}
          // marginRight={"15px"}
          justifyContent={"flex-end"}
        >
          {location.pathname == "/" && (
            <Grid
              item
              container
              xs={8}
              sm={12}
              md={8}
              direction="row"
              // display={"flex"}
              gap={1}
              sx={{
                justifyContent: {
                  sm: "space-around",
                  md: "flex-end",
                },
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            >
              {navbarLinks.map((nav, idx) => {
                return (
                  // <Grid item display={"flex"}>
                  <Link
                    href={nav.link}
                    key={idx}
                    style={{
                      color: "#FFFFFF",
                      textDecorationLine: "none",
                      padding: "5px 10px",
                      // width: "20%",
                      // borderRight: "1px solid #958b8b",
                      // borderLeft: "1px solid #958b8b",
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                      // width: "90px",
                    }}
                  >
                    {nav.name}
                  </Link>
                  // </Grid>
                );
              })}
            </Grid>
          )}
          {!authenticated() ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              display={"flex"}
              gap={"10px"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              sx={{
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "flex-end",
                },
              }}
            >
              <Button
                sx={{
                  color: "#FFF",
                  fontSize: "16px",
                }}
                variant="text"
                onClick={() => {
                  handleOpenModal();
                }}
              >
                Iniciar Sesion
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#168AAD",
                }}
                onClick={() => navigate("/register")}
              >
                Registrarte
              </Button>
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              display={"flex"}
              gap={"10px"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              sx={{
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "flex-end",
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#168AAD",
                }}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#168AAD",
                }}
                onClick={() => logout()}
              >
                Desconectar
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <ModalLogin />
    </>
  );
}
