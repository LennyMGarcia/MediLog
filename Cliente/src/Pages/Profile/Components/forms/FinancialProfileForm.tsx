import React from "react";
import Box from "@mui/material/Box/Box";
import ProfileControl from "../forms-control/ProfileControl";
import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";

interface IFinancialProfileForm {
    profileValues: Record<string, any>;
}

const FinancialProfileForm: React.FC<IFinancialProfileForm> = ({ profileValues }) => {
    return (
        <>
            <BoxRowWrapper>
                <ProfileControl
                    initialValue={profileValues["precio"]}
                    control="input"
                    label="Monto"
                    name="monto"
                    disabled
                />
                <ProfileControl
                    initialValue={profileValues["categoria"]}
                    control="input"
                    label="Categoría"
                    name="categoria"
                    disabled
                />
            </BoxRowWrapper>

            <Box>
                <ProfileControl
                    initialValue={profileValues["metodo_pago"]}
                    control="select"
                    label="Metodo de pago"
                    name="metodo_pago"
                    selectObject={[
                        { key: "Tarjeta de Credito", value: "Tarjeta de Credito" },
                        { key: "Tarjeta de Debito", value: "Tarjeta de Debito" },
                    ]}
                />
            </Box>
            <BoxRowWrapper>
                <ProfileControl
                    initialValue={profileValues["datos_financieros"]}
                    control="input"
                    label="Tarjeta"
                    name="datos_financieros"
                    placeholder="Escriba su tarjeta"
                />

                <ProfileControl
                    initialValue={profileValues["cvv"]}
                    control="input"
                    label="CVV"
                    name="cvv"
                    placeholder="Escriba su cvv"
                />
            </BoxRowWrapper>

            <Box>
                <ProfileControl
                    initialDateValue={profileValues["fecha_expiracion"]}
                    control="date"
                    label="Fecha de expiracion"
                    name="fecha_expiracion" />
            </Box>
            <Box>
                <ProfileControl
                    initialValue={profileValues["descripcion"]}
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


