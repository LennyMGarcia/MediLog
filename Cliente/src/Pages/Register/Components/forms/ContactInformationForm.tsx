import React from "react";
import RegistrationControl from "../forms-control/RegistratioControl";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";


const ContactInformationForm: React.FC = () => {
    return (
        <>
            <Box>
            <Box sx={{ textAlign: "center" }}><Typography variant={"h5"}>Informacion de contacto</Typography></Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Telefono (opcional)"
                        name="telefono"
                        type="number"
                        placeholder="Escriba su telefono" />
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
                        type="password"
                        placeholder="Escriba su contrasena"/>
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Confirmar contrasena"
                        name="confirmarContrasena"
                        type="password"
                        placeholder="Reescriba su contrasena" />
                </Box>

            </Box>
        </>
    )
}

export default ContactInformationForm;