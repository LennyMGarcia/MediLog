import { Box, Grid, Link, Typography } from "@mui/material";

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
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          // height: "100%",
          flexDirection: "row",
          // backgroundColor: "var(--secciones-pagina.#184E77)",
          backgroundColor: "#184E77",
          justifyContent: "space-between",
          color: "#FFFFFF",
          padding: "10px",
        }}
      >
        <Grid>
          <Box
            sx={{
              display: "flex",
              // height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
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
          </Box>
        </Grid>

        <Grid>
          <Box
            sx={{
              display: "flex",
              // width: "100%",
              flexDirection: "row",
              gap: "24px",
              alignItems: "center",
              // padding: "16px",
              height: "100%",
              marginRight: "15px",
            }}
          >
            {navbarLinks.map((nav, idx) => {
              return (
                <Link
                  href={nav.link}
                  key={idx}
                  style={{
                    color: "#FFFFFF",
                    textDecorationLine: "none",
                    // width: "20%",
                    borderRight: "1px solid #958b8b",
                    borderLeft: "1px solid #958b8b",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {nav.name}
                </Link>
              );
            })}
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}
