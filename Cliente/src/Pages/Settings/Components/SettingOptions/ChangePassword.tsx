
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

//Si necesitas cambiar un valor seria en la parte donde dice value, solo retorna un objeto yup esto, lo unico que cambia es el test
const getPasswordSchema = (contrasenaFromDatabase: string) => {
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
};

//Aqui es donde tienes que sacar la contrasena, para pasarla el getPassword esquema
const contrasenaFromDatabase = 'zxc123456789';

const passwordSchema = getPasswordSchema(contrasenaFromDatabase);

const ChangePassword: React.FC = () => {

    //Lo mismo que los objetos zustand de siempre
    const {setPasswordData} = usePasswordStore()

    const navigate = useNavigate();

    return (
        <Box sx={{
            backgroundColor: "#e9ecef",
            width: "100vw",
            height: "120vh",
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
                <Typography variant="h5" sx={{ margin: "0.7rem", marginLeft: "0.5rem" }}>Cambiar contrasena</Typography>
            </Box>

            <Box sx={{
                backgroundColor: "#fff",
                width: "20vw",
                height: "5vh",
                boxShadow: 1,
                margin: "3rem 0 0 3rem",
                display: "flex", justifyContent: "center", alignItems: "center",
                borderStartStartRadius: "1rem",
                borderTopRightRadius: "1rem"
            }}>
                <SettingsIcon sx={{ color: "gray", width: "1rem", height: "1rem", paddingRight: "0.5rem" }} /><Typography variant="subtitle1" sx={{ color: "gray" }}>configuracion / Cambiar contrasena</Typography>
            </Box>

            <Box sx={{
                backgroundColor: "#fff",
                width: "90vw",
                height: "90vh",
                boxShadow: 1,
                marginLeft: "3rem"
            }}>
                <Box>
                    <Formik
                        initialValues={{}}
                        validationSchema={passwordSchema}
                        onSubmit={() => console.log("adios")}
                    >
                        {({ handleSubmit, isValid, dirty }) => (
                            <Form onSubmit={handleSubmit}>
                                <Typography variant="h6" sx={{ padding: "3rem 0 0 5rem" }}>Cambiar contrasena</Typography>
                                <Typography variant="subtitle1" sx={{ color: "gray", margin: "1px 0 0 5rem" }}>Su nueva contrasena debe ser diferente a la contrasena actual</Typography>
                                <Grid container>
                                    <Grid item md={6}>
                                        <Box sx={{ marginLeft: "5rem" }}>
                                            <SettingsInput  label="Contrasena actual" name="contrasenaActual" placeHolder="Escriba su contrasena actual" />
                                            {/*Ojo con este, aqui hay un zustandCallback, si quieres cambiar algo 
                                            en el state management siempre sera correcto por la tipificacion*/}
                                            <SettingsInput zustandCallback={setPasswordData} label="Nueva contrasena" name="contrasenaNueva" placeHolder="Escriba su nueva contrasena" />
                                            <SettingsInput label="Confirmar nueva contrasena" name="confirmarNuevaContrasena" placeHolder="coonfirme su nueva contrasena" />
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} >
                                        <Box sx={{ marginRight: "6rem", color: "gray" }}>
                                            <Typography variant="subtitle1">La nueva contrasena debe seguir los siguientes parametros de nuestra politica de contrasena</Typography>
                                            <ul>
                                                <li><Typography variant="subtitle1">La contrasena debe tener minimo 8 caracteres</Typography></li>
                                                <li><Typography variant="subtitle1">La contrasena debe tener maximo 24 caracteres</Typography></li>
                                                <li><Typography variant="subtitle1">Se prefiera que no se utilice una cuenta del 1 hasta el 9
                                                    y que se eviten claves como fecha de nacimiento sin anadir algo
                                                    para que la contrasena sea mas segura</Typography></li>
                                            </ul>
                                        </Box>

                                    </Grid>
                                </Grid>

                                <Button sx={{ mt: "1rem", marginLeft: "5rem", backgroundColor: "#52b69a", "&:hover": { backgroundColor: "#34a0a4" } }}

                                    variant="contained"
                                    type="submit"
                                    //disabled={!isValid}
                                    onClick={() => {
                                        //AQUI EL CONSOLE LOG SI LO QUIERES ELIMINAR
                                        console.log(getAllPasswordData());
                                        Swal.fire({
                                            title: '¿Estás seguro?',
                                            text: `Si procede con esta accion modificaras tu contrasena`,
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


                                                Swal.fire({
                                                    title: 'Se ha actualizado la contrasena',
                                                    text: 'La contrasena se ha cambiado de forma exitosa.',
                                                    icon: 'success',
                                                    customClass: {
                                                        container: SweetAlertDAStyle.sweetAlertContainer,
                                                    }
                                                });
                                            }
                                            else {
                                                Swal.fire({
                                                    title: 'Hubo un problema',
                                                    text: 'Las nuevas contrasenas no siguen los parametros establecidos y tu contrasena actual es incorrecta',
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
        </Box>
    );
};


export default ChangePassword;