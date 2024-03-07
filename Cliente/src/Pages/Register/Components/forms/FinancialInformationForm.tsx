import React from "react";
import RegistrationControl from "../forms-control/RegistratioControl";

import useDataRegisterStore from "../../ZustandRegisterManagement";
import BoxRowWrapper from "../style/Wrappers/BoxRowWrapper";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

const FinancialInformationForm: React.FC = () => {
    const { getRegisterData } = useDataRegisterStore();

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <>
            <Box>
                <Box sx={{ textAlign: "center" }}><Typography variant={"h5"}>{"Informacion Financiera (opcional)"}</Typography></Box>

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

                <Box sx={{ marginLeft:isMediumScreen? "0" :"2rem"}}>
                    <RegistrationControl
                        control="select"
                        label="Metodo de pago"
                        name="metodo_pago"
                        selectObject={[
                            { key: "Tarjeta de credito", value: "Tarjeta de Credito" },
                            { key: "Tarjeta de debito", value: "Tarjeta de Debito" },
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

                <Box sx={{ marginLeft:isMediumScreen? "0" :"2rem"}}>
                    <RegistrationControl
                        control="date"
                        label="Fecha de expiracion"
                        name="fecha_expiracion" />
                </Box>
                <Box sx={{ marginLeft:isMediumScreen? "0" :"2rem"}}>
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