// OrderTable
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Chip, TablePagination } from "@mui/material";
import { useMemo, useState } from "react";

type IPropsData = {
  id: number;
  descripcion: string;
  person: string;
  time: string;
  estado: string;
  categoria: number;
};

export default function ShortTable() {
  // Este campo de son los datos de casos, dependiendo si es un doctor o un paciente
  const data: IPropsData[] = [
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

  // Esto es para que la data que entra, solo se tomen 5
  const rows = data.slice(0, 5);

  const badgetStatus: Record<string, any> = {
    close: {
      name: "Cerrados",
      color: "#8EBF43",
    },
    open: {
      name: "En proceso",
      color: "#28AAE1",
    },
    pending: {
      name: "Pendiente",
      color: "#E5D540",
    },
    suspend: {
      name: "Cancelada",
      color: "#E30000",
    },
  };

  // Esta variable debe cambiar en base a si es un especialista o un paciente, asi los campos de la tabla cambian
  const isDoctor = true;

  // Esto es para las medallas de estado
  const Badge = ({ bg, tipo }: { bg: string; tipo: string }) => {
    return (
      <Chip
        sx={{
          //   marginLeft: "8px",
          height: "24px",
          width: "95px",
          color: "#FFFFFF",
          borderRadius: "6px",
          backgroundColor: bg,
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "pre",
            fontFamily: "Arial",
            fontSize: "12px",
            fontWeight: "700",
          },
        }}
        label={tipo}
      />
    );
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        padding: "5px 20px",
        // maxHeight: "363px",
      }}
    >
      <Table
        aria-label="simple table"
        sx={{
          borderCollapse: "separate",
          borderSpacing: "0 8px",
          // height: "100%",
        }}
      >
        <TableHead
          sx={{
            backgroundColor: "#F4F4F5",
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "14px",
                color: "#939497",
              }}
            >
              No. de Caso
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "14px",
                color: "#939497",
              }}
              align="left"
            >
              Caso
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "14px",
                color: "#939497",
              }}
              align="left"
            >
              {isDoctor ? "Doctor" : "Paciente"}
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "14px",
                color: "#939497",
              }}
              align="left"
            >
              Fecha
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "14px",
                color: "#939497",
              }}
              align="left"
            >
              Estatus
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Arial",
                fontWeight: "700",
                fontSize: "14px",
                color: "#939497",
              }}
              align="left"
            >
              Categoria
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Map para mostrar las diferetes filas en base de los datos del array */}
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                borderRadius: "8px",
                "& > *": { borderBottom: "none" },
                ".css-1qanp6x-MuiTableCell-root": {
                  borderBottom: "none",
                },

                //Esto es una funcion para saber si esta orden fue creada dentro de las 12horas para que sea considerada como "nueva"
                // backgroundColor: In12Hour(row.time) ? "#F4F9EC" : "none",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontFamily: "Arial",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#070708",
                  // padding: "24px 16px",
                  padding: "5px 16px",
                }}
              >
                {row.id}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "Arial",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#070708",
                  // padding: "24px 16px",
                  padding: "5px 16px",
                }}
              >
                {row.descripcion}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "Arial",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#070708",
                  // padding: "24px 16px",
                  padding: "5px 16px",
                }}
              >
                {row.person}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "Arial",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#070708",
                  // padding: "24px 16px",
                  padding: "5px 16px",
                }}
              >
                {row.time}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "Arial",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#070708",
                  // padding: "24px 16px",
                  padding: "5px 16px",
                }}
              >
                <Badge
                  bg={badgetStatus[row.estado].color}
                  tipo={badgetStatus[row.estado].name}
                />
                {/* {row.status} */}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "Arial",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#070708",
                  // padding: "24px 16px",
                  padding: "5px 16px",
                }}
              >
                {row.categoria}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
