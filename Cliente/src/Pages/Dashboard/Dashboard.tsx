import { Box, Grid, Typography } from "@mui/material";
import Cards from "./Components/Cards";
import { PieChart } from "@mui/x-charts";
import ShortTable from "./Components/ShortTable";
import useUserStore from "../../Common/Utils/setUserSession";
import getBackendConnectionString from "../../Common/Utils/getBackendString";
import axios from "axios";

function Dashboard() {
  const { getUser } = useUserStore();
  const { authenticated } = useUserStore();

  const nombre = authenticated() ? getUser().nombre : null;
  const apellido = authenticated() ? getUser().apellido : null;
  const rol = authenticated() ? getUser().tipo : null;

  const data = [
    {
      id: 1,
      descripcion: "Consulta de rutina",
      person: "Juan Pérez",
      time: "2024-03-11T09:00:00",
      estado: "open",
      categoria: 2,
    },
    {
      id: 2,
      descripcion: "Examen de sangre",
      person: "María Rodríguez",
      time: "2024-03-12T10:30:00",
      estado: "close",
      categoria: 1,
    },
    {
      id: 3,
      descripcion: "Consulta de seguimiento",
      person: "Luis García",
      time: "2024-03-13T11:15:00",
      estado: "pending",
      categoria: 3,
    },
    {
      id: 4,
      descripcion: "Revisión de presión arterial",
      person: "Ana Martínez",
      time: "2024-03-14T15:45:00",
      estado: "suspend",
      categoria: 2,
    },
    {
      id: 5,
      descripcion: "Vacunación contra la gripe",
      person: "Carlos Sánchez",
      time: "2024-03-15T08:20:00",
      estado: "open",
      categoria: 1,
    },
  ];

  return (
    <Grid
      container
      // padding={"30px 24px"}
      padding={"10px 24px"}
      // rowSpacing={2}
      gap={4}
      // spacing={2}
      direction={"column"}
      sx={{
        height: "100%",
      }}
    >
      <Grid item xs={12} lg={12}>
        {/* <Typography variant="h6">Resumen</Typography> */}

        <Typography
          sx={{
            fontFamily: "Arial",
            fontWeight: "700",
            fontSize: "24px",
            color: "#070708",
          }}
        >
          Bienvenido, {nombre} {apellido}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Arial",
            fontWeight: "400",
            fontSize: "20px",
            color: "#939497",
          }}
        >
          12 de enero del 2024
        </Typography>
      </Grid>

      <Grid
        item
        container
        xs={12}
        lg={12}
        gap={1}
        justifyContent={"space-between"}
        wrap="wrap"
      >
        <Grid item xs={12} sm={5.9} lg={2.9}>
          <Cards type="open" number={50} />
        </Grid>
        <Grid item xs={12} sm={5.9} lg={2.9}>
          <Cards type="close" number={50} />
        </Grid>
        <Grid item xs={12} sm={5.9} lg={2.9}>
          <Cards type="suspend" number={50} />
        </Grid>
        {/* <Grid item xs={2.4}>
            <Cards type="delete" number={50} />
          </Grid> */}
        <Grid item xs={12} sm={5.9} lg={2.9}>
          <Cards type="onProcess" number={50} />
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        lg={12}
        gap={3}
        sx={
          {
            // height: "100%",
            // maxHeight: "100px",
          }
        }
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={5.2}
          // justifyContent={"center"}
          alignItems={"center"}
          padding={"30px 0px"}
          sx={{
            backgroundColor: "#FFFFFF",

            // padding: "24px",
            borderRadius: "8px",
            // padding: "70px 0px",
            // width: "100%",
            display: "flex",
            // height: "110px",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          <PieChart
            labelPosition="bottom"
            series={[
              {
                data: [
                  { id: 0, value: 50, label: "Casos Abiertos" },
                  { id: 1, value: 50, label: "Casos Cerrados" },
                  { id: 2, value: 50, label: "Casos Suspendidos" },
                  { id: 3, value: 50, label: "Casos Eliminados" },
                  { id: 4, value: 50, label: "Casos En Proceso" },
                ],
              },
            ]}
            width={600}
            height={350}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={6.5}
          // xs={7}
          sx={{
            backgroundColor: "#FFFFFF",
            // padding: "24px",
            // gap: "24px",
            borderRadius: "8px",
            // width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ShortTable isDoctor={true} data={data} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
