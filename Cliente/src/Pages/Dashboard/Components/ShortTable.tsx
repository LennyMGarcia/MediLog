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
// import searchIcon from "/assets/icons/search-md.svg";
// import calendarIcon from "/assets/icons/calendar.svg";

type IPropsDoctor = {
  id: number;
  descripcion: string;
  paciente: string;
  time: string;
  estado: string;
  categoria: number;
};

type IPropsPatient = {
  id: number;
  descripcion: string;
  doctor: string;
  time: string;
  estado: string;
  categoria: number;
};

type IData = IPropsDoctor | IPropsPatient;

interface IArray {
  isDoctor: Boolean;
  data: IData[];
}

export default function ShortTable({ data }: IArray) {
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

  //   const Calendar = () => {
  //     return (
  //       <>
  //         <img src={calendarIcon} />
  //       </>
  //     );
  //   };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        padding: "5px 20px",
        maxHeight: "320px",
      }}
    >
      <Table
        // sx={{ minWidth: 650 }}
        aria-label="simple table"
        sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}
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
              Doctor
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
        <TableBody
          sx={
            {
              // "& > *": {
              //   borderBottom: "none", // elimina la línea divisoria en las celdas
              // },
            }
          }
        >
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
                  padding: "24px 16px",
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
                  padding: "24px 16px",
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
                  padding: "24px 16px",
                }}
              >
                {/* {row.paciente} */}
                boo
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "Arial",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#070708",
                  padding: "24px 16px",
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
                  padding: "24px 16px",
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
                  padding: "24px 16px",
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
