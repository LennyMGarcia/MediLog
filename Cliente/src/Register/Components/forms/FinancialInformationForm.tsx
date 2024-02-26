import React from "react";
import RegistrationControl from "../forms-control/RegistratioControl";
import { Box, Typography } from "@mui/material";
import useDataRegisterStore from "../../ZustandRegisterManagement";
import BoxRowWrapper from "../style/Wrappers/BoxRowWrapper";

const FinancialInformationForm: React.FC = () => {
    const { getRegisterData } = useDataRegisterStore();

    return (
        <>
            <Box>
                <Box sx={{ textAlign: "center" }}><Typography variant={"h5"}>Informacion Financiera</Typography></Box>

                <BoxRowWrapper>
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
                </BoxRowWrapper>

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
                <BoxRowWrapper>
                    <RegistrationControl
                        control="input"
                        label="Tarjeta de credito "
                        name="datos_financieros"
                        placeholder="Escriba su tarjeta" 
                        />
            
                    <RegistrationControl
                        control="input"
                        label="CVV"
                        name="cvv"
                        placeholder="Escriba su cvv" 
                        />
                </BoxRowWrapper>

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