import {z} from 'zod';

const UserSchema = z.object({
    member_id: z.number(),
    correo: z.string().email(),
    contrasena: z.string().min(8).max(24),
    tipo: z.string(),
    plan: z.number().nullable(),
    metodo_pago: z.string().nullable(),
    datos_financieros:z.string().length(16).nullable(),
    fecha_expiracion: z.date().nullable(),
    cvv: z.string().max(4).nullable(),
});

export default UserSchema;