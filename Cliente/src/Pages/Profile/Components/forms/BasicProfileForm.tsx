import React from "react";
import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";
import Box from "@mui/material/Box/Box";
import ProfileControl from "../forms-control/ProfileControl";


interface IBasicInformationForm {
    type: string,
    profileValues:Record<string, any>;
}

const BasicProfileForm: React.FC<IBasicInformationForm> = ({ type = "paciente", profileValues }) => {
    return (
        <>
            <BoxRowWrapper  >
                <ProfileControl
                    value={profileValues["nombre"]}
                    control="input"
                    label="Nombre"
                    name="nombre"
                    placeholder=" Escriba su nombre"
                />
                <ProfileControl
                    value={profileValues["apellido"]}
                    control="input"
                    label="Apellido"
                    name="apellido"
                    placeholder="Escriba su apellido"
                />
            </BoxRowWrapper>

            <Box>
                <ProfileControl
                    value={profileValues["sexo"]}
                    control="select"
                    label="Sexo"
                    name="sexo"
                    selectObject={[
                        { key: "Hombre", value: "m" },
                        { key: "Mujer", value: "f" },

                    ]}
                />
            </Box>

            <Box>
                <ProfileControl
                    
                    control="date"
                    label="Fecha de nacimiento"
                    name="fecha_nacimiento" />
            </Box>

            {type == "Paciente" ?
                <Box>
                    <ProfileControl
                        value={profileValues["documento_identidad"]}
                        control="input"
                        label="Cedula"
                        name="documento_identidad"
                        placeholder="Escriba su cedula"
                    />

                    <ProfileControl
                        control="input"
                        label="Tipo de sangre" //select
                        name="tipo_sangre"
                        placeholder="Escriba su cedula"
                    />

                    <ProfileControl
                        Values={profileValues["padecimientos"]}
                        control="multiInput"
                        label="Padecimientos"
                        name="padecimientos"
                        placeholder="Escriba su padecimiento"
                    />

                    <ProfileControl
                        Values={profileValues["alergias"]}
                        control="multiInput"
                        label="Alergias"
                        name="alergias"
                        placeholder="Escriba su alergia"
                    />

                    <ProfileControl
                        Values={profileValues["familiares"]}
                        control="multiInput"
                        label="Familiares"
                        name="familiares"
                        placeholder="Escriba su familiar"
                    />

                </Box>
                : type == "Especialista" ?
                    <Box>
                        <ProfileControl
                            value={profileValues["especialidad"]}
                            control="input"
                            label="Especialidad"
                            name="especialidad"
                            placeholder="Escriba su especialidad"
                        />
                    </Box>
                    : <Box></Box>}
        </>
    )
}

export default BasicProfileForm;




