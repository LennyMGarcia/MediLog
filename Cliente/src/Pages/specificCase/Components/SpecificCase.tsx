
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



const SpecificCase: React.FC = () => {

  const navigate = useNavigate();

const [caseInfoModalOpen, setCaseInfoModalOpen] = useState(false);
const handleCaseInfoModalOpen = () => setCaseInfoModalOpen(true);
const handleCaseInfoModalClose = () => setCaseInfoModalOpen(false);

const [consultationModalOpen, setConsultationModalOpen] = useState(false);
const handleConsultationModalOpen = () => setConsultationModalOpen(true);
const handleConsultationModalClose = () => setConsultationModalOpen(false);

  const initialValues = {
    tabValue: "one",
    field1: "",
    field2: "",
    field3: "",
    tipo: "",
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    documento_identidad: '',
    sexo: '',
    correo: '',
    direccion: '',
    telefono: '',
    tipo_sangre: '',
    padecimientos: [''],
    alergias: [''],
    familiares: [''],
    metodo_pago: "Tarjeta de Debito",
    datos_financieros: '',
  };

  return (
    <Box sx={{ backgroundColor: "#E9ECEF", height: "auto", padding:"0 0 10rem 0", width: "100vw" }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: "100vw",
          height: "10vh",
          boxShadow: 1,
          padding: "1px",
          display:'flex',
          justifyContent:"space-between",
          alignItems:"center",
          
        }}
      >
        <Typography variant="h5" sx={{ margin: "0.7rem", marginLeft: "5rem" }}>
            Nombre del caso
        </Typography>
        <Box sx={{marginRight:"3rem"}}>
          <Badge bg={"#28AAE1"} tipo={"open"} w={"8rem"} h={"2.5rem"}/>
        </Box>
        
      </Box>
     
       <Box sx={{width:"90vw", height:"auto",background:"white", margin:"4rem 4rem 0 4rem", padding:"2rem 0 2rem", boxShadow:1}}>
        
        <Box sx={{
            width:"100%",
            marginTop: "1rem",
            display: "flex",
            justifyContent:"space-between",
            
          }}>
            <Typography variant="h6" sx={{padding:"0 2rem 2rem 2rem"}}>Informacion del caso</Typography>
            {/*EDITAR*/}
            {/*{rol === 'Admin' &&*/}
              <Button variant="contained" onClick={handleCaseInfoModalOpen} sx={{ width: "12rem", height:"2rem", backgroundColor: "#52b69a", marginRight:"2rem"  }}>Editar</Button>
              {/*}*/}
            <Modal
              keepMounted
              open={caseInfoModalOpen}
              onClose={handleCaseInfoModalClose}
            >
              <Box sx={style} >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <Box sx={{ width: '100%', height: "100%" }}>
                    <Formik
                      initialValues={{ initialValues }}
                      //validationSchema={userType == "Paciente" ? mergedPatientSchema : mergedSpecialistSchema}
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
                            <Box>
                              
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
                  { name: "Paciente", data:  'Lenny' },
                  { name: "Especialista", data: 'Ben Junior', },
                  { name: "Estado", data: "activo", },
                  { name: "Categoria", data: "consulta", },
                  { name: "Descripcion", data: "Se metio algo en el, ese pana e raro bi, la creta", },
                  { name: "Seguimiento", data: "no pudimos sacarlo, ay dio", },
                  { name: "Tipo de sangre", data: "a", },
                  { name: "Padecimiento", data: <ListFormater formatData={["a", "a"]} /> },
                  
                ]} />
            
       </Box>

       <Box sx={{width:"90vw",height: "auto", padding:"2rem 0 10rem 0",background:"white", margin:"1rem 4rem 0 4rem", boxShadow:1}}>
       <Box sx={{
            width:"100%",
            marginTop: "1rem",
            display: "flex",
            justifyContent:"space-between",
            
          }}>
            <Typography variant="h6" sx={{padding:"0 2rem 2rem 1rem"}}>Consultas</Typography>
            {/*EDITAR*/}
            {/*{rol === 'Admin' &&*/}
              <Button variant="contained" onClick={handleConsultationModalOpen} sx={{ width: "12rem", height:"2rem", backgroundColor: "#52b69a", marginRight:"2rem"  }}>Agregar consulta</Button>
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
                      initialValues={{ initialValues }}
                      //validationSchema={userType == "Paciente" ? mergedPatientSchema : mergedSpecialistSchema}
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
                            <Box>
                              
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
       
            <ConsultationTable type={"all"}/>
       </Box>
          
        
    </Box>
  );

};

export default SpecificCase;

