import React from "react";
import RegistrationControl from "../forms-control/RegistratioControl";
import { Box, Typography } from "@mui/material";

const FinancialInformationForm: React.FC = () => {
    return (
        <>
            <Box>
            <Box sx={{ textAlign: "center" }}><Typography variant={"h5"}>Informacion Financiera</Typography></Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Monto"
                        name="monto"
                        placeholder="Escriba su monto" />
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
                        placeholder="Escriba su tarjeta"/>
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="CVV"
                        name="cvv" 
                        placeholder="Escriba su cvv"/>
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
                        placeholder="Escriba su descripcion"/>
                </Box>

            </Box>
        </>
    )
}

export default FinancialInformationForm;