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
                        name="telefono" />
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Correo"
                        name="correo" />
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Contrasena"
                        name="contrasena" />
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Confirmar contrasena"
                        name="confirmarContrasena" />
                </Box>

            </Box>
        </>
    )
}

export default ContactInformationForm;