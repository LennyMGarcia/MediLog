import {z} from 'zod';

const SpecialistSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    sexo: z.string(),
    correo: z.string().email(),
    direccion: z.string().nullable(),
    telefono: z.string().regex(/^1?(809|829|849)\d{7}$/, {
        message: "El numero de telefono invalido en  Rep. Dom."}).nullable(),
    especialidad:z.string(),
});


export default SpecialistSchema;