import { create } from 'zustand';
import { z } from 'zod';

import { Dayjs } from 'dayjs';

import CreateCaseSchema from '../Utils/zod-schemas/zodCreateCase';

// Merge de los distintos tipos, los zods separados ayudan a saber de donde vienen 
const createSchema = CreateCaseSchema

export type CreateCaseSchemaValues = z.infer<typeof CreateCaseSchema>;

export type CreateCaseSchemaActions = {
    setCreateData: (name: string | Dayjs, value: CreateCaseSchemaValues[keyof CreateCaseSchemaValues], index?: number) => void; //simple clave y valor key[value]
    getCreateData: (name: string | Dayjs) => CreateCaseSchemaValues[keyof CreateCaseSchemaValues];
}

const useCreateDataStore = create<CreateCaseSchemaValues & CreateCaseSchemaActions>((set, get) => ({

    descripcion: "",
    especialistas_id: "",
    pacientes_id: "",
    consultas: "",
    cirugias: "",
    estado: "Activo",
    categoria: "",
    seguimiento: "",
    setCreateData: (name, value, index?) => {
        try {
            const validatedName = name as keyof CreateCaseSchemaValues;
            const updatedData = { [validatedName]: value };
            const validatedData = createSchema.partial().parse(updatedData);
            set(validatedData);

        } catch (error) {
            //  console.error('Error de validación:', error);

        }
    },
    getCreateData: (name) => {
        const validatedName = name as keyof CreateCaseSchemaValues;
        const data = get();
        return data[`${validatedName}`];

    },
}));

export const getAllCreateData = () => {
    return useCreateDataStore.getState();
}

export default useCreateDataStore;

/**if (index !== undefined) {
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
            } */