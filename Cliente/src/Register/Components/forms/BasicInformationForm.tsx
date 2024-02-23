import React from "react";
import RegistrationControl from "../forms-control/RegistratioControl";
import { Box, Typography } from "@mui/material";


interface IBasicInformationForm {
    type: string
}

const BasicInformationForm: React.FC<IBasicInformationForm> = ({ type = "paciente" }) => {
    return (
        <>
            <Box>
                <Box sx={{ textAlign: "center" }}><Typography variant={"h5"}>Informacion Basica</Typography></Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        '& > *': { //hijos directos
                            maxWidth: { xs: '100vw', md: '14rem' },
                            marginBottom: { xs: '0.625rem', md: 0 },
                            marginRight: { xs: 0, md: '0.938rem' },
                            flex: 1,
                        },
                    }}
                >
                    <RegistrationControl
                        control="input"
                        label="Nombre"
                        name="nombre"
                        placeholder=" Escriba su nombre"
                    />
                    <RegistrationControl
                        control="input"
                        label="Apellido"
                        name="apellido"
                        placeholder="Escriba su apellido"
                    />
                </Box>


                <Box>
                    <RegistrationControl
                        control="select"
                        label="Sexo"
                        name="sexo"
                        selectObject={[
                            { key: "Hombre", value: "m" },
                            { key: "Mujer", value: "f" },

                        ]}
                    />
                </Box>

                <Box><RegistrationControl
                    control="date"
                    label="Fecha de nacimiento"
                    name="fecha_nacimiento"

                />

                </Box>

                <Box>
                    <RegistrationControl
                        control="select"
                        label="Tipo de usuario"
                        name="tipo"
                        selectObject={[
                            { key: "Paciente", value: "Paciente" },
                            { key: "Especialista", value: "Especialista" },

                        ]}
                    />
                </Box>

                {type == "Paciente" ?
                    <Box>
                        <RegistrationControl
                            control="input"
                            label="Cedula"
                            name="documento_identidad"
                            placeholder="Escriba su cedula"
                        />
                    </Box> : type === "Especialista" ?
                        <Box>
                            <RegistrationControl
                                control="input"
                                label="Especialidad"
                                name="especialidad"
                                placeholder="Escriba su especialidad"
                            />
                        </Box>
                        : <Box></Box>
                }

            </Box>
        </>
    )
}

export default BasicInformationForm;