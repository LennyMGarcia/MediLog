
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";

import Typography from "@mui/material/Typography/Typography";
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProfileList from "../../Profile/Components/ProfileList/ProfileList";
import ListFormater from "../../Profile/Components/ProfileList/ListFormater";
import Modal from "@mui/material/Modal/Modal";
import Button from "@mui/material/Button/Button";
import Tabs from "@mui/material/Tabs/Tabs";
import Tab from "@mui/material/Tab/Tab";
import { Form, Formik } from "formik";

import PhoneIcon from '@mui/icons-material/Phone';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PaidIcon from '@mui/icons-material/Paid';

import BasicProfileForm from "../../Profile/Components/forms/BasicProfileForm";
import ContactProfileForm from "../../Profile/Components/forms/ContactProfileForm";
import FinancialProfileForm from "../../Profile/Components/forms/FinancialProfileForm";
import useDataRegisterStore, { getAllRegisterData } from "../../Register/ZustandRegisterManagement";

import profileStyle from "../../Profile/style/profileStyle.module.css"
import Swal from "sweetalert2";

import dayjs from "dayjs";
import ConsultationTable, { Badge } from "./Tables/consultationTable";
import ConsultationForm from "./forms/ConsultationForm";
import ChageCaseForm from "./forms/ChangeCaseForm";
import useDataCaseStore, { getAllCaseData } from "../StateManagement/ZustandSpecificCaseManagement";
import useDataConsultationStore, { getAllConsultationData } from "../StateManagement/ZustandConsultationManagement";
import { CasesTwoTone } from "@mui/icons-material";
import yupCaseSchema from "../Utils/yup-schema/yupCaseSchema";
import yupConsultationSchema from "../Utils/yup-schema/yupConsultatioEschema";
import yupSurgerySchema from "../Utils/yup-schema/yupSurgerySchema";
import SurgeryTable from "./Tables/SurgeryTable";
import { useMediaQuery, useTheme } from "@mui/material";
import getBackendConnectionString from "../../../Common/Utils/getBackendString";
import axios from "axios";
import { set } from "zod";
import useUserStore from "../../../Common/Utils/setUserSession";
import { LinearProgress, CircularProgress } from "@mui/material";
import getHTTPTextError from "../../../Common/snackbars/HttpErrorText";
import BannerSnackbar from "../../../Common/snackbars/BannerSnackBar";
import { globalTheme } from "../../../theme/globalTheme";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "auto",
  height: "auto",
  bgcolor: globalTheme.palette.background.secondary,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


//NO SE SI IBAS  A REUTILIZAR CODIGO ASI QUE NO BORRE MUCHAS COSAS

//  LOS CONSOLE LOGS ESTAN EL FORMS-CONTROL EN EL INPUT, ASI LO VES MIENTRAS ESCRIBES SI LO QUIERES ASI

//LOS ZUSTANDS CALLBACKS SON EN ESENCIA TODOS LOS MISMOS Y TE ACEPTAN CUALQUIER COSA
//SI VES QUE SE PASA UN OBJETO A UN FORMS ES PARA LOS VALORES INICIALES

