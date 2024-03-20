import React from "react";
import Box from "@mui/material/Box/Box";

import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";
import SPCaseMultiInput from "../forms-control/SpecificCaseMultiInput";
import SPCaseInput from "../forms-control/SpecificCaseInput";
import { Typography } from "@mui/material";
import { Dayjs } from "dayjs";

interface ConsultationForm<T> {
    profileValues?: Record<string, any>;
    setOfZustandCallback?: (name: string, value: T) => void;
    getOfZustandCallback?: (name: string | Dayjs) => T;
}

const ConsultationForm: React.FC<ConsultationForm<any>> = ({ profileValues, setOfZustandCallback, getOfZustandCallback }) => {
    return (
        <>
            <Typography variant="h6">Registre su consulta</Typography>
            <Box>
                <SPCaseInput
                    zustandCallback={setOfZustandCallback}
                    label="Motivo"
                    name="motivo"
                    placeholder="Escriba su motivo"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    zustandCallback={setOfZustandCallback}
                    label="Pacientes"
                    name="pacientes"
                    placeholder="Escriba su paciente"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    zustandCallback={setOfZustandCallback}
                    label="Especialistas"
                    name="especialistas"
                    placeholder="Escriba su especialista"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    zustandCallback={setOfZustandCallback}
                    label="Estudios"
                    name="estudios"
                    placeholder="Escriba su estudio"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    zustandCallback={setOfZustandCallback}
                    label="Observaciones"
                    name="observaciones"
                    placeholder="Escriba sus observaciones"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    zustandCallback={setOfZustandCallback}
                    label="Plan de tratamiento"
                    name="plan_tratamiento"
                    placeholder="Escriba su tratamiento"
                />
            </Box>
        </>
    )
}

export default ConsultationForm;