import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Chip,
  InputAdornment,
  TablePagination,
  TextField,
  LinearProgress,
  Button
} from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Search } from "@mui/icons-material";
import CaseTableMenu from "./ConsultationMenu";
import ConsultationMenu from "./ConsultationMenu";
import useUserStore from "../../../../Common/Utils/setUserSession";
import { useNavigate } from "react-router-dom";
import { searchRecordsFromArray } from "../../../Casos/Casos";

type IPropsData = {
  id: number;
  descripcion: string;
  person: string;
  time: string;
  estado: string;
  categoria: number;
};

interface IArray {
  isDoctor: Boolean;
  // data: IPropsDoctor[] | IPropsPatient[];
  data: IPropsData[];
}

interface IProps {
  type: "all" | "open" | "close" | "process" | "pending";
  dataObject: { //Aqui es como se pasan el objeto de specificCase
    id: number,
    motivo: string,
    especialista: string,
    fecha: string | Date | Dayjs,
    categoria: string,
  }[]
}


export default function SurgeryTable({ type, dataObject }: IProps) {
  const loading = useUserStore(state => state.loading);
  const navigate = useNavigate();

  //Funccion que redirige si registro no existe
  if (!dataObject) {
    navigate('/cases');
  }
  const data = dataObject

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsTotal, setRowsTotal] = useState(data.length);
  const [openInputSearch, setOpenInputSearch] = useState("");
  const [dateStart, setDateStart] = useState<string | null>();
  // dayjs().format("DD/MM/YYYY")
  const [dateEnd, setDateEnd] = useState<string | null>();
  // dayjs().format("DD/MM/YYYY")

  const [rows, setRows] = useState<any[]>(data);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort(array: any[]) {
    const stabilized = array;

    setRowsTotal(stabilized.length);
    return stabilized;
  }

  const visibleRows = useMemo(
    () =>
      stableSort(rows).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, openInputSearch, dateStart, dateEnd, rows]
  );

  const search_patient = (search: string) => {
    if (!search) return;
    const payload: any[] = searchRecordsFromArray(dataObject, search, 'motivo', 'especialista', undefined, 'categoria');
    setRows(payload);
    return;
  }

  return (
    <>
      {loading ? <LinearProgress /> :

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
            paddding: "0px 24px",
          }}
        >
          <Box
            sx={{
              padding: "24px",
              // width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <Box></Box> */}
            <TextField
              label="Buscar"
              variant="outlined"
              sx={{
                fieldset: {
                  borderRadius: "8px",
                  borderColor: "#CDCECF",
                },
                fontFamily: "Arial",
                fontWeight: "400",
                fontSize: "14px",
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
                    // outline: "solid",
                    // outlineColor: "#DEDEDF",
                  },
                  "&:hover": {
                    // outline: "solid",
                    // outlineColor: "#DEDEDF",
                    "& fieldset": {
                      border: "solid 1px #111113",
                    },
                  },
                  "&:focus": {
                    // outline: "solid",
                    // outlineColor: "#DEDEDF",
                    "& fieldset": {
                      border: "solid 1px #111113",
                    },
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#CDCECF", // Color del borde cuando está enfocado
                    border: "solid 1px #111113",
                    // outline: "solid",
                    // outlineColor: "#DEDEDF",
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
              onChange={(e) => {
                setOpenInputSearch(e.target.value);
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#168AAD",
              }}
              onClick={() => {
                search_patient(openInputSearch);
              }}
            >
              Buscar Cirugia
            </Button>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de inicio"
                  sx={{
                    label: {
                      marginTop: "3px",
                      fontFamily: "Arial",
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#68696B",
                    },
                    fieldset: {
                      borderRadius: "8px",
                      borderColor: "#CDCECF",
                    },
                    ".css-1on77vi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#CDCECF",
                    },
                    ".css-m524gb-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                    {
                      color: "#68696B",
                    },
                  }}
                  format="DD/MM/YYYY"
                  onChange={(newValue: any) => {
                    setDateStart(dayjs(newValue).format("DD/MM/YYYY"));
                  }}
                  disableFuture
                  slotProps={{
                    day: {
                      sx: {
                        "&.Mui-selected": {
                          backgroundColor: "#8EBF43 !important",
                        },
                      },
                    },
                    textField: {
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#CDCECF", // Color del borde
                            // outline: "solid",
                            // outlineColor: "#DEDEDF",
                          },
                          "&:hover": {
                            // outline: "solid",
                            // outlineColor: "#DEDEDF",
                            "& fieldset": {
                              border: "solid 1px #111113",
                            },
                          },
                          "&:focus": {
                            // outline: "solid",
                            // outlineColor: "#DEDEDF",
                            "& fieldset": {
                              border: "solid 1px #111113",
                            },
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#CDCECF", // Color del borde cuando está enfocado
                            border: "solid 1px #111113",
                            // outline: "solid",
                            // outlineColor: "#DEDEDF",
                          },
                          "& legend span": {
                            paddingLeft: "0px",
                            paddingRight: "8px",
                          },
                          "& legend": {
                            paddingInlineStar: "0px",
                            paddingInlineEnd: "0px",
                          },
                        },
                        label: {
                          "&.Mui-focused": {
                            color: "#68696B",
                          },
                        },
                      },
                    },
                  }}
                  disableHighlightToday
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha final"
                  format="DD/MM/YYYY"
                  sx={{
                    label: {
                      marginTop: "3px",
                      fontFamily: "Arial",
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#68696B",
                    },

                    fieldset: {
                      borderRadius: "8px",
                      borderColor: "#CDCECF",
                    },
                    ".css-1on77vi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#CDCECF",
                    },
                    ".css-m524gb-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                    {
                      color: "#68696B",
                    },
                  }}
                  disableFuture
                  onChange={(newValue: any) => {
                    console.log(newValue);
                    setDateEnd(dayjs(newValue).format("DD/MM/YYYY"));
                  }}
                  slotProps={{
                    day: {
                      sx: {
                        "&.Mui-selected": {
                          backgroundColor: "#8EBF43 !important",
                        },
                      },
                    },
                    textField: {
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#CDCECF", // Color del borde
                            // outline: "solid",
                            // outlineColor: "#DEDEDF",
                          },
                          "&:hover": {
                            // outline: "solid",
                            // outlineColor: "#DEDEDF",
                            "& fieldset": {
                              border: "solid 1px #111113",
                            },
                          },
                          "&:focus": {
                            // outline: "solid",
                            // outlineColor: "#DEDEDF",
                            "& fieldset": {
                              border: "solid 1px #111113",
                            },
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#CDCECF", // Color del borde cuando está enfocado
                            border: "solid 1px #111113",
                            // outline: "solid",
                            // outlineColor: "#DEDEDF",
                          },
                          "& legend span": {
                            paddingLeft: "0px",
                            paddingRight: "8px",
                          },
                          "& legend": {
                            paddingInlineStar: "0px",
                            paddingInlineEnd: "0px",
                          },
                        },
                        label: {
                          "&.Mui-focused": {
                            color: "#68696B",
                          },
                        },
                      },
                    },
                  }}
                  disableHighlightToday
                />
              </LocalizationProvider>
            </Box>
          </Box>

          <Box
            sx={{
              padding: "0px 24px",
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
                    # de consulta
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
                    Motivo
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
                    categoria
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
                    Acciones
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
                {visibleRows.map((row) => (
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
                      {row.motivo}
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
                      {row.especialista}
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
                      {row.fecha}
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
                      <ConsultationMenu id={row?.id} ruta='surgery' />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>}

      {!loading &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={rowsTotal}
          // count={visibleRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Filas por página:"}
          sx={{
            typography: {
              color: "#070708",
              lineHeight: "22px",
              fontWeight: "400",
              fontSize: "14px",
            },
          }}
        />}
    </>
  );
}

/* const badgetStatus: Record<string, any> = {
     close: {
       name: "Cerrados",
       color: "#8EBF43",
     },
     open: {
       name: "Abierto",
       color: "#28AAE1",
     },
     pending: {
       name: "Suspendido",
       color: "#E30000",
     },
     process: {
       name: "En Proceso",
       color: "#E5D540",
     },
   };
 */

/*type IPropsDoctor = {
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
};*/
// if (dateStart)
//   stabilized = stabilized.filter((a) => {
//     const start = new Date(a.date);
//     const startState = new Date(dateStart);

//     // console.log(a.date);
//     // console.log(dateStart);
//     console.log(dayjs(start).isAfter(dayjs(startState)));
//     return dayjs(a.date).isAfter(dateStart);
//   });

// if (dateEnd)
//   stabilized = stabilized.filter((a) => {
//     return dayjs(a.date).isBefore(dateEnd);
//   });

// if (dateEnd)
//   stabilized = stabilized.filter((a) => {
//     a.date <= dateEnd;
//   });

// if (openInputSearch)
//   stabilized = stabilized.filter((item) => {
//     // item.numberOrder == openInputSearch;

//     return normalizeString(item.nameClient)
//       .toLowerCase()
//       .includes(openInputSearch.toLowerCase());
//   });
