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
                            maxWidth: { xs: '100vw', md: '15rem'}, 
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
                    />
                    <RegistrationControl
                        control="input"
                        label="Apellido"
                        name="apellido"
                    />
                </Box>


                <Box>
                    <RegistrationControl
                        control="select"
                        label="Sexo"
                        name="Sexo"
                        selectObject={[
                            { key: "Hombre", value: "m" },
                            { key: "Mujer", value: "f" },

                        ]}
                    />
                </Box>

                {type == "paciente" ?
                    <Box><RegistrationControl
                        control="input"
                        label="Cedula"
                        name="Cedula" />

                    </Box> : "especialista" ?
                        <Box> <RegistrationControl
                            control="input"
                            label="Especialidad"
                            name="especialidad" />
                        </Box>
                        : <Box style={{ color: "red" }}>Tipo no encontrado</Box>
                }

            </Box>
        </>
    )
}

export default BasicInformationForm;