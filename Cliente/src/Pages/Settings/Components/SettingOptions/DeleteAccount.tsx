import Box from "@mui/material/Box/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import * as React from "react";
import Swal from "sweetalert2";
import { Form, Formik } from "formik";
import WarningIcon from "@mui/icons-material/Warning";
import SweetAlertDAStyle from "../../../Profile/style/profileStyle.module.css";
import WestIcon from "@mui/icons-material/West";
import Modal from "@mui/material/Modal/Modal";
import SettingsInput from "../inputElements/SettingsInput";
import * as Yup from "yup";
import { useMediaQuery } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import axios from "axios";
import getBackendConnectionString from "../../../../Common/Utils/getBackendString";
import useUserStore from "../../../../Common/Utils/setUserSession";
import getHTTPTextError from "../../../../Common/snackbars/HttpErrorText";
import BannerSnackbar from "../../../../Common/snackbars/BannerSnackBar";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
//Devuelve un objeto yup
const getPasswordSchema = (contrasenaFromDatabase: string) => {
  return Yup.object({
    contrasena: Yup.string()
      .test(
        "password-match",
        "La contraseña actual es incorrecta",
        (value) => value === contrasenaFromDatabase
      )
      .required("Required"),
  });
};

const contrasenaFromDatabase = "password";
//Aqui pasas la contrasena de la base datos y se crea un esquema
const passwordSchema = getPasswordSchema(contrasenaFromDatabase);


/*const getPasswordSchema = () => {
  return Yup.object({
    contrasena: Yup.string()
      .required("Required"),
  });
};*/

//Aqui pasas la contrasena de la base datos y se crea un esquema
//const passwordSchema = getPasswordSchema();

