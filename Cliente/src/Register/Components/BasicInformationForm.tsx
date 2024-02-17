import React from "react";
import RegistrationControl from "./forms-control/RegistratioControl";
import { red } from "@mui/material/colors";

interface IBasicInformationForm {
type:string
}

const BasicInformationForm: React.FC<IBasicInformationForm> = ({type = "paciente"}) => {
    return (
        <>
            <div>
                <div>
                    <RegistrationControl
                        control="input"
                        label="Nombre"
                        name="nombre" />
                </div>
                <div>
                    <RegistrationControl
                        control="input"
                        label="Apellido"
                        name="apellido" />
                </div>

                { type == "paciente" ?
                <div><RegistrationControl
                        control="input"
                        label="Cedula"
                        name="Cedula" />

                </div>: "especialista" ? 
                <div> <RegistrationControl
                        control="input"
                        label="Especialidad"
                        name="especialidad"  />
                </div>
                : <div style={{color:"red"}}>Tipo no encontrado</div>
                }

            </div>
        </>
    )
}

export default BasicInformationForm;