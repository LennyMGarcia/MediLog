import {create}  from 'zustand';
import { z } from 'zod';


const zodPasswordSchema = z.object({

    contrasenaNueva: z.string().min(6).max(24),
   
});

// Merge de los distintos tipos, los zods separados ayudan a saber de donde vienen 


 type passwordSchemaValues = z.infer<typeof zodPasswordSchema>;

export type passwordSchemaActions = {
    setPasswordData: (name: string , value: passwordSchemaValues[keyof passwordSchemaValues]) => void;
    getPasswordData: (name: string ) => passwordSchemaValues[keyof passwordSchemaValues];
}

const usePasswordStore = create<passwordSchemaValues & passwordSchemaActions>((set, get) => ({
    contrasenaNueva: '',
    setPasswordData: (name, value) => {
        try {
            const validatedName = name as keyof passwordSchemaValues;
            const updatedData = { [validatedName]: value };

            const validatedData = zodPasswordSchema.partial().parse(updatedData);

            set(validatedData);

        } catch (error) {
            //console.error('Error de validación:', error);

        }
    },
    getPasswordData: (name) => {
        const validatedName = name as keyof passwordSchemaValues;
        const data = get();
        return data[`${validatedName}`];

    },
}));

export const getAllPasswordData = () => {
    return usePasswordStore.getState();
}

export default usePasswordStore;