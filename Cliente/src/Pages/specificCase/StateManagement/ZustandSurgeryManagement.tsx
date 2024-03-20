import { create } from 'zustand';
import { z } from 'zod';

import { Dayjs } from 'dayjs';
import SurgerySchema from '../Utils/zod-schemas/ZodSurgerySchema';

// Merge de los distintos tipos, los zods separados ayudan a saber de donde vienen 
const surgerySchema = SurgerySchema

export type surgerySchemaValues = z.infer<typeof surgerySchema>;

export type surgerySchemaActions = {
    setSurgeryData: (name: string | Dayjs, value: surgerySchemaValues[keyof surgerySchemaValues], index?: number) => void; //simple clave y valor key[value]
    getSurgeryData: (name: string | Dayjs) => surgerySchemaValues[keyof surgerySchemaValues];
}

const useDataSurgeryStore = create<surgerySchemaValues & surgerySchemaActions>((set, get) => ({
    motivo: "",
    pacientes: [""],
    especialistas: [""],
    observaciones: [""],
    estudios: [""],
    instrucciones: [""],
    categoria: "",
    resultado: "Exito",
    plan_tratamiento: [""],
    setSurgeryData: (name, value, index?) => {
        try {
            const validatedName = name as keyof surgerySchemaValues;
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

            const validatedData = surgerySchema.partial().parse(updatedData);

            set(validatedData);

        } catch (error) {
            //  console.error('Error de validación:', error);

        }
    },
    getSurgeryData: (name) => {
        const validatedName = name as keyof surgerySchemaValues;
        const data = get();
        return data[`${validatedName}`];

    },
}));

export const getAllSurgeryData = () => {
    return useDataSurgeryStore.getState();
}

export default useDataSurgeryStore;