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
  LinearProgress
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Person2, Search } from "@mui/icons-material";
//import pacientes from '../../../Common/Mocks/listaPaciente.json'
import useUserStore from "../../../Common/Utils/setUserSession";
import { useNavigate } from "react-router-dom";
import { searchRecordsFromArray } from "../../Casos/Casos";

type IProps = {
  idPatient: number;
  name: string;
  lastname: string;
  sex: "M" | "F";
  email: string;
  phone: string;
};

export default function TablaPatients() {
  const navigate = useNavigate();
  const { autopopulate } = useUserStore();
  const pacientes = useUserStore((state) => state.pacientes);
  const loading = useUserStore(state => state.loading);

  const [data, setData] = useState<any[]>(pacientes);

  useEffect(() => {
    //Zustand que permite la consulta de pacientes relacionados con el usuario
    autopopulate().then(result => {
      setData(result.pacientes)
    });
    return;

  }, []);

  //const isDoctor = getUser().tipo === 'Paciente' ? false : true;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsTotal, setRowsTotal] = useState(data.length);
  const [openInputSearch, setOpenInputSearch] = useState("");
  const [dateStart, setDateStart] = useState<string | null>();
  const [dateEnd, setDateEnd] = useState<string | null>();

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

  // Esta es una funcion de Material UI para la paginacion
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
    const payload: any[] = searchRecordsFromArray(pacientes, search, 'nombre', 'apellido', undefined, 'correo');
    setData(payload);
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
              gap: "16px"
            }}
          >
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
              Buscar Paciente
            </Button>
          </Box>

          <Box
            sx={{
              padding: "0px 24px",
            }}
          >
            <Table
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
                    Nombre
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
                    Apellido
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
                    Correo
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
                    Telefono
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
                      {row.nombre}
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
                      {row.apellido}
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
                      {row.sexo}
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
                      {row.correo}
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
                      {row.telefono}
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
                        onClick={() => {
                          navigate(`/pacientes/${row.id}`);
                        }}
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
      }
      {!loading &&
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rowsTotal}
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
