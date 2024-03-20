import React from "react";
import Box from "@mui/material/Box/Box";

import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";
import SPCaseMultiInput from "../forms-control/SpecificCaseMultiInput";
import SPCaseInput from "../forms-control/SpecificCaseInput";
import { Typography } from "@mui/material";
import SPCaseSelect from "../forms-control/SpecificCaseSelect";
import { Dayjs } from "dayjs";

interface ChangeCaseForm<T> {
    profileValues?: object;
    setOfZustandCallback?: (name: string, value: T) => void;
    getOfZustandCallback?: (name: string | Dayjs) => T;
}

const ChageCaseForm: React.FC<ChangeCaseForm<any>> = ({ profileValues, setOfZustandCallback, getOfZustandCallback }) => {
    return (
        <>
            <Typography variant="h6">Edite su caso</Typography>
            <Box>
                <SPCaseInput
                    initialValue= {"Hola"}
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
                     zustandCallback={setOfZustandCallback}
                    label="Seguimiento"
                    name="seguimiento"
                    placeholder="Escriba su seguimiento"
                    
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
        </>
    )
}

export default ChageCaseForm;