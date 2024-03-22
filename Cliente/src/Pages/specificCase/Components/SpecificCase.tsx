
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


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "auto",
  height: "auto",
  bgcolor: 'background.paper',
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

  const { id } = useParams();

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

  const Case = {
    id: 1,
    descripcion: "es un muchacho muy pero muy grande y de buen corazom",
    pacientes: "Lenny",
    especialistas: ["Coraline", "Stephany"],
    consultas: [],
    cirugias: [],
    estado: "Activo",
    categoria: "Cirugia",
    seguimiento: "no hay seguimiento",
  }

  interface IfoundCase {
    id: number;
    descripcion: string;
    pacientes: string;
    especialistas: string[];
    consultas: string[];
    cirugias: string[];
    estado: string;
    categoria: string;
    seguimiento: string;
  }
  // Estado para almacenar el objeto de caso
  const [CaseObj, setCaseObj] = useState<IfoundCase | undefined>(); 

  //Sirve para encontrar el objeto a traves el id puesto en la url
  useEffect(() => {
    const caseId = Number(id); // 

    const foundCase: IfoundCase | undefined = Case.id === caseId ? Case : undefined;
    setCaseObj(foundCase);

    if (!foundCase) {
      navigate('/404');
    }
  }, [id]);

  
  const caseInitialValues = {
    descripcion: "",
    pacientes: "",
    especialistas: [""],
    consultas: [""],
    cirugias: [""],
    estado: "",
    categoria: "",
    seguimiento: "",
  };

  const consultationInitialValues = {
    motivo: '',
    pacientes: "",
    especialistas: [""],
    observaciones: [""],
    estudios: [""],
    plan_tratamiento: [""],
  };

  //Estos dos arrays de objetos es para la info de las tablas, Preferi hacerlo aqui porque puedes
  //manejar las dos al mismo tiempo y mas si necesitas condicionales, no se como lo ibas  a hacer
  //y por eso no cree una mejor estructura que dos simples arrays
  const consultationTableData = [
    {
      id: 1,
      motivo: "Consulta de rutina",
      person: "Juan Pérez",
      time: "2024-03-11T09:00:00",

    },
    {
      id: 2,
      motivo: "Consulta de rutina",
      person: "Juan Pérez",
      time: "2024-03-11T09:00:00",

    },
    {
      id: 3,
      motivo: "Consulta de rutina",
      person: "Juan Pérez",
      time: "2024-03-11T09:00:00",

    },
    {
      id: 4,
      motivo: "Consulta de rutina",
      person: "Juan Pérez",
      time: "2024-03-11T09:00:00",

    },

  ];

  const surgeryTableData = [
    {
      id: 1,
      motivo: "Consulta de rutina",
      person: "Juan Pérez",
      time: "2024-03-11T09:00:00",
      categoria:"ginecologo"
    },
    {
      id: 2,
      motivo: "Consulta de rutina",
      person: "Juan Pérez",
      time: "2024-03-11T09:00:00",
      categoria:"ginecologo"
    },
    {
      id: 3,
      motivo: "Consulta de rutina",
      person: "Juan Pérez",
      time: "2024-03-11T09:00:00",
      categoria:"ginecologo"
    },
    {
      id: 4,
      motivo: "Consulta de rutina",
      person: "Juan Pérez",
      time: "2024-03-11T09:00:00",
      categoria:"ginecologo"
    },

  ];



  return (
    <Box sx={{ backgroundColor: "#E9ECEF", height: "auto", padding: "0 0 10rem 0", width: "100vw" }}>
      <Box
        sx={{
          backgroundColor: "#fff",
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
        <Typography variant="h6" sx={{ margin: "0.7rem", marginLeft: "5rem" }}>
          {CaseObj && CaseObj.descripcion}
        </Typography> 
        :
        <Typography variant="subtitle1" sx={{ margin: "0.7rem", marginLeft: "5rem" }}>
          {CaseObj && CaseObj.descripcion}
        </Typography> }

        <Box sx={{ marginRight: "3rem" }}>
          {/*Cambia el color de la etiqueta, esta en consultationTable si se necesita edicion de este */}
          <Badge tipo={CaseObj ? CaseObj.estado : ""} w={isMediumScreen ? "8rem" : "4rem"} h={ isMediumScreen ?"2.5rem" :"2rem"} />
        </Box>

      </Box>

      <Box sx={{ width: isMediumScreen ? "90vw" : "100vw", height: "auto", background: "white", margin: isMediumScreen ? "4rem 4rem 0 4rem" : "4rem 0 0 0", padding: "2rem 0 2rem", boxShadow: 1 }}>

        <Box sx={{
          width: "100%",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",

        }}>
          <Typography variant="h6" sx={{ padding: "0 2rem 2rem 2rem" }}>Informacion del caso</Typography>
          {/*EDITAR*/}
          {/*{rol === 'Admin' &&*/}
          <Button variant="contained" onClick={handleCaseInfoModalOpen} sx={{ width: "12rem", height: "2rem", backgroundColor: "#52b69a", marginRight: "2rem" }}>Editar</Button>
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
                            backgroundColor: '#52b69a',
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
                        <Button sx={{ mt: "0.5rem", backgroundColor: "#52b69a" }}
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
                              confirmButtonColor: '#52b69a',
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
                                //editSubmitHandler().then(result => {
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
                                  //window.location.href = `/pacientes/${idOrName}`;
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
                                //});
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
          { name: "Descripcion", data: CaseObj && CaseObj.descripcion },
          { name: "categoria", data: CaseObj && CaseObj.categoria, },
          { name: "estado", data: CaseObj && CaseObj.estado, },
          { name: "Pacientes", data: CaseObj && CaseObj.pacientes },
          { name: "Especialistas", data: <ListFormater formatData={CaseObj ? CaseObj.especialistas : []} /> },
          { name: "Seguimiento", data: CaseObj && CaseObj.seguimiento, },
        ]} />

      </Box>

      <Box sx={{ width:  isMediumScreen ? "90vw" : "100vw", height: "auto", padding: "2rem 0 10rem 0", background: "white", margin: isMediumScreen ? "1rem 4rem 0 4rem" : "1rem 0 0 0 ", boxShadow: 1 }}>
        <Box sx={{
          width: "100%",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",

        }}>
          <Typography variant="h6" sx={{ padding: "0 2rem 2rem 1rem" }}>Consultas</Typography>
          {/*EDITAR*/}
          {/*{rol === 'Admin' &&*/}
          <Button variant="contained" onClick={handleConsultationModalOpen} sx={{ width: "12rem", height: "2rem", backgroundColor: "#52b69a", marginRight: "2rem" }}>Agregar consulta</Button>
          {/*}*/}
          <Modal
            keepMounted
            open={consultationModalOpen}
            onClose={handleConsultationModalClose}
          >
            <Box sx={style} >
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
                            backgroundColor: '#52b69a',
                            borderRadius: '4px',
                          },
                        }}>
                          {/**CONSULTATION */}
                          <Box>
                            <ConsultationForm setOfZustandCallback={setConsultationData} getOfZustandCallback={getConsultationData} />
                          </Box>



                        </Box>
                        {/*ENVIAR INFORMACION*/}
                        <Button sx={{ mt: "0.5rem", backgroundColor: "#52b69a" }}
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
                              confirmButtonColor: '#52b69a',
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
                                //editSubmitHandler().then(result => {
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
                                  //window.location.href = `/pacientes/${idOrName}`;
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
                                //});
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

        {CaseObj?.categoria == "Consulta" ?<ConsultationTable type={"all"} dataObject={consultationTableData} />
        :
        CaseObj?.categoria == "Cirugia" ?<SurgeryTable type={"all"} dataObject={surgeryTableData}></SurgeryTable> 
         : 
         <div>Ninguna tabla coincide con la categoria</div>}
      </Box>


    </Box>
  );

};

export default SpecificCase;

