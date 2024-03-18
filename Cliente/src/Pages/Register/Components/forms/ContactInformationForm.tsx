import React from "react";
import RegistrationControl from "../forms-control/RegistratioControl";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";


const ContactInformationForm: React.FC = () => {
    return (
        <>
            <Box>
            <Box sx={{ textAlign: "center" }}><Typography variant={"h5"}>Información de contacto</Typography></Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Teléfono (opcional)"
                        name="telefono"
                        type="number"
                        placeholder="Escriba su teléfono" />
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
                        label="Contraseña"
                        name="contrasena" 
                        type="password"
                        placeholder="Escriba su contraseña"/>
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Confirmar contraseña"
                        name="confirmarContrasena"
                        type="password"
                        placeholder="Reescriba su contraseña" />
                </Box>

            </Box>
        </>
    )
}

export default ContactInformationForm;