import React from "react";
import Box from "@mui/material/Box/Box";
import ProfileControl from "../forms-control/ProfileControl";
import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";

interface IFinancialProfileForm {
    profileValues:Record<string, any>;
}

const FinancialProfileForm: React.FC<IFinancialProfileForm> = ({profileValues}) => {
    return (
        <>
            <BoxRowWrapper>
                <ProfileControl
                    value={profileValues["monto"]}
                    control="input"
                    label="Monto"
                    name="monto"
                    disabled
                />
                <ProfileControl
                    value={profileValues["categoria"]}
                    control="input"
                    label="Categoria"
                    name="categoria"
                    disabled
                />
            </BoxRowWrapper>

            <Box>
                <ProfileControl
                    
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
                <ProfileControl
                    value={profileValues["datos_financieros"]}
                    control="input"
                    label="Tarjeta de credito "
                    name="datos_financieros"
                    placeholder="Escriba su tarjeta"
                />

                <ProfileControl
                value={profileValues["cvv"]}
                    control="input"
                    label="CVV"
                    name="cvv"
                    placeholder="Escriba su cvv"
                />
            </BoxRowWrapper>

            <Box>
                <ProfileControl
                    control="date"
                    label="Fecha de expiracion"
                    name="fecha_expiracion" />
            </Box>
            <Box>
                <ProfileControl
                    value={profileValues["descripcion"]}
                    control="input"
                    label="Descripcion"
                    name="descripcion"
                    multiline
                    rows={4}
                    placeholder="Escriba su descripcion" />
            </Box>


        </>
    )
}

export default FinancialProfileForm;


