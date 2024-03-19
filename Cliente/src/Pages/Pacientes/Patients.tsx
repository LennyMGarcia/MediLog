import { Grid, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import TablaPatients from "./Components/TablaPatients";

export default function Patients() {
  const [openInputSearch, setOpenInputSearch] = useState("");

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
            Pacientes
          </Typography>
        </Grid>

        <Grid
          item
          xs={5}
          gap={1}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <TextField
            placeholder="Introduzca el Id"
            variant="outlined"
            sx={{
              fieldset: {
                borderRadius: "8px",
                borderColor: "#CDCECF",
              },
              backgroundColor: "#FFFFFF",

              fontFamily: "Arial",
              fontWeight: "400",
              fontSize: "18px",
              width: "300px",
              ".css-1oplba7-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#CDCECF",
                },
              ".css-m524gb-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                color: "#68696B",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#CDCECF", // Color del borde
                },
                "&:hover": {
                  "& fieldset": {
                    border: "solid 1px #111113",
                  },
                },
                "&:focus": {
                  "& fieldset": {
                    border: "solid 1px #111113",
                  },
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#CDCECF", // Color del borde cuando está enfocado
                  border: "solid 1px #111113",
                },
                "& legend span": {
                  paddingLeft: "0px",
                  paddingRight: "4px",
                },
                "& legend": {
                  paddingInlineStar: "0px",
                  paddingInlineEnd: "0px",
                },
              },
            }}
            value={openInputSearch}
            InputProps={{
              startAdornment: <Search />,
            }}
            InputLabelProps={{
              shrink: !!openInputSearch,
              margin: "dense",
              style: {
                paddingLeft: openInputSearch ? "0px" : "25px",
                color: "#68696B",
                fontFamily: "Arial",
                fontWeight: "400",
                fontSize: "14px",
                marginTop: "3px",
              },
            }}
            onChange={(e: any) => {
              setOpenInputSearch(e.target.value);
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#168AAD",
            }}
          >
            Buscar paciente
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          borderRadius: "25px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 12px 24px -4px #919EAB1F",
          width: "100%",
        }}
      >
        <TablaPatients />
      </Grid>
    </Grid>
  );
}
