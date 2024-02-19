import {create} from 'zustand';
import {z} from 'zod'
import PatientSchema from './Utils/zod-schemas/zodPatientSchema';
import SpecialistSchema from './Utils/zod-schemas/zodSpecialistSchema';
import UserSchema from './Utils/zod-schemas/zodUserSchema';


const registerSchema = PatientSchema.merge(SpecialistSchema).merge(UserSchema); 

export type RegisterSchemaValues = z.infer<typeof registerSchema>;

type RegisterSchemaActions = {
    setRegisterData: (name:string, values:any) => void, 
}

const useDataRegisterStore = create<RegisterSchemaValues & RegisterSchemaActions>()((set) => ({
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
        set((state) => ({
            ...state,
            [name]: value,
        }));
    }
}));


export const getRegisterData = () => {
    return useDataRegisterStore.getState();
}

export default useDataRegisterStore;
