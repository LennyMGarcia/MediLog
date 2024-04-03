import React from "react";
import Box from "@mui/material/Box/Box";

import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";
import SPCaseMultiInput from "../forms-control/SpecificCaseMultiInput";
import SPCaseInput from "../forms-control/SpecificCaseInput";
import { Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { globalTheme } from "../../../../theme/globalTheme";

interface ConsultationForm<T> {
    consultationValues?: {
        motivo: string,
        paciente: string,
        especialistas: string[],
        especialistas_id: string,
        observaciones: string,
        estudios: string[],
        plan_tratamiento: string[]
    };
    setOfZustandCallback?: (name: string, value: T) => void;
    getOfZustandCallback?: (name: string | Dayjs) => T;
}

const ConsultationForm: React.FC<ConsultationForm<any>> = ({ setOfZustandCallback, getOfZustandCallback, consultationValues }) => {
    return (
        <>
            <Typography variant="h6" sx={{color:globalTheme.font.primary.main}}>Gestione su consulta</Typography>
            <Box>
                <SPCaseInput
                    initialValue={consultationValues?.motivo}
                    zustandCallback={setOfZustandCallback}
                    label="Motivo"
                    name="motivo"
                    placeholder="Escriba su motivo"
                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue={consultationValues?.paciente}
                    zustandCallback={setOfZustandCallback}
                    label="Pacientes"
                    name="pacientes"
                    placeholder="Escriba su paciente"
                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue={consultationValues?.observaciones}
                    zustandCallback={setOfZustandCallback}
                    label="Observaciones"
                    name="observaciones"
                    placeholder="Escriba sus observaciones"
                />
            </Box>
            <Box>
                <SPCaseInput
                    initialValue={consultationValues?.especialistas_id}
                    zustandCallback={setOfZustandCallback}
                    label="Especialista ID"
                    name="especialistas_id"
                    placeholder="Escriba el id del especialista"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    Values={consultationValues?.estudios}
                    zustandCallback={setOfZustandCallback}
                    label="Estudios"
                    name="estudios"
                    placeholder="Escriba su estudio"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    Values={consultationValues?.plan_tratamiento}
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

/**    <Box>
                <SPCaseMultiInput
                    Values={consultationValues?.especialistas}
                    zustandCallback={setOfZustandCallback}
                    label="Especialistas"
                    name="especialistas"
                    placeholder="Escriba su especialista"
                    canFistElementDelete={false}
                />
            </Box> */