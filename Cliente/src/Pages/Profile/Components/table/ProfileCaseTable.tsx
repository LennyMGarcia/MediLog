import Table from "@mui/material/Table";
import { Button, LinearProgress } from "@mui/material";
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
} from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import {
  LocalizationProvider,
  pickersFadeTransitionGroupClasses,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { PendingActionsOutlined, Search } from "@mui/icons-material";


import { useNavigate } from "react-router";
import { Link } from "@mui/material";

import { globalTheme } from "../../../../theme/globalTheme";
import { searchRecordsFromArray } from "../../../Casos/Casos";

import useUserStore from "../../../../Common/Utils/setUserSession";
import ProfileTableMenu from "./ProfileTableMenu";
import NoRecords from "../../../../Common/Components/NoRecords";

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
  data: IPropsData[];
}

// Tipos de datos a mostrar en la tabla
interface IProps {
  type: "all" | "Activo" | "Inactivo" | "Proceso" | "Suspendido";
  id: number | string | any;
}

export default function ProfileTablaCasos({ type, id }: IProps) {
  const navigate = useNavigate();
  const { getPatientCases } = useUserStore();
  const { getUser } = useUserStore();
  const { toggleLoading } = useUserStore();
  const loading = useUserStore(state => state.loading);
  const casos = useUserStore((state) => state.pacientCases);
  const [data, setData] = useState<any[]>(type === 'all' ? casos : casos.filter((cases: any) => cases?.estado === type));

  useEffect(() => {
    //Zustand que permite la consulta de casos relacionados con el usuario
    if (casos.length <= 0) {
      getPatientCases(id).then(result => {
        const casos = result || [];
        if (casos) {
          //Funcciones que divide que los registros segun el estado
          const casos_abiertos = casos.filter((cases: any) => cases?.estado === 'Activo');
          const casos_cerrados = casos.filter((cases: any) => cases?.estado === 'Inactivo');
          const casos_proceso = casos.filter((cases: any) => cases?.estado === 'Proceso');
          const casos_suspendidos = casos.filter((cases: any) => cases?.estado === 'Suspendido');

          if (type === 'Activo') {
            setData(casos_abiertos);
            toggleLoading(false);
            return;
          } else if (type === 'Inactivo') {
            setData(casos_cerrados);
            toggleLoading(false);
            return;
          }
          else if (type === 'Proceso') {
            setData(casos_proceso);
            toggleLoading(false);
            return;
          } else if (type === 'Suspendido') {
            setData(casos_suspendidos);
            toggleLoading(false);
            return;
          }
          toggleLoading(false);
          setData(casos);
          return;
        }
      });
    }
  }, []);


  // Booleano que debe indicar el rol del usuario, ahora que lo pienso, se puede validar con el zustand
  const isDoctor = getUser().tipo === 'Paciente' ? false : true;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsTotal, setRowsTotal] = useState(data?.length);
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

  const badgetStatus: Record<string, any> = {

    Inactivo: {
      name: "Inactivo",
      color: "#8EBF43",
    },
    Activo: {
      name: "Activo",
      color: "#28AAE1",
    },
    Proceso: {
      name: "En Proceso",
      color: "#E5D540",
    },
    Suspendido: {
      name: "Suspendido",
      color: "#E30000",
    },
  };

  const Badge = ({ bg, tipo }: { bg: string; tipo: string }) => {
    return (
      <Chip
        sx={{
          height: "24px",
          width: "93px",
          color: "#FFFFFF",
          borderRadius: "6px",
          backgroundColor: bg,
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "pre",
            fontFamily: "Arial",
            fontSize: "12px",
            fontWeight: "700",
            lineHeight: "20px",
          },
        }}
        label={tipo}
      />
    );
  };

  function stableSort(array: any[]) {
    const stabilized = array;

    setRowsTotal(stabilized.length);
    return stabilized;
  }

  // Esta es una funcion de Material UI para la paginacion
  const visibleRows = useMemo(
    () =>
      stableSort(data).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, openInputSearch, dateStart, dateEnd, rows]
  );

  const search_patient = (search: string) => {
    if (!search) return;
    const payload: any[] = searchRecordsFromArray(casos, search, 'descripcion', 'categoria', 'pacientes_id');
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
              justifyContent: "space-between",
            }}
          >
            {/* <Box></Box> */}
            <Box
              sx={{
                display: "flex",
                gap: "16px",
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
                  bgcolor: globalTheme.palette.secondary.main,
                  marginRight: "1rem"
                }}
                onClick={() => {
                  search_patient(openInputSearch);
                }}
              >
                Buscar caso
              </Button>
            </Box>
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
            {visibleRows?.length <= 0 ? <NoRecords /> :

              <Table
                aria-label="simple table"
                sx={{ borderCollapse: "separate", borderSpacing: "0 8px", }}
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
                      {isDoctor ? 'Pacientes' : 'Doctores'}
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
                <TableBody>
                  {visibleRows.map((data) => (
                    <TableRow
                      key={data?.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        borderRadius: "8px",
                        "& > *": { borderBottom: "none" },
                        ".css-1qanp6x-MuiTableCell-root": {
                          borderBottom: "none",
                        },
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
                          padding: "5px 16px",
                        }}
                      >
                        <Link component='button' variant="body2" onClick={() => {
                          navigate(`/cases/${data?.id}`)
                        }}>{data?.id}</Link>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Arial",
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "#070708",
                          padding: "5px 16px",
                        }}
                      >
                        {data?.descripcion}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Arial",
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "#070708",
                          padding: "5px 16px",
                        }}
                      >
                        <Link component='button' variant="body2" onClick={() => {
                          if (isDoctor) {
                            navigate(`/pacientes/${data?.pacientes_id}`)
                          }
                          return;
                        }}>{isDoctor ? data?.pacientes_id : data?.especialistas_id}</Link>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Arial",
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "#070708",
                          padding: "5px 16px",
                        }}
                      >
                        {data?.fecha}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Arial",
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "#070708",
                          padding: "5px 16px",
                        }}
                      >
                        <Badge
                          bg={badgetStatus[data?.estado]?.color}
                          tipo={badgetStatus[data?.estado]?.name}
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Arial",
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "#070708",
                          padding: "5px 16px",
                        }}
                      >
                        {data?.categoria}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Arial",
                          fontWeight: "400",
                          fontSize: "14px",
                          color: "#070708",
                          padding: "5px 16px",
                        }}
                      >
                        <ProfileTableMenu id={data?.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>}
          </Box>
        </TableContainer>}
      {!loading &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
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