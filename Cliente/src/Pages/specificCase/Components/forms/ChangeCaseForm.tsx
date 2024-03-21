import React from "react";
import Box from "@mui/material/Box/Box";

import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";
import SPCaseMultiInput from "../forms-control/SpecificCaseMultiInput";
import SPCaseInput from "../forms-control/SpecificCaseInput";
import { Typography } from "@mui/material";
import SPCaseSelect from "../forms-control/SpecificCaseSelect";
import { Dayjs } from "dayjs";

interface ChangeCaseForm<T> {
    caseValues?: {
        descripcion: string,
        pacientes: string,
        especialistas: string[],
        consultas: string[],
        cirugias: string[],
        estado: string,
        categoria: string,
        seguimiento: string,
    };
    setOfZustandCallback?: (name: string, value: T) => void;
    getOfZustandCallback?: (name: string | Dayjs) => T;
}

const ChageCaseForm: React.FC<ChangeCaseForm<any>> = ({ caseValues, setOfZustandCallback, getOfZustandCallback }) => {
    return (
        <>
            <Typography variant="h6">Edite su caso</Typography>
            <Box>
                <SPCaseInput
                    initialValue={caseValues?.descripcion}
                    zustandCallback={setOfZustandCallback}
                    label="Descripcion"
                    name="descripcion"
                    placeholder="Escriba su dirección"
                    multiline
                    rows={4}
                />
            </Box>

            <Box>
                <SPCaseSelect
                    initialValue={caseValues?.estado}
                    setOfZustandCallback={setOfZustandCallback}
                    getOfZustandCallback={getOfZustandCallback}
                    label="Estado"
                    name="estado"
                    selectObject={[
                        { key: "Activo", value: "Activo" },
                        { key: "Inactivo", value: "Inactivo" },
                        { key: "Suspendido", value: "Suspendido" },
                        { key: "Eliminado", value: "Eliminado" },
                        { key: "En Proceso", value: "En proceos" },
                    ]}
                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue={caseValues?.seguimiento}
                    zustandCallback={setOfZustandCallback}
                    label="Seguimiento"
                    name="seguimiento"
                    placeholder="Escriba su seguimiento"

                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue={caseValues?.pacientes}
                    zustandCallback={setOfZustandCallback}
                    label="Pacientes"
                    name="pacientes"
                    placeholder="Escriba su paciente"
                />
            </Box>

            <Box>
                <SPCaseMultiInput
                    Values={caseValues?.especialistas}
                    zustandCallback={setOfZustandCallback}
                    label="Especialistas"
                    name="especialistas"
                    placeholder="Escriba su especialista"
                    canFistElementDelete={false}
                />
            </Box>
        </>
    )
}

export default ChageCaseForm;