//VERAS QUE TODO ESTO ES ALGO QUE YA HAS VISTO, LO DE JULIO NO LO HE TOCADO MUCHO, SOLO PASE EL OBJETO HACIA ACA Y CAMBIE CAMPOS
const SpecificCase: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<string | number>('');
  const [message, setMessage] = useState<string>('');

  const { authenticated } = useUserStore();
  const { getUser } = useUserStore();
  const { toggleLoading } = useUserStore();
  const loading = useUserStore(state => state.loading);

  interface IfoundCase {
    id: number;
    descripcion: string;
    paciente: string;
    pacientes_id: number;
    especialistas_id: number | string;
    especialistas: string[];
    consultas: string[];
    consultas_id: number;
    cirugias: string[];
    cirugias_id: number;
    estado: string;
    categoria: string;
    seguimiento: string;
  }

  const { id } = useParams();
  const user_id = authenticated() ? getUser().id : null;

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  const { setCaseData, getCaseData } = useDataCaseStore()
  const { setConsultationData, getConsultationData } = useDataConsultationStore()

  const navigate = useNavigate();

  const [caseInfoModalOpen, setCaseInfoModalOpen] = useState(false);
  const handleCaseInfoModalOpen = () => setCaseInfoModalOpen(true);
  const handleCaseInfoModalClose = () => setCaseInfoModalOpen(false);

  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const handleConsultationModalOpen = () => setConsultationModalOpen(true);
  const handleConsultationModalClose = () => setConsultationModalOpen(false);

  // Estado para almacenar el objeto de caso
  const [CaseObj, setCaseObj] = useState<IfoundCase | undefined>();
  const [consultationTableData, setConsultationTableData] = useState<undefined | any>([]);
  const [surgeryTableData, setSurgeryTableData] = useState<undefined | any>([]);
  const [categoria, setCategoria] = useState<string>('Consulta');
  const [type, setType] = useState<"all" | "open" | "close" | "process" | "pending">('all');

  //Funccion que se encarga de buscar el record en la base de datos
  const getRecordFromDB = async (id: number | string | any, table: string) => {
    const result = await axios.get(getBackendConnectionString(`${table}/${id}`)
    ).then(response => {
      if (response.status === 200 || response.status === 201) {
        toggleLoading(false);
        return response.data;
      }
      setStatusCode(response.status);
      setMessage(() => {
        return getHTTPTextError(response.status);
      });
      return false;
    }
    ).catch(error => {
      console.log(error);
      setStatusCode(error.response.status);
      setMessage(() => {
        return getHTTPTextError(error.response.status);
      });
      navigate('/404');
      return false;
    });
    return result;
  }
  //Funccion que se encarga de buscar el record en la base de datos
  const getSurgeryFromDB = async (id: number | string | any, table: string) => {
    const surgery = await axios.get(getBackendConnectionString(`${table}/${id}`)
    ).then(response => {
      // console.log(response.data)
      /* console.log(table)
       console.log(id)
       console.log(response.data)*/
      if (response.status === 200 || response.status === 201) {
        toggleLoading(false);
        return response.data;
      }
      setStatusCode(response.status);
      setMessage(() => {
        return getHTTPTextError(response.status);
      });
      return false;
    }
    ).catch(error => {
      console.log(error);
      setStatusCode(error.response.status);
      setMessage(() => {
        return getHTTPTextError(error.response.status);
      });
      setOpen(true);
      return false;
    });
    return surgery;
  }

  //Funccion que se encarga de buscar el record en la base de datos
  const getConsultFromDB = async (id: number | string | any, table: string) => {
    const consult = await axios.get(getBackendConnectionString(`${table}/${id}`)
    ).then(response => {

      /* console.log(table)
       console.log(id)
       console.log(response.data)*/

      if (response.status === 200 || response.status === 201) {
        toggleLoading(false);
        return response.data;
      }
      setStatusCode(response.status);
      setMessage(() => {
        return getHTTPTextError(response.status);
      });
      return false;
    }
    ).catch(error => {
      console.log(error);
      setStatusCode(error.response.status);
      setMessage(() => {
        return getHTTPTextError(error.response.status);
      });
      setOpen(true);
      return false;
    });
    return consult;
  }

  //Funccion que se encarga de buscar el record en la base de datos
  const editRecordFromDB = async (id: number | string | any, data: any) => {
    const result = await axios.put(getBackendConnectionString(`casos/${id}`), data, //casos
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toggleLoading(false);
        return true;
      }
      setStatusCode(response.status);
      setMessage(() => {
        return getHTTPTextError(response.status);
      });
      return false;
    }
    ).catch(error => {
      console.log(error);
      setStatusCode(error.response.status);
      setMessage(() => {
        return getHTTPTextError(error.response.status);
      });
      setOpen(true);
      return false;
    });
    return result;
  }

  //Funccion que se agregar record a la base de datos
  const addRecordtoDB = async (id: number | string | any, data: any) => {
    const result = await axios.post(getBackendConnectionString(`consultas`), data, //consultas
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toggleLoading(false);
        return true;
      }
      setStatusCode(response.status);
      setMessage(() => {
        return getHTTPTextError(response.status);
      });
      return false;
    }
    ).catch(error => {
      console.log(error);
      setStatusCode(error.response.status);
      setMessage(() => {
        return getHTTPTextError(error.response.status);
      });
      setOpen(true);
      return false;
    });
    return result;
  }

  //Funccion que se modificar record a la base de datos
  const editSubmitHandler = async () => {

    const data = getAllCaseData();
    const payload = {
      descripcion: data?.descripcion,
      especialistas_id: data?.especialistas_id,
      estado: data?.estado,
      seguimiento: data?.seguimiento
    }
    const result = await editRecordFromDB(id, payload);
    return result;

  }

  const addSubmitHandler = async () => {

    const data = getAllConsultationData();
    const paciente_id = CaseObj?.pacientes_id;
    const payload = {
      motivo: data?.motivo,
      pacientes_id: paciente_id,
      especialistas_id: user_id,
      observaciones: data?.observaciones,
      estudios: data?.estudios && JSON.stringify(data?.estudios),
      plan_tratamiento: data?.plan_tratamiento && JSON.stringify(data?.plan_tratamiento)
    }
    const result = await addRecordtoDB(id, payload);
    return result;

  }
  const caseInitialValues = {
    descripcion: "",
    paciente: "",
    especialista: [""],
    consultas: [""],
    cirugias: [""],
    estado: "",
    categoria: "",
    seguimiento: "",
  };

  const consultationInitialValues = {
    motivo: '',
    paciente: "",
    especialista: [""],
    especialistas_id: [""],
    observaciones: "",
    estudios: [""],
    plan_tratamiento: [""],
  };



  //Sirve para encontrar el objeto a traves el id puesto en la url
  useEffect(() => {
    const caseId = Number(id); // 

    //const foundCase: IfoundCase | undefined = Case.id === caseId ? Case : undefined;
    const foundCase: IfoundCase | undefined | Promise<any> = getRecordFromDB(caseId, 'casos').then(result => {
      if (!result) return undefined;
      console.log(result)
      console.log(result.consultas_id)

      setCaseObj(result);
      if (result?.categoria === "Cirugia") {
        setCategoria('Cirugia');
      } else {
        setCategoria('Consulta');
      }
      getConsultFromDB(result?.consultas_id, 'consultas').then(consult => {
        if (!consult) return [];
        setConsultationTableData(consult?.consultas);
        setType('open');
        return consult;
      });
      getSurgeryFromDB(result?.cirugias_id, 'cirugias').then(surgery => {
        if (!surgery) return [];
        setSurgeryTableData(surgery?.cirugias);
        setType('close');
        return surgery;
      });
      return result;
    });

    if (!foundCase) {
      navigate('/404');
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: globalTheme.palette.background.main, height: "auto", padding: "0 0 10rem 0", width: "100vw" }}>
      {true &&
        <Box
          sx={{
            backgroundColor: globalTheme.palette.background.secondary,
            width: "100vw",
            height: isMediumScreen ? "10vh" : "auto",
            boxShadow: 1,
            padding: "1px",
            display: 'flex',
            justifyContent: "space-between",
            alignItems: "center",

          }}
        >
          {isMediumScreen ?
            <Typography variant="h6" sx={{ margin: "0.7rem", marginLeft: "5rem", color:globalTheme.font.primary.main }}>
              {CaseObj && CaseObj?.descripcion}
            </Typography>
            :
            <Typography variant="subtitle1" sx={{ margin: "0.7rem", marginLeft: "5rem", color:globalTheme.font.primary.main }}>
              {CaseObj && CaseObj?.descripcion}
            </Typography>}

          <Box sx={{ marginRight: "3rem" }}>
            {/*Cambia el color de la etiqueta, esta en consultationTable si se necesita edicion de este */}
            <Badge tipo={CaseObj ? CaseObj?.estado : ""} w={isMediumScreen ? "8rem" : "4rem"} h={isMediumScreen ? "2.5rem" : "2rem"} />
          </Box>

        </Box>}
      {false ? <LinearProgress /> :
        <Box sx={{ width: isMediumScreen ? "90vw" : "100vw", height: "auto", background: "white", margin: isMediumScreen ? "4rem 4rem 0 4rem" : "4rem 0 0 0", padding: "2rem 0 2rem", boxShadow: 1, backgroundColor:globalTheme.palette.background.secondary, color: globalTheme.font.primary.main}}>
          <Box sx={{
            width: "100%",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            
          }}>
            <Typography variant="h6" sx={{ padding: "0 2rem 2rem 2rem", color:globalTheme.font.primary.main }}>Informacion del caso</Typography>
            {/*EDITAR*/}
            {/*{rol === 'Admin' &&*/}
            <Button variant="contained" onClick={handleCaseInfoModalOpen} sx={{ width: "12rem", height: "2rem", backgroundColor: globalTheme.palette.primary.main, marginRight: "2rem" }}>Editar</Button>
            {/*}*/}
            <Modal
              keepMounted
              open={caseInfoModalOpen}
              onClose={handleCaseInfoModalClose}
            >
              <Box sx={style} >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <Box sx={{ width: '100%', height: "100%" }}>
                    {/*CASE */}
                    <Formik
                      validateOnMount={false}
                      validateOnChange={false} //Estos dos resuelven el bug de cambiar algo que se supone que no debe
                      initialValues={{ caseInitialValues }}
                      validationSchema={yupCaseSchema}
                      onSubmit={() => console.log("adios")}
                    >
                      {({ handleSubmit, isValid }) => (
                        <Form onSubmit={handleSubmit}>

                          <Box sx={{
                            maxHeight: '60vh',
                            overflowY: 'scroll',
                            '&::-webkit-scrollbar': {
                              width: '0.5em',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: globalTheme.palette.primary.main,
                              borderRadius: '4px',
                            },
                          }}>
                            {/*AQUI EL FORM DE CASE */}
                            <Box>
                              {
                                CaseObj && <ChageCaseForm setOfZustandCallback={setCaseData} getOfZustandCallback={getCaseData} caseValues={CaseObj} />
                              }
                            </Box>



                          </Box>
                          {/*ENVIAR INFORMACION*/}
                          <Button sx={{ mt: "0.5rem", backgroundColor: globalTheme.palette.primary.main }}
                            fullWidth
                            variant="contained"
                            type="submit"
                            //disabled={!isValid}
                            onClick={() => {
                              Swal.fire({
                                title: '¿Estás seguro?',
                                text: `Esta acción cambiara todos tus datos`,
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: globalTheme.palette.primary.main,
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Aplicar cambios',
                                cancelButtonText: 'Cancelar',
                                customClass: {
                                  container: profileStyle.sweetAlertContainer,
                                },
                                allowOutsideClick: () => !Swal.isLoading(),
                                allowEscapeKey: () => !Swal.isLoading(),
                                allowEnterKey: () => !Swal.isLoading(),
                                stopKeydownPropagation: false,

                              }).then((result) => {
                                if (result.isConfirmed && isValid) {
                                  //mandame la funcion aqui >:V -- Muy util que dejaras este comentario, por eso no pase horas buscando

                                  //no se si necesitaras esto asi que lo deje asi -- K LINDO 
                                  editSubmitHandler().then(result => {
                                    if (result) {
                                      handleCaseInfoModalClose()
                                      Swal.fire({
                                        title: 'Aplicado con exito',
                                        text: 'Todos los datos han sido editados.',
                                        icon: 'success',
                                        customClass: {
                                          container: profileStyle.sweetAlertContainer,
                                        }
                                      });
                                      window.location.reload();

                                    } else {
                                      Swal.fire({
                                        title: 'No se aplicaron cambios',
                                        text: 'Acceso Denegado',
                                        icon: 'warning',
                                        customClass: {
                                          container: profileStyle.sweetAlertContainer,
                                        }
                                      });
                                    }
                                  });
                                }
                                else if (!isValid) {
                                  Swal.fire({
                                    title: 'No se aplicaron cambios',
                                    text: 'Hay datos invalidados dentro del formulario',
                                    icon: 'warning',
                                    customClass: {
                                      container: profileStyle.sweetAlertContainer,
                                    }
                                  });
                                }
                              })
                            }}
                          >
                            Aplicar cambios
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </Box>
                </Box>
              </Box>
            </Modal>
          </Box>
          <ProfileList dataList={[
            { name: "Descripcion", data: CaseObj && CaseObj?.descripcion },
            { name: "Categoria", data: CaseObj && CaseObj?.categoria, },
            { name: "Estado", data: CaseObj && CaseObj?.estado, },
            { name: "Paciente", data: CaseObj && CaseObj?.paciente },
            { name: "Especialistas", data: <ListFormater formatData={CaseObj ? CaseObj?.especialistas : []} /> },
            { name: "Seguimiento", data: CaseObj && CaseObj?.seguimiento, },
          ]} />

        </Box>
      }
      <Box sx={{ width: isMediumScreen ? "90vw" : "100vw", height: "auto", padding: "2rem 0 10rem 0", background: "white", margin: isMediumScreen ? "1rem 4rem 0 4rem" : "1rem 0 0 0 ", boxShadow: 1, backgroundColor:globalTheme.palette.background.secondary, color:globalTheme.font.primary.main }}>
        <Box sx={{
          width: "100%",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",

        }}>
          <Typography variant="h6" sx={{ padding: "0 2rem 2rem 1rem" }}>{categoria}s</Typography>
          {/*EDITAR*/}
          {/*{rol === 'Admin' &&*/}
          <Button variant="contained" onClick={handleConsultationModalOpen} sx={{ width: "12rem", height: "2rem", backgroundColor: globalTheme.palette.primary.main, marginRight: "2rem" }}>{categoria == "Consulta" ? "Agregar consulta" : "Agregar Cirugia"}</Button>
          {/*}*/}
          <Modal
            keepMounted
            open={consultationModalOpen}
            onClose={handleConsultationModalClose}
          >
            <Box sx={style} >3
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <Box sx={{ width: '100%', height: "100%" }}>
                  <Formik
                    initialValues={consultationInitialValues}
                    validationSchema={yupSurgerySchema}
                    onSubmit={() => console.log("adios")}
                  >
                    {({ handleSubmit, isValid }) => (
                      <Form onSubmit={handleSubmit}>

                        <Box sx={{
                          maxHeight: '60vh',
                          overflowY: 'scroll',
                          '&::-webkit-scrollbar': {
                            width: '0.5em',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            backgroundColor: globalTheme.palette.primary.main,
                            borderRadius: '4px',
                          },
                        }}>
                          {/**CONSULTATION */}
                          <Box>
                            <ConsultationForm setOfZustandCallback={setConsultationData} getOfZustandCallback={getConsultationData} />
                          </Box>



                        </Box>
                        {/*ENVIAR INFORMACION*/}
                        <Button sx={{ mt: "0.5rem", backgroundColor: globalTheme.palette.primary.main }}
                          fullWidth
                          variant="contained"
                          type="submit"
                          //disabled={!isValid}
                          onClick={() => {
                            Swal.fire({
                              title: '¿Estás seguro?',
                              text: `Esta acción cambiara todos tus datos`,
                              icon: 'question',
                              showCancelButton: true,
                              confirmButtonColor: globalTheme.palette.primary.main,
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Aplicar cambios',
                              cancelButtonText: 'Cancelar',
                              customClass: {
                                container: profileStyle.sweetAlertContainer,
                              },
                              allowOutsideClick: () => !Swal.isLoading(),
                              allowEscapeKey: () => !Swal.isLoading(),
                              allowEnterKey: () => !Swal.isLoading(),
                              stopKeydownPropagation: false,

                            }).then((result) => {
                              if (result.isConfirmed && isValid) {
                                //mandame la funcion aqui >:V -- Muy util que dejaras este comentario, por eso no pase horas buscando

                                //no se si necesitaras esto asi que lo deje asi
                                addSubmitHandler().then(result => {
                                  if (result) {
                                    handleConsultationModalClose()
                                    Swal.fire({
                                      title: 'Aplicado con exito',
                                      text: 'Todos los datos han sido editados.',
                                      icon: 'success',
                                      customClass: {
                                        container: profileStyle.sweetAlertContainer,
                                      }
                                    });
                                    window.location.reload();
                                  } else {
                                    Swal.fire({
                                      title: 'No se aplicaron cambios',
                                      text: 'Acceso Denegado',
                                      icon: 'warning',
                                      customClass: {
                                        container: profileStyle.sweetAlertContainer,
                                      }
                                    });
                                  }
                                });
                              }
                              else if (!isValid) {
                                Swal.fire({
                                  title: 'No se aplicaron cambios',
                                  text: 'Hay datos invalidados dentro del formulario',
                                  icon: 'warning',
                                  customClass: {
                                    container: profileStyle.sweetAlertContainer,
                                  }
                                });
                              }
                            })
                          }}
                        >
                          Aplicar cambios
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>

        {categoria == "Consulta" ? <ConsultationTable type={type} dataObject={consultationTableData} />
          :
          categoria == "Cirugia" ? <SurgeryTable type={type} dataObject={surgeryTableData}></SurgeryTable>
            :
            <div>Ninguna tabla coincide con la categoria</div>}
      </Box>

      <BannerSnackbar status={statusCode} message={message} isOpen={open} onClose={() => setOpen(false)} />
    </Box>
  );

};

export default SpecificCase;
//Estos dos arrays de objetos es para la info de las tablas, Preferi hacerlo aqui porque puedes
//manejar las dos al mismo tiempo y mas si necesitas condicionales, no se como lo ibas  a hacer
//y por eso no cree una mejor estructura que dos simples arrays
/*const Case = {
    id: 1,
    descripcion: "es un muchacho muy pero muy grande y de buen corazom",
    pacientes: "Lenny",
    especialistas: ["Coraline", "Stephany"],
    consultas: [],
    cirugias: [],
    estado: "Activo",
    categoria: "Cirugia",
    seguimiento: "no hay seguimiento",
  }*/
/*var consultationTableData = [
 {
   id: 1,
   motivo: "Consulta de rutina",
   especialista: "Juan Pérez",
   fecha: "2024-03-11T09:00:00",

 },
 {
   id: 2,
   motivo: "Consulta de rutina",
   especialista: "Juan Pérez",
   fecha: "2024-03-11T09:00:00",

 },
 {
   id: 3,
   motivo: "Consulta de rutina",
   especialista: "Juan Pérez",
   fecha: "2024-03-11T09:00:00",

 },
 {
   id: 4,
   motivo: "Consulta de rutina",
   especialista: "Juan Pérez",
   fecha: "2024-03-11T09:00:00",

 },

];

var surgeryTableData = [
 {
   id: 1,
   motivo: "Consulta de rutina",
   especialista: "Juan Pérez",
   fecha: "2024-03-11T09:00:00",
   categoria: "ginecologo"
 },
 {
   id: 2,
   motivo: "Consulta de rutina",
   especialista: "Juan Pérez",
   fecha: "2024-03-11T09:00:00",
   categoria: "ginecologo"
 },
 {
   id: 3,
   motivo: "Consulta de rutina",
   especialista: "Juan Pérez",
   fecha: "2024-03-11T09:00:00",
   categoria: "ginecologo"
 },
 {
   id: 4,
   motivo: "Consulta de rutina",
   especialista: "Juan Pérez",
   fecha: "2024-03-11T09:00:00",
   categoria: "ginecologo"
 },

];*/