const DeleteAccount: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<string | number>('');
  const [message, setMessage] = useState<string>('');

  const { getUser } = useUserStore();
  const { authenticated } = useUserStore();
  const { logoutUser } = useUserStore();

  const id = authenticated() ? getUser().id : null;

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();

  // Condicion que verifica si hay un usuario conectado, en caso de que no, impide acceso a esa ruta
  useEffect(() => {
    if (!authenticated()) {
      navigate('/');
      return;
    }
    return;

  })

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const destroy_account = async (id: number) => {
    const result = await axios.delete(getBackendConnectionString(`usuarios/${id}`))//usuarios
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          return { success: true, message: response.statusText };
        }
        return { success: false, message: response.statusText };
      }).catch(error => {
        const error_msj = error?.response?.data?.message;
        console.log(error);
        console.log(error_msj);
        setStatusCode(error.response.status);
        setMessage(() => {
          return getHTTPTextError(error.response.status);
        });
        setOpen(true);
        return { success: false, message: error_msj };
      })/*.finally(() => {
          logoutUser();
        });*/
    return result;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#e9ecef",
        width: "100vw",
        height: isMediumScreen ? "130vh" : "160vh",
        padding: "1px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          width: "100vw",
          height: "10vh",
          boxShadow: 1,
          padding: "1px",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => navigate("/settings")}
          sx={{
            color: "#52b69a",
            "&:hover": {
              backgroundColor: "#ffeffe",
              color: "#34a0a4",
            },
          }}
        >
          <WestIcon sx={{ margin: "0.7rem", marginLeft: "3rem" }}></WestIcon>
        </Button>
        <Typography
          variant="h5"
          sx={{ margin: "0.7rem", marginLeft: "0.5rem" }}
        >
          Eliminar cuenta
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          width: isMediumScreen ? "20vw" : "70vw",
          height: "5vh",
          boxShadow: 1,
          margin: isMediumScreen ? "3rem 0 0 3rem" : "3rem 0 0 0 ",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderStartStartRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        <SettingsIcon
          sx={{
            color: "gray",
            width: "1rem",
            height: "1rem",
            paddingRight: "0.5rem",
          }}
        />
        <Typography variant="subtitle1" sx={{ color: "gray" }}>
          configuracion / Eliminar Cuenta
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          width: isMediumScreen ? "90vw" : "100vw",
          height: isMediumScreen ? "100vh" : "130vh",
          boxShadow: 1,
          marginLeft: isMediumScreen ? "3rem" : "0",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            padding: isMediumScreen ? "2rem 0 0.5rem 6rem" : "2rem 0 0 2rem",
          }}
        >
          Eliminar cuenta
        </Typography>
        <Box
          sx={{
            padding: isMediumScreen ? "0 10rem 1rem 6rem" : "0 2rem 1rem 2rem",
            color: "gray",
          }}
        >
          <Typography variant="subtitle1">
            Queremos informarte sobre las implicaciones de eliminar tu cuenta en
            Medilog.
          </Typography>
          <br />
          <Typography variant="subtitle1" align="justify">
            Al eliminar tu cuenta, perderás acceso a todos los datos asociados
            con ella, incluyendo: {<br />} Toda la información que hayas
            proporcionado, como tu nombre, dirección de correo electrónico,
            fecha de nacimiento, etc. Se perderá el historial de tus
            interacciones, publicaciones de casos, cualquier otra actividad
            realizada en nuestra plataforma. Se perderan las configuraciones
            personalizadas, preferencias de cuenta, filtros aplicados, etc. Se
            perderán cualquier beneficio, suscripción, crédito o privilegio
            asociado con tu cuenta.
          </Typography>
          <br />
          <Typography variant="subtitle1" align="justify">
            Por favor, ten en cuenta que esta acción es irreversible y no
            podremos recuperar tus datos una vez que se haya completado la
            eliminación de la cuenta. Si tienes alguna preocupación o pregunta
            sobre este proceso, te recomendamos que nos contactes antes de
            proceder. Si estás seguro/a de que deseas eliminar tu cuenta y
            comprendes las implicaciones mencionadas anteriormente puede
            proceder. Gracias por tu comprensión y por ser parte de nuestra
            comunidad. Valoramos tu confianza en nosotros y estamos aquí para
            ayudarte en cualquier momento.
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "red",
            marginLeft: isMediumScreen ? "7rem" : "2rem",
            "&:hover": { backgroundColor: "#8b0000" },
          }}
          onClick={handleModalOpen}
        >
          Eliminar cuenta
        </Button>

        <Modal keepMounted open={modalOpen} onClose={handleModalClose}>
          <Box sx={style}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <Box sx={{ width: "100%", height: "100%" }}>
                <Formik
                  initialValues={{}}
                  validationSchema={passwordSchema}
                  //Aqui el onsubmit
                  onSubmit={() => console.log("adios")}
                >
                  {({ handleSubmit, isValid, dirty }) => (
                    <Form onSubmit={handleSubmit}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <WarningIcon
                          sx={{ color: "red", width: "2rem", height: "2rem" }}
                        ></WarningIcon>
                      </Box>
                      <Typography variant="subtitle1">
                        Confirme su contrasena para saber que es usted el que
                        intenta eliminar {<br />} la cuenta
                      </Typography>
                      <SettingsInput
                        label="Contrasena"
                        name="contrasena"
                        placeHolder="Escriba su contrasena"
                      />

                      <Button
                        sx={{ mt: "0.5rem", backgroundColor: "#52b69a" }}
                        fullWidth
                        variant="contained"
                        type="submit"
                        //disabled={!isValid}
                        onClick={() => {
                          Swal.fire({
                            title: "¿Estás seguro?",
                            text: `Si procede con esta accion de eliminacion no hay vuelta atras`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#52b69a",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Acepto",
                            cancelButtonText: "Cancelar",
                            customClass: {
                              container: SweetAlertDAStyle.sweetAlertContainer,
                            },
                            allowOutsideClick: () => !Swal.isLoading(),
                            allowEscapeKey: () => !Swal.isLoading(),
                            allowEnterKey: () => !Swal.isLoading(),
                            stopKeydownPropagation: false,
                          }).then((result) => {
                            if (result.isConfirmed && isValid && dirty) {
                              destroy_account(id).then(({ success, message }) => {
                                if (success) {
                                  handleModalClose();
                                  Swal.fire({
                                    title: "Se ha elimando",
                                    text: "Tu cuenta se ha eliminado de forma sastifactoria.",
                                    icon: "success",
                                    customClass: {
                                      container:
                                        SweetAlertDAStyle.sweetAlertContainer,
                                    },
                                  }).finally(() => navigate("/"));
                                } else {
                                  Swal.fire({
                                    title: "Ha ocurrido un error",
                                    text: "La contrasena es incorrecta",
                                    icon: "warning",
                                    customClass: {
                                      container:
                                        SweetAlertDAStyle.sweetAlertContainer,
                                    },
                                  });
                                }
                              })
                            }
                          });
                        }}
                      >
                        Confirmar
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
      <BannerSnackbar status={statusCode} message={message} isOpen={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default DeleteAccount;
