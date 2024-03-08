import React from "react";
import Box from "@mui/material/Box/Box";
import ProfileControl from "../forms-control/ProfileControl";

const ContactProfileForm: React.FC = () => {
    return (
        <>

            <Box>
                <ProfileControl
                    control="input"
                    label="Telefono"
                    name="telefono"
                    type="number"
                    placeholder="Escriba su telefono" />
            </Box>
            <Box>
                <ProfileControl
                    control="input"
                    label="Correo"
                    name="correo"
                    placeholder="Escriba su correo" />
            </Box>
            <Box>
                <ProfileControl
                    control="input"
                    label="Direccion"
                    name="direccion"
                    placeholder="Escriba su direccion"
                    multiline
                    rows={4} />
            </Box>
        </>
    )
}

export default ContactProfileForm;

