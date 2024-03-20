import {z} from 'zod';

const SurgerySchema = z.object({
  motivo: z.string(),
  pacientes: z.array(z.string()),
  especialistas: z.array(z.string()),
  observaciones: z.array(z.string()),
  estudios: z.array(z.string()),
  instrucciones: z.array(z.string()),
  categoria: z.string(),
  resultado:  z.union([
    z.literal("Exito"),
    z.literal("Fracaso"),
    z.literal("Incompleto"),
  ]),
  plan_tratamiento: z.array(z.string()),
});

export default SurgerySchema;