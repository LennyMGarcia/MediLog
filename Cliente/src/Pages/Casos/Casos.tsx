import { Grid, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import TablaCasos from "./Components/TablaCasos";
import TabsTable from "./Components/TabsTable";
import Modal from "@mui/material/Modal/Modal";
import Box from "@mui/material/Box/Box";
import { Form, Formik } from "formik";
import CreateCaseForm from "../specificCase/Components/forms/CreateCaseForn";
import yupCreateCaseSchema from "../specificCase/Utils/yup-schema/yupCreateCaseSchema";
import axios from "axios";
import getBackendConnectionString from "../../Common/Utils/getBackendString";
import Swal from "sweetalert2";
import useCreateDataStore, { getAllCreateData } from "../specificCase/StateManagement/ZustandCreateCaseManagement";
import profileStyle from "../Profile/style/profileStyle.module.css";
import useUserStore from "../../Common/Utils/setUserSession";
import LinearProgress from "@mui/material";
import getHTTPTextError from "../../Common/snackbars/HttpErrorText";
import BannerSnackbar from "../../Common/snackbars/BannerSnackBar";

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

export default function Casos() {

  const [open, setOpen] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<string | number>('');
  const [message, setMessage] = useState<string>('');

  const { authenticated } = useUserStore();
  const { getUser } = useUserStore();
  const loading = useUserStore(state => state.loading);
  const user_id = authenticated() ? getUser().member_id : null;

  const [caseInfoModalOpen, setCaseInfoModalOpen] = useState(false);
  const handleCaseInfoModalOpen = () => setCaseInfoModalOpen(true);
  const handleCaseInfoModalClose = () => setCaseInfoModalOpen(false);

  const { setCreateData, getCreateData } = useCreateDataStore()

  //Funccion que se encarga de buscar el record en la base de datos
  const createRecordInDB = async (data: any) => {
    const result = await axios.post(getBackendConnectionString(`casos`), data, //casos
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        return true;
      }
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
  const createSubmitHandler = async () => {

    const data = getAllCreateData();
    const payload = {
      descripcion: data?.descripcion || 'Sin Descripcion',
      especialistas_id: data?.especialistas_id || user_id,
      pacientes_id: data?.pacientes_id,
      consultas: data?.consultas || null,
      cirugias: data?.cirugias || null,
      categoria: data?.categoria || null,
      estado: data?.estado || 'Suspendido',
      seguimiento: data?.seguimiento || ''
    }
    const result = await createRecordInDB(payload);
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

  return (
    <Grid
      container
      padding={"30px 24px"}
      gap={4}
      direction={"column"}
      sx={{
        height: "100%",
      }}
    >
      <Grid item container xs={12} justifyContent={"space-between"}>
        <Grid item xs={1}>
          <Typography variant="h5" fontSize={40}>
            Casos
          </Typography>
        </Grid>

        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => {
              handleCaseInfoModalOpen();
            }}
            variant="contained"
            sx={{
              bgcolor: "#168AAD",
            }}
          >
            Crear caso
          </Button>
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
                    validationSchema={yupCreateCaseSchema}
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
                              <CreateCaseForm setOfZustandCallback={setCreateData} getOfZustandCallback={getCreateData} />
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

                                //no se si necesitaras esto asi que lo deje asi -- K LINDO 
                                createSubmitHandler().then(result => {
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
                                    //  window.location.reload();
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
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 12px 24px -4px #919EAB1F",
          width: "100%",
        }}
      >
        {/* Componente de tablas y tabs */}
        <TabsTable type='Casos' />
      </Grid>
      <BannerSnackbar status={statusCode} message={message} isOpen={open} onClose={() => setOpen(false)} />
    </Grid>
  );
}
