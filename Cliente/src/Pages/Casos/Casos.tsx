import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import TablaCasos from "./Components/TablaCasos";
import TabsTable from "./Components/TabsTable";

export default function Casos() {
  return (
    <Grid
      container
      padding={"30px 24px"}
      gap={4}
      direction={"column"}
      sx={{
        height: "100%",
      }}
    >
      <Grid item container xs={12} justifyContent={"space-between"}>
        <Grid item xs={1}>
          <Typography variant="h5" fontSize={40}>
            Casos
          </Typography>
        </Grid>

        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#168AAD",
            }}
          >
            Crear caso
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 12px 24px -4px #919EAB1F",
          width: "100%",
        }}
      >
        {/* Componente de tablas y tabs */}
        <TabsTable />
      </Grid>
    </Grid>
  );
}
