import {z} from 'zod';

const FinancialSchema = z.object({
    monto: z.number().nullable(),
    producto_id: z.number(),
    usuario_id: z.number(),
    metodo_pago: z.string(),
    descripcion: z.string().nullable(),
});

export default FinancialSchema;