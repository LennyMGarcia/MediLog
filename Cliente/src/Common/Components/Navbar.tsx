import { Box, Button, Grid, Link, Typography } from "@mui/material";

export default function Navbar() {
  const navbarLinks = [
    {
      name: "Planes",
      link: "#planes",
    },
    {
      name: "Testimonios",
      link: "#testimonios",
    },
    // {
    //   name: "Inicio",
    //   link: "#inicio",
    // },

    {
      name: "Contactarnos",
      link: "#contactarnos",
    },
    {
      name: "Acerca de",
      link: "#acercaDe",
    },
  ];

  return (
    <Grid
      container
      xs={12}
      sx={{
        width: "100%",
        backgroundColor: "#184E77",
      }}
      display={"flex"}
      justifyContent={"space-between"}
      color={"#FFFFFF"}
      flexDirection={"row"}
      padding={"10px"}
    >
      <Grid
        xs={3}
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
          }}
        >
          MediLog
        </Typography>
      </Grid>

      <Grid
        item
        container
        xs={6}
        display={"flex"}
        flexDirection={"row"}
        gap={"24px"}
        alignItems={"center"}
        marginRight={"15px"}
        justifyContent={"space-between"}
      >
        <Grid item container xs={6} direction="row" display={"flex"} gap={1}>
          {navbarLinks.map((nav, idx) => {
            return (
              // <Grid item display={"flex"}>
              <Link
                href={nav.link}
                key={idx}
                style={{
                  color: "#FFFFFF",
                  textDecorationLine: "none",
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

        <Grid item xs={5} display={"flex"} gap={"10px"} alignItems={"center"}>
          <Link
            sx={{
              textDecorationLine: "none",
            }}
          >
            Iniciar Sesion
          </Link>
          <Button variant="contained">Registrarte</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
