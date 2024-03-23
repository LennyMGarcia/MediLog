import { create } from 'zustand';
import { z } from 'zod';

import { Dayjs } from 'dayjs';

import ConsultationSchema from '../Utils/zod-schemas/zodConsultationSchema';

// Merge de los distintos tipos, los zods separados ayudan a saber de donde vienen 
const consultationSchema = ConsultationSchema

export type consultationSchemaValues = z.infer<typeof consultationSchema>;

export type consultationSchemaActions = {
    setConsultationData: (name: string | Dayjs, value: consultationSchemaValues[keyof consultationSchemaValues], index?: number) => void; //simple clave y valor key[value]
    getConsultationData: (name: string | Dayjs) => consultationSchemaValues[keyof consultationSchemaValues];
}

const useDataConsultationStore = create<consultationSchemaValues & consultationSchemaActions>((set, get) => ({
    motivo: "",
    pacientes: "",
    especialistas: [""],
    especialistas_id: "",
    observaciones: "",
    estudios: [""],
    plan_tratamiento: [""],
    setConsultationData: (name, value, index?) => {
        try {
            const validatedName = name as keyof consultationSchemaValues;
            const updatedData = { [validatedName]: value };

            if (index !== undefined) {
                const currentArray = get()[validatedName] || [];
                if (Array.isArray(currentArray)) {
                    const newArray: string[] = [...currentArray];
                    if (typeof value === 'string' || typeof value === 'number') {
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

            const validatedData = consultationSchema.partial().parse(updatedData);

            set(validatedData);

        } catch (error) {
            //  console.error('Error de validación:', error);

        }
    },
    getConsultationData: (name) => {
        const validatedName = name as keyof consultationSchemaValues;
        const data = get();
        return data[`${validatedName}`];

    },
}));

export const getAllConsultationData = () => {
    return useDataConsultationStore.getState();
}

export default useDataConsultationStore;