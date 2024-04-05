import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import Cards from "./Components/Cards";
import { PieChart } from "@mui/x-charts";
import ShortTable from "./Components/ShortTable";
import useUserStore from "../../Common/Utils/setUserSession";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { globalTheme } from "../../theme/globalTheme";

function Dashboard() {
  const { getUser } = useUserStore();
  const { authenticated } = useUserStore();
  const { autopopulate } = useUserStore();
  const loading = useUserStore(state => state.loading);

  const nombre = authenticated() ? getUser().nombre : null;
  const apellido = authenticated() ? getUser().apellido : null;
  const rol = authenticated() ? getUser().tipo : null;

  // Este es el estado que debes cambiar para modificar la informacion de las cards y de los graficos,
  // ahora puse 50 como valor inicial pero colocale 0 cuando lo vayas a integrar
  const [casesInfo, setCasesInfo] = useState({
    open: 0,
    closed: 0,
    suspend: 0,
    onProcess: 0,
  });

  useEffect(() => {
    autopopulate().then(result => {
      const casos = result?.casos || [];
      if (casos) {
        //Funcciones que divide que los registros segun el estado
        const casos_abiertos = casos.filter((cases: any) => cases?.estado === 'Activo');
        const casos_cerrados = casos.filter((cases: any) => cases?.estado === 'Inactivo');
        const casos_proceso = casos.filter((cases: any) => cases?.estado === 'Proceso');
        const casos_suspendidos = casos.filter((cases: any) => cases?.estado === 'Suspendido');

        //Funcciones que aumenta la cantidad de casos en base a los casos existentes
        if (casos_abiertos?.length >= 1) {
          setCasesInfo((curr) => {
            return { ...curr, open: casos_abiertos.length };
          })
        }
        if (casos_cerrados?.length >= 1) {
          setCasesInfo((curr) => {
            return { ...curr, closed: casos_cerrados.length };
          })
        }
        if (casos_proceso?.length >= 1) {
          setCasesInfo((curr) => {
            return { ...curr, onProcess: casos_proceso.length };
          })
        }
        if (casos_suspendidos?.length >= 1) {
          setCasesInfo((curr) => {
            return { ...curr, suspend: casos_suspendidos.length };
          })
        }
        return;
      }
    });
    return;
  }, []);

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
            color: globalTheme.font.primary.main,
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
            backgroundColor: globalTheme.palette.background.secondary,
            borderRadius: "8px",
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          {/* Componente del PieChart */}

          {loading ? <CircularProgress /> :
            < PieChart
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
            />}
        </Grid>

        {/* MiniTabla, mi objetivo con esta es que aparezcan los ultimos 5 casos agregados */}
        {loading ? <CircularProgress /> :

          <Grid
            item
            xs={12}
            md={12}
            lg={6.5}
            sx={{
              backgroundColor: globalTheme.palette.background.secondary,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <ShortTable />
          </Grid>}
      </Grid>
    </Grid>

  );
}

export default Dashboard;
