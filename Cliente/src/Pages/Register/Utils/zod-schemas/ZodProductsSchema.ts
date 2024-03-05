import {z} from 'zod';

const ProductSchema = z.object({
    precio: z.number(),
    categoria: z.union([
        z.literal("Basico"),
        z.literal("Familiar"),
        z.literal("Paciente"),
        z.literal("Especialista"),
        z.literal("Independiente"),
        z.literal("Hospitales"),
      ]),
    //nombre_producto: z.string(),
});

export default ProductSchema;