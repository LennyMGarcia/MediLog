import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import TablaCasos from "./TablaCasos";
import TablaCasosTerceros from "./TablaCasosTerceros";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Este es una funcion de material ui
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, width: "100%" }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

// Este es una funcion de material ui
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    sx: {
      textTransform: "Capitalize",
      fontFamily: "Arial",
      fontSize: "14px",
      fontWeight: "400",
      color: "#939497",
    },
  };
}

export default function TabsTable({ type }: any) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* Tabs con las diferetnes opciones de tabla */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .Mui-selected": { color: "#111113 !important" },
            padding: "8px 24px 0px 24px",
          }}
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#111113",
            },
          }}
        >
          <Tab label="Todos" {...a11yProps(0)} />
          <Tab label="Casos Abiertos" {...a11yProps(1)} />
          <Tab label="Casos en Proceso" {...a11yProps(2)} />
          <Tab label="Casos Cerrados" {...a11yProps(3)} />
          <Tab label="Casos Suspendidos" {...a11yProps(4)} />
        </Tabs>
      </Box>

      {/* Aqui las tablas dependiendo la tab seleccionada */}
      <CustomTabPanel value={value} index={0}>
        {type === 'CasosTerceros' ? <TablaCasosTerceros type="all" /> :
          <TablaCasos type="all" />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {type === 'CasosTerceros' ? <TablaCasosTerceros type="Activo" /> :
          <TablaCasos type="Activo" />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {type === 'CasosTerceros' ? <TablaCasosTerceros type="Proceso" /> :
          <TablaCasos type="Proceso" />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {type === 'CasosTerceros' ? <TablaCasosTerceros type="Inactivo" /> :
          <TablaCasos type="Inactivo" />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        {type === 'CasosTerceros' ? <TablaCasosTerceros type="Suspendido" /> :
          <TablaCasos type="Suspendido" />}
      </CustomTabPanel>
    </Box>
  );
}
