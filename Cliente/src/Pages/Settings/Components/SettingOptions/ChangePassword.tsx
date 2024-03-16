
import Box from "@mui/material/Box/Box";
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import * as React from 'react';
import Swal from "sweetalert2";
import { Form, Formik } from 'formik'
import WarningIcon from '@mui/icons-material/Warning';
import SweetAlertDAStyle from "../../../Profile/style/profileStyle.module.css"
import WestIcon from '@mui/icons-material/West';
import Modal from "@mui/material/Modal/Modal";
import SettingsInput from "../inputElements/SettingsInput";
import Grid from "@mui/material/Grid/Grid";

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

const ChangePassword: React.FC = () => {

    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
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
                        //validationSchema={}
                        onSubmit={() => console.log("adios")}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Typography variant="h6" sx={{ padding: "3rem 0 0 5rem" }}>Cambiar contrasena</Typography>
                                <Typography variant="subtitle1" sx={{ color: "gray", margin: "1px 0 0 5rem" }}>Su nueva contrasena debe ser diferente a la contrasena actual</Typography>
                                <Grid container>
                                    <Grid item md={6}>
                                        <Box sx={{ marginLeft:"5rem"}}>
                                            <SettingsInput label="Contrasena actual" name="contrasenaActual" placeHolder="Escriba su contrasena actual" />
                                            <SettingsInput label="Nueva contrasena" name="contrasenaNueva" placeHolder="Escriba su nueva contrasena" />
                                            <SettingsInput label="Confirmar nueva contrasena" name="confirmarContrasenaNueva" placeHolder="coonfirme su nueva contrasena" />
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} >
                                    <Box sx={{marginRight:"6rem", color:"gray"}}>
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

                                <Button sx={{ mt: "1rem", marginLeft:"5rem", backgroundColor: "#52b69a" }}

                                    variant="contained"
                                    type="submit"
                                    //disabled={!isValid}
                                    onClick={() => {
                                        console.log("submited")
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