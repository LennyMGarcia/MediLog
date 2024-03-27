import React from "react";
import Box from "@mui/material/Box/Box";

import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";
import SPCaseMultiInput from "../forms-control/SpecificCaseMultiInput";
import SPCaseInput from "../forms-control/SpecificCaseInput";
import { Typography } from "@mui/material";
import SPCaseSelect from "../forms-control/SpecificCaseSelect";
import { Dayjs } from "dayjs";

interface CreateCaseForm<T> {
    caseValues?: {
        descripcion: string,
        paciente: string,
        especialistas: number[],
        especialistas_id: string | number,
        consultas: string[],
        cirugias: string[],
        estado: string,
        categoria: string,
        seguimiento: string,
    };
    setOfZustandCallback?: (name: string, value: T) => void;
    getOfZustandCallback?: (name: string | Dayjs) => T;
}

const CreateCaseForm: React.FC<CreateCaseForm<any>> = ({ setOfZustandCallback, getOfZustandCallback }) => {
    return (
        <>
            <Typography variant="h6">Edite su caso</Typography>
            <Box>
                <SPCaseInput
                    initialValue=''
                    zustandCallback={setOfZustandCallback}
                    label="Descripcion"
                    name="descripcion"
                    placeholder="Escriba su dirección"
                />
            </Box>

            <Box>
                <SPCaseSelect
                    initialValue=''
                    setOfZustandCallback={setOfZustandCallback}
                    getOfZustandCallback={getOfZustandCallback}
                    label="Estado"
                    name="estado"
                    selectObject={[
                        { key: "Activo", value: "Activo" },
                        { key: "Inactivo", value: "Inactivo" },
                        { key: "Suspendido", value: "Suspendido" },
                        { key: "Procese", value: "Proceso" },
                    ]}
                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue=''
                    zustandCallback={setOfZustandCallback}
                    label="Seguimiento"
                    name="seguimiento"
                    placeholder="Escriba su seguimiento"

                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue=''
                    zustandCallback={setOfZustandCallback}
                    label="Pacientes"
                    name="pacientes_id"
                    placeholder="Escriba ID de Paciente"
                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue=''
                    zustandCallback={setOfZustandCallback}
                    label="Especialista"
                    name="especialistas_id"
                    placeholder="Escriba su paciente"
                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue=''
                    zustandCallback={setOfZustandCallback}
                    label="Consultas Previas"
                    name="consultas"
                    placeholder="Indique Consultas Previas"
                />
            </Box>

            <Box>
                <SPCaseInput
                    initialValue=''
                    zustandCallback={setOfZustandCallback}
                    label="Cirugias Relacionadas"
                    name="cirugias"
                    placeholder="Indique Consultas Previas"
                />
            </Box>
            <Box>
                <SPCaseInput
                    initialValue=''
                    zustandCallback={setOfZustandCallback}
                    label="Categoria"
                    name="categoria"
                    placeholder="Indique Categoria del Caso"
                />
            </Box>

        </>
    )
}

export default CreateCaseForm;

/** <Box>
                <SPCaseMultiInput
                    Values={caseValues?.especialistas}
                    zustandCallback={setOfZustandCallback}
                    label="Especialistas"
                    name="especialistas"
                    placeholder="Escriba su especialista"
                    canFistElementDelete={false}
                />
            </Box> */