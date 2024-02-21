import React from "react";
import RegistrationControl from "../forms-control/RegistratioControl";
import { Box, Typography } from "@mui/material";

const ContactInformationForm: React.FC = () => {
    return (
        <>
            <Box>
            <Box sx={{ textAlign: "center" }}><Typography variant={"h5"}>Informacion de contacto</Typography></Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Telefono"
                        name="Escriba su telefono" />
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Correo"
                        name="correo" 
                        placeholder="Escriba su correo"/>
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Contrasena"
                        name="contrasena" 
                        placeholder="Escriba su contrasena"/>
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Confirmar contrasena"
                        name="confirmarContrasena"
                        placeholder="Reescriba su contrasena" />
                </Box>

            </Box>
        </>
    )
}

export default ContactInformationForm;