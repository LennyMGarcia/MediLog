
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
import ProfileList from "../../../Profile/Components/ProfileList/ProfileList";
import ListFormater from "../../../Profile/Components/ProfileList/ListFormater";
import Modal from "@mui/material/Modal/Modal";
import Button from "@mui/material/Button/Button";
import Tabs from "@mui/material/Tabs/Tabs";
import Tab from "@mui/material/Tab/Tab";
import { Form, Formik } from "formik";

import PhoneIcon from '@mui/icons-material/Phone';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PaidIcon from '@mui/icons-material/Paid';
import profileStyle from "../../../Profile/style/profileStyle.module.css"
import Swal from "sweetalert2";

import dayjs from "dayjs";
import ConsultationForm from "../forms/ConsultationForm";
import useDataConsultationStore, { getAllConsultationData } from "../../StateManagement/ZustandConsultationManagement";
import yupConsultationSchema from "../../Utils/yup-schema/yupConsultatioEschema";
import { useMediaQuery, useTheme, LinearProgress } from "@mui/material";
import getBackendConnectionString from "../../../../Common/Utils/getBackendString";
import useUserStore from "../../../../Common/Utils/setUserSession";
import axios from "axios";
import BannerSnackbar from "../../../../Common/snackbars/BannerSnackBar";
import getHTTPTextError from "../../../../Common/snackbars/HttpErrorText";
import { globalTheme } from "../../../../theme/globalTheme";
//NO QUIERO QUE TE LA PASES LEYENDO COMENTARIOS CUALQUIER COSA VE A SPECIFICASE

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "auto",
  height: "auto",
  bgcolor: globalTheme.palette.background.secondary ,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Consultation: React.FC = () => {

  interface IfoundConsultation {
    id: number,
    motivo: string,
    paciente: string,
    especialistas: string[],
    especialistas_id: string,
    observaciones: string,
    estudios: string[],
    plan_tratamiento: string[]
  }

  const [open, setOpen] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<string | number>('');
  const [message, setMessage] = useState<string>('');

  const navigate = useNavigate();
  const loading = useUserStore(state => state.loading);
  const { authenticated } = useUserStore();
  const { getUser } = useUserStore();
  const { toggleLoading } = useUserStore();
  const { id } = useParams();
  const user_id = authenticated() ? getUser().member_id : null;

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  const { setConsultationData, getConsultationData } = useDataConsultationStore()

  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const handleConsultationModalOpen = () => setConsultationModalOpen(true);
  const handleConsultationModalClose = () => setConsultationModalOpen(false);
  const [ConsultationObj, setConsultationObj] = useState<IfoundConsultation | undefined>(); // Estado para almacenar el objeto de caso

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
      setOpen(true);
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
  const editRecordFromDB = async (id: number | string | any, data: any) => {
    const result = await axios.put(getBackendConnectionString(`consultas/${id}`), data, //consultas
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
      setOpen(true);
      return false;
    }
    ).catch(error => {
      setStatusCode(error.response.status);
      setMessage(() => {
        return getHTTPTextError(error.response.status);
      });
      setOpen(true);
      console.log(error);
      return false;
    });
    return result;
  }

  //Funccion que se modificar record a la base de datos
  const editSubmitHandler = async () => {

    const data = getAllConsultationData();
    const payload = {
      motivo: data?.motivo,
      especialistas_id: data?.especialistas_id || user_id,
      observaciones: data?.observaciones,
      estudios: data?.estudios && JSON.stringify(data?.estudios),
      plan_tratamiento: data?.plan_tratamiento && JSON.stringify(data?.plan_tratamiento)
    }
    //console.log(payload)
    const result = await editRecordFromDB(id, payload);
    return result;

  }

  useEffect(() => {
    const consultatioId = Number(id); // Convertir ID a número

    // const foundConsultation: IfoundConsultation | undefined = Consultation.id === consultatioId ? Consultation : undefined;
    const foundConsultation: IfoundConsultation | undefined | Promise<any> = getRecordFromDB(consultatioId, 'consultas').then(result => {
      if (!result) return undefined;
      console.log(result)
      setConsultationObj(result)
    });

    if (!foundConsultation) {
      navigate('/404');
    }
  }, [id]);

  const consultationInitialValues = {
    motivo: "",
    pacientes: "",
    especialistas: [""],
    observaciones: "",
    estudios: [""],
    plan_tratamiento: [""],
  };

  return (
    <Box sx={{ backgroundColor: globalTheme.palette.background.main, height: "auto", padding: "0 0 10rem 0", width: "100vw" }}>
      {!loading &&
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
              {ConsultationObj && ConsultationObj?.motivo}
            </Typography>
            :
            <Typography variant="subtitle1" sx={{ margin: "0.7rem", marginLeft: "5rem", color:globalTheme.font.primary.main }}>
              {ConsultationObj && ConsultationObj.motivo}
            </Typography>}


        </Box>}
      {loading ? <LinearProgress /> :
        <Box sx={{ width: isMediumScreen ? "90vw" : "100vw", height: "auto", background: "white", margin: isMediumScreen ? "4rem 4rem 0 4rem" : "4rem 0 0 0", padding: "2rem 0 2rem", boxShadow: 1,  backgroundColor:globalTheme.palette.background.secondary, color:globalTheme.font.primary.main  }}>

          <Box sx={{
            width: "100%",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",

          }}>
            <Typography variant="h6" sx={{ padding: "0 2rem 2rem 2rem" }}>Informacion de la consulta</Typography>
            {/*EDITAR*/}
            {/*{rol === 'Admin' &&*/}
            <Button variant="contained" onClick={handleConsultationModalOpen} sx={{ width: "12rem", height: "2rem", backgroundColor: globalTheme.palette.primary.main, marginRight: "2rem" }}>Editar</Button>
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
                      validateOnMount={false}
                      validateOnChange={false}
                      initialValues={{ consultationInitialValues }}
                      validationSchema={yupConsultationSchema}
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
                            <Box>
                              {
                                ConsultationObj && <ConsultationForm setOfZustandCallback={setConsultationData} getOfZustandCallback={getConsultationData} consultationValues={ConsultationObj} />
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

                                  //no se si necesitaras esto asi que lo deje asi
                                  editSubmitHandler().then(result => {
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
          <ProfileList dataList={[
            { name: "Paciente", data: ConsultationObj && ConsultationObj?.paciente },
            { name: "Especialista", data: <ListFormater formatData={ConsultationObj ? ConsultationObj?.especialistas : []} />, },
            { name: "Motivo", data: ConsultationObj && ConsultationObj?.motivo, },
            { name: "Estudios", data: <ListFormater formatData={ConsultationObj ? ConsultationObj?.estudios : []} /> },
            { name: "Observaciones", data: ConsultationObj && ConsultationObj?.observaciones },
            { name: "Plan de tratamiento", data: <ListFormater formatData={ConsultationObj ? ConsultationObj?.plan_tratamiento : []} /> },

          ]} />

        </Box>}
      <BannerSnackbar status={statusCode} message={message} isOpen={open} onClose={() => setOpen(false)} />
    </Box>
  );

};

export default Consultation;

/*const Consultation = {
    id: 1,
    motivo: "No comer",
    pacientes: "Lenny",
    especialistas: ["jhon", "josefina"],
    observaciones: "ninguna",
    estudios: ["Tentar", "Arropar"],
    plan_tratamiento: ["Comer", "dormir"]
  }*/