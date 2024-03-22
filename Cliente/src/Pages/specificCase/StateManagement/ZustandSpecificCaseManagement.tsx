import { create } from 'zustand';
import { z } from 'zod';

import { Dayjs } from 'dayjs';
import CaseSchema from '../Utils/zod-schemas/zodCaseSchema';

// Merge de los distintos tipos, los zods separados ayudan a saber de donde vienen 
const caseSchema = CaseSchema

export type CaseSchemaValues = z.infer<typeof caseSchema>;

export type CaseSchemaActions = {
    setCaseData: (name: string | Dayjs, value: CaseSchemaValues[keyof CaseSchemaValues], index?: number) => void; //simple clave y valor key[value]
    getCaseData: (name: string | Dayjs) => CaseSchemaValues[keyof CaseSchemaValues];
}

const useDataCaseStore = create<CaseSchemaValues & CaseSchemaActions>((set, get) => ({
    descripcion: "",
    pacientes: "",
    especialistas: [""],
    consultas: [""],
    cirugias: [""],
    estado: "Activo",
    categoria: "",
    seguimiento: "",
    setCaseData: (name, value, index?) => {
        try {
            const validatedName = name as keyof CaseSchemaValues;
            const updatedData = { [validatedName]: value };

            if (index !== undefined) {
                const currentArray = get()[validatedName] || [];
                if (Array.isArray(currentArray)) {
                    const newArray: string[] = [...currentArray];
                    if (typeof value === 'string') {
                        newArray[index] = value;
                        updatedData[validatedName] = newArray;
                    } else if (value === null) {
                        newArray.splice(index, 1);
                        updatedData[validatedName] = newArray;
                    }
                }
            } else {
                if (typeof value === 'string') {
                    updatedData[validatedName] = value;
                }
            }

            const validatedData = caseSchema.partial().parse(updatedData);

            set(validatedData);

        } catch (error) {
            //  console.error('Error de validación:', error);

        }
    },
    getCaseData: (name) => {
        const validatedName = name as keyof CaseSchemaValues;
        const data = get();
        return data[`${validatedName}`];

    },
}));

export const getAllCaseData = () => {
    return useDataCaseStore.getState();
}

export default useDataCaseStore;