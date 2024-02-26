import {z} from 'zod';

const FinancialSchema = z.object({
    monto: z.number(),
    producto_id: z.number(),
    usuario_id: z.number(),
    metodo_pago: z.string(),
    descripcion: z.string(),
});

export default FinancialSchema;