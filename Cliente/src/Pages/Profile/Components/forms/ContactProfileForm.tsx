import React from "react";
import Box from "@mui/material/Box/Box";
import ProfileControl from "../forms-control/ProfileControl";

interface IContactProfileForm {
    profileValues:Record<string, any>;
}


const ContactProfileForm: React.FC<IContactProfileForm> = ({profileValues}) => {
    return (
        <>

            <Box>
                <ProfileControl
                    value={profileValues["telefono"]}
                    control="input"
                    label="Telefono"
                    name="telefono"
                    type="number"
                    placeholder="Escriba su telefono" />
            </Box>
            <Box>
                <ProfileControl
                    value={profileValues["direccion"]}
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

