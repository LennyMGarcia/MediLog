import React from "react";
import RegistrationControl from "../forms-control/RegistratioControl";
import { Box, Typography } from "@mui/material";
import useDataRegisterStore from "../../ZustandRegisterManagement";

const FinancialInformationForm: React.FC = () => {
    const { getRegisterData } = useDataRegisterStore();

    return (
        <>
            <Box>
                <Box sx={{ textAlign: "center" }}><Typography variant={"h5"}>Informacion Financiera</Typography></Box>

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
                        label="Monto"
                        name="monto"
                        disabled
                        value={getRegisterData("monto")}
                        />

                    <RegistrationControl
                        control="input"
                        label="Categoria"
                        name="categoria"
                        disabled
                        value={getRegisterData("categoria")}
                        />

                </Box>


                <Box>
                    <RegistrationControl
                        control="select"
                        label="Metodo de pago"
                        name="metodo_pago"
                        selectObject={[
                            { key: "Tarjeta de credito", value: "Tarjeta de credito" },
                            { key: "Tarjeta de debito", value: "Tarjeta de debito" },

                        ]}
                    />
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Tarjeta de credito "
                        name="datos_financieros"
                        placeholder="Escriba su tarjeta" />
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="CVV"
                        name="cvv"
                        placeholder="Escriba su cvv" />
                </Box>
                <Box>
                    <RegistrationControl
                        control="date"
                        label="Fecha de expiracion"
                        name="fecha_expiracion" />
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Descripcion"
                        name="descripcion"
                        type="textarea"
                        placeholder="Escriba su descripcion" />
                </Box>

            </Box>
        </>
    )
}

export default FinancialInformationForm;