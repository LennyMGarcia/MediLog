import React from "react";
import Box from "@mui/material/Box/Box";

import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";
import SPCaseMultiInput from "../forms-control/SpecificCaseMultiInput";
import SPCaseInput from "../forms-control/SpecificCaseInput";
import { Typography } from "@mui/material";

interface ConsultationForm {
    profileValues?: Record<string, any>;
}

const ConsultationForm: React.FC<ConsultationForm> = ({ profileValues }) => {
    return (
        <>
            <Typography variant="h6">Registre su consulta</Typography>
            <Box>
                <SPCaseInput
                    label="Motivo"
                    name="motivo"
                    placeholder="Escriba su motivo"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    label="Pacientes"
                    name="pacientes_id"
                    placeholder="Escriba su paciente"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    label="Especialistas"
                    name="especialistas_id"
                    placeholder="Escriba su especialista"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    label="Observaciones"
                    name="observaciones"
                    placeholder="Escriba sus observaciones"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    label="Plan de tratamiento"
                    name="plan_tratamiento"
                    placeholder="Escriba su tratamiento"
                />
            </Box>
        </>
    )
}

export default ConsultationForm;