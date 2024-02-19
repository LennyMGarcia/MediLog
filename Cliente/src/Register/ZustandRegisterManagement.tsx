import {create} from 'zustand';
import {z} from 'zod'
import PatientSchema from './Utils/zod-schemas/zodPatientSchema';
import SpecialistSchema from './Utils/zod-schemas/zodSpecialistSchema';
import UserSchema from './Utils/zod-schemas/zodUserSchema';


const registerSchema = PatientSchema.merge(SpecialistSchema).merge(UserSchema); 

export type RegisterSchema = z.infer<typeof registerSchema>;

const initialRegisterValues: RegisterSchema ={
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
    fecha_expiracion: new Date(),
    cvv: ''
}

const useDataRegisterStore = create<typeof initialRegisterValues>()(() => (
   initialRegisterValues
));

export const setRegisterData = (newData:RegisterSchema) => {
    try{
        registerSchema.parse(newData)
        //useDataRegisterStore.setState((state) => ({registerData: [...state.registerData, newData]}));
    }
    catch(error){
        console.error("Error en zustand", error)
    }
}

export const getRegisterDataByName = (name: string) => {
    
    return null;
}

export default useDataRegisterStore;
