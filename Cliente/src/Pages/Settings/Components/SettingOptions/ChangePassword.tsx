
import Box from "@mui/material/Box/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router";

import * as React from 'react';
import Swal from "sweetalert2";
import { Form, Formik } from 'formik'
import SweetAlertDAStyle from "../../../Profile/style/profileStyle.module.css"
import WestIcon from '@mui/icons-material/West';
import SettingsInput from "../inputElements/SettingsInput";
import Grid from "@mui/material/Grid/Grid";
import * as Yup from 'yup'
import usePasswordStore, { getAllPasswordData } from "../../stateManagement/passwordStateManagement";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import getBackendConnectionString from "../../../../Common/Utils/getBackendString";
import axios from "axios";
import useUserStore from "../../../../Common/Utils/setUserSession";

//Si necesitas cambiar un valor seria en la parte donde dice value, solo retorna un objeto yup esto, lo unico que cambia es el test
//
/*const getPasswordSchema = (contrasenaFromDatabase: string) => {
    return Yup.object({
        contrasenaActual: Yup.string()
        .test('password-match', 'La contraseña actual es incorrecta', value => value === contrasenaFromDatabase)
            .required('Required'),
        contrasenaNueva: Yup.string()
            .min(8, 'La nueva  contraseña debe tener al menos 8 caracteres')
            .max(24, 'La contraseña no debe superar los 24 caracteres')
            .required('Required'),
        confirmarNuevaContrasena: Yup.string()
            .oneOf([Yup.ref('contrasenaNueva'), undefined], 'La nueva contraseña debe coincidir')
            .required('Required'),
    });
//Aqui es donde tienes que sacar la contrasena, para pasarla el getPassword esquema
};
*/
//const contrasenaFromDatabase = 'password';

//const passwordSchema = getPasswordSchema(contrasenaFromDatabase);


// BENJUNIOR DICE -- Comente esa parte porque la contrasena esta hasheada, ese no seria el metodo para verificar si la actual, ese metodo no es tan seguro


const getPasswordSchema = () => {
    return Yup.object({
        contrasenaActual: Yup.string()
            .required('Required'),
        contrasenaNueva: Yup.string()
            .min(8, 'La nueva  contraseña debe tener al menos 8 caracteres')
            .max(24, 'La contraseña no debe superar los 24 caracteres')
            .required('Required'),
        confirmarNuevaContrasena: Yup.string()
            .oneOf([Yup.ref('contrasenaNueva'), undefined], 'La nueva contraseña debe coincidir')
            .required('Required'),
    });
};



const passwordSchema = getPasswordSchema();

