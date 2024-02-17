import React from "react";
import RegistrationControl from "./forms-control/RegistratioControl";

interface IUserForm {

}

const ContactInformationForm: React.FC<IUserForm> = () => {
    return (
        <>
            <div>
                <div>
                    <RegistrationControl
                        control="input"
                        label="Telefono"
                        name="telefono" />
                </div>
                <div>
                    <RegistrationControl
                        control="input"
                        label="Correo"
                        name="Correo" />
                </div>
                <div>
                    <RegistrationControl
                        control="input"
                        label="Contrasena"
                        name="contrasena" />
                </div>
                <div>
                    <RegistrationControl
                        control="input"
                        label="Confirmar contrasena"
                        name="ConfContrasena" />
                </div>

            </div>
        </>
    )
}

export default ContactInformationForm;