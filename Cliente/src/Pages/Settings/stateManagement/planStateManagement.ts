import {create}  from 'zustand';
import { z } from 'zod';


const zodplanSchema = z.object({

    plan: z.string().min(6).max(24),
   
});

 type planSchemaValues = z.infer<typeof zodplanSchema>;

export type planSchemaActions = {
    setPlanData: (name: string , value: planSchemaValues[keyof planSchemaValues]) => void;
    getPlanData: (name: string ) => planSchemaValues[keyof planSchemaValues];
}

const usePlanStore = create<planSchemaValues & planSchemaActions>((set, get) => ({
    plan: '',
    setPlanData: (name, value) => {
        try {
            const validatedName = name as keyof planSchemaValues;
            const updatedData = { [validatedName]: value };

            const validatedData = zodplanSchema.partial().parse(updatedData);

            set(validatedData);

        } catch (error) {
            //console.error('Error de validación:', error);

        }
    },
    getPlanData: (name) => {
        const validatedName = name as keyof planSchemaValues;
        const data = get();
        return data[`${validatedName}`];

    },
}));

export const getAllPlanData = () => {
    return usePlanStore.getState();
}

export default usePlanStore;