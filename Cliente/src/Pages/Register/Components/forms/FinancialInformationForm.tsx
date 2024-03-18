import React from "react";
import RegistrationControl from "../forms-control/RegistratioControl";

import useDataRegisterStore from "../../ZustandRegisterManagement";
import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

const FinancialInformationForm: React.FC = () => {
    const { getRegisterData } = useDataRegisterStore();

    return (
        <>
            <Box>
                <Box sx={{ textAlign: "center" }}><Typography variant={"h5"}>{"Información Financiera (opcional)"}</Typography></Box>

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
                        label="Categoría"
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
                            { key: "Tarjeta de crédito", value: "Tarjeta de Credito" },
                            { key: "Tarjeta de débito", value: "Tarjeta de Debito" },
                        ]}
                    />
                </Box>
                <BoxRowWrapper>
                    <RegistrationControl
                        control="input"
                        label="Número de tarjeta"
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
                        label="Fecha de expiración"
                        name="fecha_expiracion" />
                </Box>
                <Box>
                    <RegistrationControl
                        control="input"
                        label="Descripción"
                        name="descripcion"
                        type="textarea"
                        placeholder="Escriba su descripción" />
                </Box>

            </Box>
        </>
    )
}

export default FinancialInformationForm;