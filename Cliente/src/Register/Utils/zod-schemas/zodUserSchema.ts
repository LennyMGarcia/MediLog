import {z} from 'zod';

const UserSchema = z.object({
    member_id: z.number(),
    correo: z.string().email(),
    contrasena: z.string().min(6).max(24),
    tipo: z.string(),
    plan: z.number().nullable(),
    metodo_pago: z.string().nullable(),
    fecha_expiracion: z.date().nullable(),
    cvv: z.string().max(4).nullable(),
});

export default UserSchema;