const ChangePassword: React.FC = () => {

    const { authenticated } = useUserStore();
    const { getUser } = useUserStore();

    const id = authenticated() ? getUser().id : null;
    const correo = authenticated() ? getUser().correo : null;

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    //Lo mismo que los objetos zustand de siempre
    const { setPasswordData, getPasswordData } = usePasswordStore()

    const navigate = useNavigate();

    const change_password = async (currentPass: string, newPass: string) => {
        console.log(currentPass);
        console.log(newPass);
        const result = await axios.put(getBackendConnectionString(`usuarios/password/${id}`), {
            correo: correo,
            currentPass: currentPass,
            newPass: newPass
        }).then(response => {
            console.log(response);
            if (response.status === 201 || response.status === 200) {
                return { success: true, message: response.statusText };
            }
            return { success: false, message: response.statusText };

        }).catch(error => {
            const error_msj = error?.response?.data?.message;
            console.log(error);
            console.log(error_msj);
            return { success: false, message: error_msj };
        });

        return result;
    }

    return (
        <Box sx={{
            backgroundColor: "#e9ecef",
            width: "100vw",
            height: isMediumScreen ? "110rem" : "150vh",
            padding: "1px"
        }}>
            <Box sx={{
                backgroundColor: "#fff",
                width: "100vw",
                height: "10vh",
                boxShadow: 1,
                padding: "1px",
                display: "flex",
                justifyContent: "left",
                alignItems: "center"

            }}>
                <Button onClick={() => navigate("/settings")} sx={{
                    color: "#52b69a", "&:hover": {
                        backgroundColor: "#ffeffe",
                        color: "#34a0a4"
                    }
                }}>
                    <WestIcon sx={{ margin: "0.7rem", marginLeft: "3rem" }}></WestIcon>
                </Button>
                <Typography variant="h5" sx={{ margin: "0.7rem", marginLeft: "0.5rem" }}>Cambiar contraseña</Typography>
            </Box>

            <Box sx={{
                backgroundColor: "#fff",
                width: isMediumScreen ? "20vw" : '80vw',
                height: "5vh",
                boxShadow: 1,
                margin: isMediumScreen ? "3rem 0 0 3rem" : "3rem 0 0 0",
                display: "flex", justifyContent: "center", alignItems: "center",
                borderStartStartRadius: "1rem",
                borderTopRightRadius: "1rem"
            }}>
                <SettingsIcon sx={{ color: "gray", width: "1rem", height: "1rem", paddingRight: "0.5rem" }} /><Typography variant="subtitle1" sx={{ color: "gray" }}>configuracion / Cambiar contraseña</Typography>
            </Box>

            <Box sx={{
                backgroundColor: "#fff",
                width: isMediumScreen ? "90vw" : "100vw",
                height: isMediumScreen ? "90vh" : "115vh",
                boxShadow: 1,
                marginLeft: isMediumScreen ? "3rem" : 0
            }}>
                <Box>
                    <Formik
                        initialValues={{}}
                        validationSchema={passwordSchema}
                        onSubmit={() => console.log("adios")}
                    >
                        {({ handleSubmit, isValid, dirty }) => (
                            <Form onSubmit={handleSubmit}>
                                <Typography variant="h6" sx={{ padding: isMediumScreen ? "3rem 0 0 5rem" : "3rem 0 0 2rem" }}>Cambiar contraseña</Typography>
                                <Typography variant="subtitle1" sx={{ color: "gray", margin: isMediumScreen ? "1px 0 0 5rem" : "0 3rem 0 3rem" }}>Su nueva contraseña debe ser diferente a la contraseña actual</Typography>
                                <Grid container>
                                    <Grid item md={6} xs={12}>
                                        <Box sx={{ marginLeft: isMediumScreen ? "5rem" : "2rem" }}>
                                            <SettingsInput zustandCallback={setPasswordData} label="Contraseña actual" name="contrasenaActual" placeHolder="Escriba su contrasena actual" />
                                            {/*Ojo con este, aqui hay un zustandCallback, si quieres cambiar algo 
                                            en el state management siempre sera correcto por la tipificacion*/}
                                            <SettingsInput zustandCallback={setPasswordData} label="Nueva contrasena" name="contrasenaNueva" placeHolder="Escriba su nueva contrasena" />
                                            <SettingsInput label="Confirmar nueva contraseña" name="confirmarNuevaContrasena" placeHolder="coonfirme su nueva contrasena" />
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Box sx={{ margin: isMediumScreen ? " 0 6rem 0 0" : " 1rem 2rem", color: "gray" }}>
                                            <Typography variant="subtitle1">La nueva contraseña debe seguir los siguientes parametros de nuestra politica de contrasena</Typography>
                                            <ul>
                                                <li><Typography variant="subtitle1">La contraseña debe tener minimo 6 caracteres</Typography></li>
                                                <li><Typography variant="subtitle1">La contraseña debe tener maximo 24 caracteres</Typography></li>
                                                <li><Typography variant="subtitle1">Se prefiera que no se utilice una cuenta del 1 hasta el 9
                                                    y que se eviten claves como fecha de nacimiento sin anadir algo
                                                    para que la contraseña sea mas segura</Typography></li>
                                            </ul>
                                        </Box>

                                    </Grid>
                                </Grid>

                                <Button sx={{ mt: "1rem", marginLeft: isMediumScreen ? "5rem" : '2rem', backgroundColor: "#52b69a", "&:hover": { backgroundColor: "#34a0a4" } }}

                                    variant="contained"
                                    type="submit"
                                    //disabled={!isValid}
                                    onClick={() => {
                                        //AQUI EL CONSOLE LOG SI LO QUIERES ELIMINAR
                                        console.log(getAllPasswordData());

                                        Swal.fire({
                                            title: '¿Estás seguro?',
                                            text: `Si procede con esta accion modificaras tu contraseña`,
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#52b69a',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Acepto',
                                            cancelButtonText: 'Cancelar',
                                            customClass: {
                                                container: SweetAlertDAStyle.sweetAlertContainer,
                                            },
                                            allowOutsideClick: () => !Swal.isLoading(),
                                            allowEscapeKey: () => !Swal.isLoading(),
                                            allowEnterKey: () => !Swal.isLoading(),
                                            stopKeydownPropagation: false,

                                        }).then((result) => {
                                            if (result.isConfirmed && isValid && dirty) {
                                                change_password(getPasswordData('contrasenaActual'), getPasswordData('contrasenaNueva')).then(({ success, message }) => {
                                                    if (success) {
                                                        Swal.fire({
                                                            title: 'Se ha actualizado la contraseña',
                                                            text: 'La contraseña se ha cambiado de forma exitosa.',
                                                            icon: 'success',
                                                            customClass: {
                                                                container: SweetAlertDAStyle.sweetAlertContainer,
                                                            }
                                                        }).then(onsubmit => {
                                                            navigate('/settings');
                                                            return onsubmit;
                                                        });
                                                    } else {
                                                        Swal.fire({
                                                            title: 'Hubo un problema',
                                                            text: message,
                                                            icon: 'warning',
                                                            customClass: {
                                                                container: SweetAlertDAStyle.sweetAlertContainer,
                                                            }
                                                        });
                                                    }
                                                })
                                            }
                                            else {
                                                Swal.fire({
                                                    title: 'Hubo un problema',
                                                    text: 'Las nuevas contraseñas no siguen los parametros establecidos y tu contraseña actual es incorrecta',
                                                    icon: 'warning',
                                                    customClass: {
                                                        container: SweetAlertDAStyle.sweetAlertContainer,
                                                    }
                                                });
                                            }
                                        })
                                    }}
                                >
                                    Confirmar
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </Box>


            </Box>
        </Box >
    );

};

//un cambio

export default ChangePassword;