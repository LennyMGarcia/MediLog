import { z } from 'zod';

const SurgerySchema = z.object({
  motivo: z.string(),
  pacientes: z.string(),
  especialistas: z.array(z.string()),
  especialistas_id: z.string(),
  observaciones: z.string(),
  estudios: z.array(z.string()),
  instrucciones: z.array(z.string()),
  categoria: z.string(),
  resultado: z.union([
    z.literal("Exito"),
    z.literal("Fracaso"),
    z.literal("Incompleto"),
  ]),
});

export default SurgerySchema;