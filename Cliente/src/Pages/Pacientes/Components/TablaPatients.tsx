import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  TablePagination,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Person2, Search } from "@mui/icons-material";

type IProps = {
  idPatient: number;
  name: string;
  lastname: string;
  sex: "M" | "F";
  email: string;
  phone: string;
};

export default function TablaPatients() {
  // const data = ["1", "2"];
  const pacientes: IProps[] = [
    {
      idPatient: 1,
      name: "Juan",
      lastname: "Pérez",
      sex: "M",
      email: "juan@example.com",
      phone: "123-456-7890",
    },
    {
      idPatient: 2,
      name: "María",
      lastname: "García",
      sex: "F",
      email: "maria@example.com",
      phone: "987-654-3210",
    },
    {
      idPatient: 3,
      name: "Luis",
      lastname: "Rodríguez",
      sex: "M",
      email: "luis@example.com",
      phone: "555-555-5555",
    },
    {
      idPatient: 4,
      name: "Ana",
      lastname: "Martínez",
      sex: "F",
      email: "ana@example.com",
      phone: "111-222-3333",
    },
    {
      idPatient: 5,
      name: "Pedro",
      lastname: "Sánchez",
      sex: "M",
      email: "pedro@example.com",
      phone: "444-555-6666",
    },
    {
      idPatient: 6,
      name: "Laura",
      lastname: "López",
      sex: "F",
      email: "laura@example.com",
      phone: "777-888-9999",
    },
    {
      idPatient: 7,
      name: "Carlos",
      lastname: "Hernández",
      sex: "M",
      email: "carlos@example.com",
      phone: "999-888-7777",
    },
    {
      idPatient: 8,
      name: "Sofía",
      lastname: "Díaz",
      sex: "F",
      email: "sofia@example.com",
      phone: "333-222-1111",
    },
    {
      idPatient: 9,
      name: "Javier",
      lastname: "Gutiérrez",
      sex: "M",
      email: "javier@example.com",
      phone: "666-777-8888",
    },
    {
      idPatient: 10,
      name: "Elena",
      lastname: "Fernández",
      sex: "F",
      email: "elena@example.com",
      phone: "222-333-4444",
    },
    {
      idPatient: 11,
      name: "Diego",
      lastname: "Moreno",
      sex: "M",
      email: "diego@example.com",
      phone: "555-444-3333",
    },
    {
      idPatient: 12,
      name: "Lucía",
      lastname: "Torres",
      sex: "F",
      email: "lucia@example.com",
      phone: "888-999-0000",
    },
    {
      idPatient: 13,
      name: "Miguel",
      lastname: "Ruiz",
      sex: "M",
      email: "miguel@example.com",
      phone: "111-000-9999",
    },
    {
      idPatient: 14,
      name: "Paula",
      lastname: "Santos",
      sex: "F",
      email: "paula@example.com",
      phone: "666-333-9999",
    },
    {
      idPatient: 15,
      name: "Gabriel",
      lastname: "Castro",
      sex: "M",
      email: "gabriel@example.com",
      phone: "777-555-3333",
    },
    {
      idPatient: 16,
      name: "Alejandra",
      lastname: "Ortega",
      sex: "F",
      email: "alejandra@example.com",
      phone: "222-777-8888",
    },
    {
      idPatient: 17,
      name: "Mario",
      lastname: "Flores",
      sex: "M",
      email: "mario@example.com",
      phone: "999-333-4444",
    },
    {
      idPatient: 18,
      name: "Isabel",
      lastname: "Vega",
      sex: "F",
      email: "isabel@example.com",
      phone: "111-777-5555",
    },
    {
      idPatient: 19,
      name: "Francisco",
      lastname: "Jiménez",
      sex: "M",
      email: "francisco@example.com",
      phone: "888-444-2222",
    },
    {
      idPatient: 20,
      name: "Carmen",
      lastname: "Molina",
      sex: "F",
      email: "carmen@example.com",
      phone: "333-999-6666",
    },
    {
      idPatient: 21,
      name: "Manuel",
      lastname: "Ramírez",
      sex: "M",
      email: "manuel@example.com",
      phone: "777-888-9999",
    },
    {
      idPatient: 22,
      name: "Raquel",
      lastname: "Soto",
      sex: "F",
      email: "raquel@example.com",
      phone: "111-222-3333",
    },
    {
      idPatient: 23,
      name: "Ricardo",
      lastname: "Blanco",
      sex: "M",
      email: "ricardo@example.com",
      phone: "444-555-6666",
    },
    {
      idPatient: 24,
      name: "Sara",
      lastname: "Herrera",
      sex: "F",
      email: "sara@example.com",
      phone: "999-888-7777",
    },
    {
      idPatient: 25,
      name: "Daniel",
      lastname: "Navarro",
      sex: "M",
      email: "daniel@example.com",
      phone: "333-222-1111",
    },
    {
      idPatient: 26,
      name: "Natalia",
      lastname: "Gómez",
      sex: "F",
      email: "natalia@example.com",
      phone: "666-777-8888",
    },
    {
      idPatient: 27,
      name: "Roberto",
      lastname: "Cruz",
      sex: "M",
      email: "roberto@example.com",
      phone: "222-333-4444",
    },
    {
      idPatient: 28,
      name: "Cristina",
      lastname: "Mendoza",
      sex: "F",
      email: "cristina@example.com",
      phone: "555-444-3333",
    },
    {
      idPatient: 29,
      name: "Juan",
      lastname: "Garrido",
      sex: "M",
      email: "juang@example.com",
      phone: "888-999-0000",
    },
    {
      idPatient: 30,
      name: "Marina",
      lastname: "Alonso",
      sex: "F",
      email: "marina@example.com",
      phone: "111-000-9999",
    },
    {
      idPatient: 31,
      name: "Héctor",
      lastname: "Ortiz",
      sex: "M",
      email: "hector@example.com",
      phone: "666-333-9999",
    },
    {
      idPatient: 32,
      name: "Rosa",
      lastname: "García",
      sex: "F",
      email: "rosa@example.com",
      phone: "777-555-3333",
    },
    {
      idPatient: 33,
      name: "Jorge",
      lastname: "Martínez",
      sex: "M",
      email: "jorgem@example.com",
      phone: "222-777-8888",
    },
    {
      idPatient: 34,
      name: "María",
      lastname: "Gómez",
      sex: "F",
      email: "mariag@example.com",
      phone: "999-333-4444",
    },
    {
      idPatient: 35,
      name: "Pedro",
      lastname: "Sanz",
      sex: "M",
      email: "pedros@example.com",
      phone: "111-777-5555",
    },
    {
      idPatient: 36,
      name: "Carmen",
      lastname: "Vidal",
      sex: "F",
      email: "carmenv@example.com",
      phone: "888-444-2222",
    },
    {
      idPatient: 37,
      name: "Alberto",
      lastname: "Romero",
      sex: "M",
      email: "alberto@example.com",
      phone: "333-999-6666",
    },
    {
      idPatient: 38,
      name: "Eva",
      lastname: "Fernández",
      sex: "F",
      email: "eva@example.com",
      phone: "777-888-9999",
    },
    {
      idPatient: 39,
      name: "Carlos",
      lastname: "López",
      sex: "M",
      email: "carlosl@example.com",
      phone: "111-222-3333",
    },
    {
      idPatient: 40,
      name: "Ana",
      lastname: "Martín",
      sex: "F",
      email: "anam@example.com",
      phone: "444-555-6666",
    },
    {
      idPatient: 41,
      name: "Pablo",
      lastname: "Gutiérrez",
      sex: "M",
      email: "pablog@example.com",
      phone: "999-888-7777",
    },
    {
      idPatient: 42,
      name: "Sandra",
      lastname: "Sánchez",
      sex: "F",
      email: "sandras@example.com",
      phone: "333-222-1111",
    },
    {
      idPatient: 43,
      name: "Martín",
      lastname: "López",
      sex: "M",
      email: "martinl@example.com",
      phone: "666-777-8888",
    },
    {
      idPatient: 44,
      name: "María",
      lastname: "Hernández",
      sex: "F",
      email: "mariah@example.com",
      phone: "222-333-4444",
    },
    {
      idPatient: 45,
      name: "Antonio",
      lastname: "Díaz",
      sex: "M",
      email: "antoniod@example.com",
      phone: "555-444-3333",
    },
    {
      idPatient: 46,
      name: "Laura",
      lastname: "Vázquez",
      sex: "F",
      email: "laurav@example.com",
      phone: "888-999-0000",
    },
    {
      idPatient: 47,
      name: "David",
      lastname: "García",
      sex: "M",
      email: "davidg@example.com",
      phone: "111-000-9999",
    },
    {
      idPatient: 48,
      name: "Cristina",
      lastname: "Sanz",
      sex: "F",
      email: "cristinas@example.com",
      phone: "666-333-9999",
    },
    {
      idPatient: 49,
      name: "Manuel",
      lastname: "Pérez",
      sex: "M",
      email: "manuelp@example.com",
      phone: "777-555-3333",
    },
    {
      idPatient: 50,
      name: "Lucía",
      lastname: "Hernández",
      sex: "F",
      email: "luciah@example.com",
      phone: "222-777-8888",
    },
  ];

  const isDoctor = true;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsTotal, setRowsTotal] = useState(pacientes.length);
  const [openInputSearch, setOpenInputSearch] = useState("");
  const [dateStart, setDateStart] = useState<string | null>();
  // dayjs().format("DD/MM/YYYY")
  const [dateEnd, setDateEnd] = useState<string | null>();
  // dayjs().format("DD/MM/YYYY")

  const rows = pacientes;

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const badgetStatus: Record<string, any> = {
  //   close: {
  //     name: "Cerrados",
  //     color: "#8EBF43",
  //   },
  //   open: {
  //     name: "Abierto",
  //     color: "#28AAE1",
  //   },
  //   pending: {
  //     name: "Suspendido",
  //     color: "#E30000",
  //   },
  //   process: {
  //     name: "En Proceso",
  //     color: "#E5D540",
  //   },
  // };

  // const Badge = ({ bg, tipo }: { bg: string; tipo: string }) => {
  //   return (
  //     <Chip
  //       sx={{
  //         //   marginLeft: "8px",
  //         height: "24px",
  //         width: "93px",
  //         color: "#FFFFFF",
  //         borderRadius: "6px",
  //         backgroundColor: bg,
  //         "& .MuiChip-label": {
  //           display: "block",
  //           whiteSpace: "pre",
  //           fontFamily: "Arial",
  //           fontSize: "12px",
  //           fontWeight: "700",
  //           lineHeight: "20px",
  //         },
  //       }}
  //       label={tipo}
  //     />
  //   );
  // };

  function stableSort(array: any[]) {
    const stabilized = array;

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

    setRowsTotal(stabilized.length);
    return stabilized;
  }

  const visibleRows = useMemo(
    () =>
      stableSort(rows).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, openInputSearch, dateStart, dateEnd]
  );

  return (
    <>
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
                  No. de Paciente
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
                  names
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
                  lastnames
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
                  Genero
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
                  email
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
                  Numero de contacto
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
                  Accion
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
                    {row.idPatient}
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
                    {row.name}
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
                    {row.lastname}
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
                    {row.sex}
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
                    {row.email}
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
                    {row.phone}
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
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#168AAD",
                      }}
                      startIcon={<Person2 />}
                    >
                      Ver Perfil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
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
      />
    </>
  );
}
