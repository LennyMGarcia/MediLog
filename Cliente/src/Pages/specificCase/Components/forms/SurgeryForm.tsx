import React from "react";
import Box from "@mui/material/Box/Box";

import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";
import SPCaseMultiInput from "../forms-control/SpecificCaseMultiInput";
import SPCaseInput from "../forms-control/SpecificCaseInput";
import { Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import SPCaseSelect from "../forms-control/SpecificCaseSelect";
import { globalTheme } from "../../../../theme/globalTheme";

interface ISurgeryForm<T> {
    SurgeryValues?: {
        motivo: string,
        paciente: string,
        especialistas: string[],
        especialistas_id: string,
        observaciones: string,
        estudios: string[],
        instrucciones: string[],
        categoria: string,
        resultado: string,
    };
    setOfZustandCallback?: (name: string, value: T) => void;
    getOfZustandCallback?: (name: string | Dayjs) => T;
}

const SurgeryForm: React.FC<ISurgeryForm<any>> = ({ setOfZustandCallback, getOfZustandCallback, SurgeryValues }) => {
    return (
        <>
            <Typography variant="h6" sx={{color:globalTheme.font.primary.main}}>Gestione su Cirugia</Typography>
            <Box>
                <SPCaseInput
                    initialValue={SurgeryValues?.motivo}
                    zustandCallback={setOfZustandCallback}
                    label="Motivo"
                    name="motivo"
                    placeholder="Escriba su motivo"
                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue={SurgeryValues?.paciente}
                    zustandCallback={setOfZustandCallback}
                    label="Pacientes"
                    name="paciente"
                    placeholder="Escriba su paciente"
                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue={SurgeryValues?.categoria}
                    zustandCallback={setOfZustandCallback}
                    label="Categoria"
                    name="categoria"
                    placeholder="Escriba su categoria"
                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue={SurgeryValues?.observaciones}
                    zustandCallback={setOfZustandCallback}
                    label="Observaciones"
                    name="observaciones"
                    placeholder="Escriba sus observaciones"
                />
            </Box>

            <Box>
                <SPCaseSelect
                    initialValue={SurgeryValues?.resultado}
                    setOfZustandCallback={setOfZustandCallback}
                    getOfZustandCallback={getOfZustandCallback}
                    label="Resultado"
                    name="resultado"
                    selectObject={[
                        { key: "Exito", value: "Exito" },
                        { key: "Fracaso", value: "Fracaso" },
                        { key: "Incompleto", value: "Incompleto" },
                    ]}
                />
            </Box>
            <Box>
                <SPCaseInput
                    initialValue={SurgeryValues?.especialistas_id}
                    zustandCallback={setOfZustandCallback}
                    label="Especialista"
                    name="especialistas_id"
                    placeholder="Escriba su categoria"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    Values={SurgeryValues?.estudios}
                    zustandCallback={setOfZustandCallback}
                    label="Estudios"
                    name="estudios"
                    placeholder="Escriba su estudio"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    Values={SurgeryValues?.instrucciones}
                    zustandCallback={setOfZustandCallback}
                    label="Instruccioness"
                    name="instrucciones"
                    placeholder="Escriba su instruccionn"
                />
            </Box>
        </>
    )
}

export default SurgeryForm;

/**<Box>
                <SPCaseMultiInput
                    Values={SurgeryValues?.especialistas}
                    zustandCallback={setOfZustandCallback}
                    label="Especialistas"
                    name="especialistas"
                    placeholder="Escriba su especialista"
                    canFistElementDelete={false}
                />
            </Box> */