import { Box, Grid, Typography } from "@mui/material";
import Cards from "./Components/Cards";
import { PieChart } from "@mui/x-charts";
import ShortTable from "./Components/ShortTable";
import useUserStore from "../../Common/Utils/setUserSession";
import getBackendConnectionString from "../../Common/Utils/getBackendString";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";

function Dashboard() {
  const { getUser } = useUserStore();
  const { authenticated } = useUserStore();

  const nombre = authenticated() ? getUser().nombre : null;
  const apellido = authenticated() ? getUser().apellido : null;
  const rol = authenticated() ? getUser().tipo : null;

  // Este es el estado que debes cambiar para modificar la informacion de las cards y de los graficos,
  // ahora puse 50 como valor inicial pero colocale 0 cuando lo vayas a integrar
  const [casesInfo, setCasesInfo] = useState({
    open: 50,
    closed: 50,
    suspend: 50,
    onProcess: 50,
  });

  // Mock

  return (
    <Grid
      container
      padding={"10px 24px"}
      gap={4}
      direction={"column"}
      sx={{
        height: "100%",
      }}
    >
      {/* Titulo e fecha */}
      <Grid item xs={12} lg={12}>
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
          {dayjs().format("D [de] MMMM [del] YYYY'")}
          {/* 12 de enero del 2024 */}
        </Typography>
      </Grid>

      {/* Tarjetas */}
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
          <Cards type="open" number={casesInfo.open} />
        </Grid>
        <Grid item xs={12} sm={5.9} lg={2.9}>
          <Cards type="close" number={casesInfo.closed} />
        </Grid>
        <Grid item xs={12} sm={5.9} lg={2.9}>
          <Cards type="suspend" number={casesInfo.suspend} />
        </Grid>

        <Grid item xs={12} sm={5.9} lg={2.9}>
          <Cards type="onProcess" number={casesInfo.onProcess} />
        </Grid>
      </Grid>

      {/* Grafico de Pie */}
      <Grid item container xs={12} lg={12} gap={3}>
        <Grid
          item
          xs={12}
          md={12}
          lg={5.2}
          alignItems={"center"}
          padding={"30px 0px"}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          {/* Componente del PieChart */}
          <PieChart
            labelPosition="bottom"
            series={[
              {
                data: [
                  { id: 0, value: casesInfo.open, label: "Casos Abiertos" },
                  { id: 1, value: casesInfo.closed, label: "Casos Cerrados" },
                  {
                    id: 2,
                    value: casesInfo.suspend,
                    label: "Casos Suspendidos",
                  },
                  {
                    id: 3,
                    value: casesInfo.onProcess,
                    label: "Casos En Proceso",
                  },
                ],
              },
            ]}
            width={600}
            height={350}
          />
        </Grid>

        {/* MiniTabla, mi objetivo con esta es que aparezcan los ultimos 5 casos agregados */}
        <Grid
          item
          xs={12}
          md={12}
          lg={6.5}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ShortTable />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
