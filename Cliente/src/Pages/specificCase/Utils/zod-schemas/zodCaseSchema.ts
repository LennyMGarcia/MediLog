import { z } from 'zod';

const CaseSchema = z.object({
  descripcion: z.string(),
  pacientes: z.string(),
  especialistas: z.array(z.string()),
  especialistas_id: z.string(),
  consultas: z.array(z.string()),
  cirugias: z.array(z.string()),
  estado: z.union([
    z.literal("Activo"),
    z.literal("Inactivo"),
    z.literal("Suspendido"),
    z.literal("Eliminado"),
    z.literal("En proceso"),
  ]),
  categoria: z.string(),
  seguimiento: z.string(),
});

export default CaseSchema;