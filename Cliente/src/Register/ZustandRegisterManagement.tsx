import {create}  from 'zustand';
import { z } from 'zod';
import PatientSchema from './Utils/zod-schemas/zodPatientSchema';
import SpecialistSchema from './Utils/zod-schemas/zodSpecialistSchema';
import UserSchema from './Utils/zod-schemas/zodUserSchema';

// Merge de los distintos tipos, los zods separados ayudan a saber de donde vienen 
const registerSchema = PatientSchema.merge(SpecialistSchema).merge(UserSchema); 

export type RegisterSchemaValues = z.infer<typeof registerSchema>;

export type RegisterSchemaActions = {
    setRegisterData: (name: string, value: RegisterSchemaValues[keyof RegisterSchemaValues]) => void; //simple clave y valor key[value]
    getRegisterData: (name: string) => RegisterSchemaValues[keyof RegisterSchemaValues];
}

const useDataRegisterStore = create<RegisterSchemaValues & RegisterSchemaActions>((set, get) => ({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    documento_identidad: '',
    sexo: '',
    correo: '',
    direccion: '',
    telefono: '',
    especialidad: '',
    member_id: 0,
    contrasena: '',
    tipo: '',
    plan: '',
    metodo_pago: '',
    fecha_expiracion: null,
    cvv: '',
    setRegisterData: (name, value) => {
        try {
            const validatedName = name as keyof RegisterSchemaValues;
            const updatedData = { [validatedName]: value };
            // validar solo el campo específico con zod antes de subirlo
            const validatedData = registerSchema.partial().parse(updatedData);

            set(validatedData);

        } catch (error) {
            console.error('Error de validación:', error);

        }
    },
    getRegisterData: (name) => {
        const validatedName = name as keyof RegisterSchemaValues;
        const data = get();
        return data[`${validatedName}`];

    },
}));

export const getAllRegisterData = () => {
    return useDataRegisterStore.getState();
}

export default useDataRegisterStore;
