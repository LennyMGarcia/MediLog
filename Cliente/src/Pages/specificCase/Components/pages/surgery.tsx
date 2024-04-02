
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
import { useMediaQuery, useTheme, LinearProgress } from "@mui/material";
import profileStyle from "../../../Profile/style/profileStyle.module.css"
import Swal from "sweetalert2";
import { Badge } from "../Tables/consultationTable";

import dayjs from "dayjs";
import SurgeryForm from "../forms/SurgeryForm";
import useDataSurgeryStore, { getAllSurgeryData } from "../../StateManagement/ZustandSurgeryManagement";
import yupSurgerySchema from "../../Utils/yup-schema/yupSurgerySchema";
import axios from "axios";
import getBackendConnectionString from "../../../../Common/Utils/getBackendString";
import useUserStore from "../../../../Common/Utils/setUserSession";
import getHTTPTextError from "../../../../Common/snackbars/HttpErrorText";
import BannerSnackbar from "../../../../Common/snackbars/BannerSnackBar";
import { globalTheme } from "../../../../theme/globalTheme";

//NO QUIERO QUE TE LA PASES LEYENDO COMENTARIOS CUALQUIER COSA VE A SPECIFICASE

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



const Surgery: React.FC = () => {

  interface IfoundSurgery {
    id: number,
    motivo: string,
    paciente: string,
    especialistas: string[],
    especialistas_id: string,
    observaciones: string,
    estudios: string[],
    instrucciones: string[],
    categoria: string,
    resultado: string,
  }
  const loading = useUserStore(state => state.loading);

  const [open, setOpen] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<string | number>('');
  const [message, setMessage] = useState<string>('');

  const { authenticated } = useUserStore();
  const { toggleLoading } = useUserStore();
  const { getUser } = useUserStore();
  const navigate = useNavigate();

  const { id } = useParams();
  const user_id = authenticated() ? getUser().member_id : null;

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  const { setSurgeryData, getSurgeryData } = useDataSurgeryStore()

  const [SurgeryModalOpen, setSurgeryModalOpen] = useState(false);
  const handleSurgeryModalOpen = () => setSurgeryModalOpen(true);
  const handleSurgeryModalClose = () => setSurgeryModalOpen(false);
  const [surgeryObj, setsurgeryObj] = useState<IfoundSurgery | undefined>(); // Estado para almacenar el objeto de caso


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
    const result = await axios.put(getBackendConnectionString(`cirugias/${id}`), data, //cirugias
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

    const data = getAllSurgeryData();
    const payload = {
      motivo: data.motivo,
      especialistas_id: data.especialistas_id || user_id,
      categoria: data.categoria,
      observaciones: data.observaciones,
      resultado: data.resultado,
      estudios: data.estudios && JSON.stringify(data.estudios),
      instrucciones: data.instrucciones && JSON.stringify(data.instrucciones)
    }
    const result = await editRecordFromDB(id, payload);
    return result;

  }


  useEffect(() => {
    const SugeryId = Number(id);

    //const foundSurgery: IfoundSurgery | undefined = Surgery.id === SugeryId ? Surgery : undefined;
    const foundSurgery: IfoundSurgery | undefined | Promise<any> = getRecordFromDB(SugeryId, 'cirugias').then(result => {
      if (!result) return undefined;
      console.log(result)
      setsurgeryObj(result);
    });

    if (!foundSurgery) {
      navigate('/404');
    }
  }, [id]);

  const surgeryInitialValues = {
    motivo: "",
    paciente: "",
    especialistas: [""],
    observaciones: "",
    estudios: [""],
    instrucciones: [""],
    categoria: "",
    resultado: "",
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
            <Typography variant="h6" sx={{ margin: "0.7rem", marginLeft: "5rem" }}>
              {surgeryObj && surgeryObj?.motivo}
            </Typography>
            :
            <Typography variant="subtitle1" sx={{ margin: "0.7rem", marginLeft: "5rem" }}>
              {surgeryObj && surgeryObj.motivo}
            </Typography>}
          <Box sx={{ marginRight: "3rem" }}>
            {/*Cambia el color de la etiqueta, esta en consultationTable si se necesita edicion de este */}
            <Badge tipo={surgeryObj ? surgeryObj?.resultado : ""} w={isMediumScreen ? "8rem" : "4rem"} h={isMediumScreen ? "2.5rem" : "2rem"} />
          </Box>

        </Box>}
      {loading ? <LinearProgress /> :
        <Box sx={{ width: isMediumScreen ? "90vw" : "100vw", height: "auto", background: "white", margin: isMediumScreen ? "4rem 4rem 0 4rem" : "4rem 0 0 0", padding: "2rem 0 2rem", boxShadow: 1 }}>

          <Box sx={{
            width: "100%",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",

          }}>
            <Typography variant="h6" sx={{ padding: "0 2rem 2rem 2rem" }}>Informacion de la consulta</Typography>
            {/*EDITAR*/}
            {/*{rol === 'Admin' &&*/}
            <Button variant="contained" onClick={handleSurgeryModalOpen} sx={{ width: "12rem", height: "2rem", backgroundColor: globalTheme.palette.primary.main, marginRight: "2rem" }}>Editar</Button>
            {/*}*/}
            <Modal
              keepMounted
              open={SurgeryModalOpen}
              onClose={handleSurgeryModalClose}
            >
              <Box sx={style} >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <Box sx={{ width: '100%', height: "100%" }}>
                    <Formik
                      validateOnMount={false}
                      validateOnChange={false}
                      initialValues={{ surgeryInitialValues }}
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
                            <Box>
                              {
                                surgeryObj && <SurgeryForm setOfZustandCallback={setSurgeryData} getOfZustandCallback={getSurgeryData} SurgeryValues={surgeryObj} />
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
                                      handleSurgeryModalClose()
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
            { name: "Paciente", data: surgeryObj && surgeryObj?.paciente },
            { name: "Especialista", data: <ListFormater formatData={surgeryObj ? surgeryObj?.especialistas : []} />, },
            { name: "Motivo", data: surgeryObj && surgeryObj?.motivo, },
            { name: "Categoria", data: surgeryObj && surgeryObj?.categoria, },
            { name: "Estudios", data: <ListFormater formatData={surgeryObj ? surgeryObj?.estudios : []} /> },
            { name: "Observaciones", data: surgeryObj && surgeryObj?.observaciones },
            { name: "Instrucciones", data: <ListFormater formatData={surgeryObj ? surgeryObj?.instrucciones : []} /> },
            { name: "Resultado", data: surgeryObj && surgeryObj?.resultado, },
          ]} />

        </Box>}
      <BannerSnackbar status={statusCode} message={message} isOpen={open} onClose={() => setOpen(false)} />
    </Box>
  );

};

export default Surgery;

/*onst Surgery = {
    id: 1,
    motivo: "Decir hola",
    pacientes: "Lenny",
    especialistas: ["Jolge", "Lenny"],
    observaciones: "Dijo lenny la bestaia",
    estudios: ["ver si es jhonny", "decir hola"],
    instrucciones: ["comprar camisa de fuerza", "usarla"],
    categoria: "Perro",
    resultado: "Fracaso",
  }*/