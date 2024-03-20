import React from "react";
import Box from "@mui/material/Box/Box";

import BoxRowWrapper from "../../../../Common/Wrappers/BoxRowWrapper";
import SPCaseMultiInput from "../forms-control/SpecificCaseMultiInput";
import SPCaseInput from "../forms-control/SpecificCaseInput";
import { Typography } from "@mui/material";
import SPCaseSelect from "../forms-control/SpecificCaseSelect";

interface ChangeCaseForm {
    profileValues?: Record<string, any>;
}

const ChageCaseForm: React.FC<ChangeCaseForm> = ({ profileValues }) => {
    return (
        <>
            <Typography variant="h6">Edite su caso</Typography>
            <Box>
                <SPCaseInput
                    label="Descripcion"
                    name="descripcion"
                    placeholder="Escriba su dirección"
                    multiline
                    rows={4}
                />
            </Box>

            <Box>
                <SPCaseSelect
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
                    label="Seguimiento"
                    name="seguimiento"
                    placeholder="Escriba su seguimiento"
                    
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
        </>
    )
}

export default ChageCaseForm;