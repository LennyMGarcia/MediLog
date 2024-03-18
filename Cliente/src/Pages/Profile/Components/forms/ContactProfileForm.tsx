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
                    initialValue={profileValues["telefono"]}
                    control="input"
                    label="Teléfono"
                    name="telefono"
                    type="number"
                    placeholder="Escriba su teléfono" />
            </Box>
            <Box>
                <ProfileControl
                    initialValue={profileValues["direccion"]}
                    control="input"
                    label="Dirección"
                    name="direccion"
                    placeholder="Escriba su dirección"
                    multiline
                    rows={4} />
            </Box>
        </>
    )
}

export default ContactProfileForm;

