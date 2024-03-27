import { z } from 'zod';

//transform() para formato ISO 8601 antes de ser almacenada en la base de datos. 
const CreateCaseSchema = z.object({
    descripcion: z.string(),
    especialistas_id: z.string(),
    pacientes_id: z.string(),
    consultas: z.string(),
    cirugias: z.string(),
    estado: z.union([z.literal("Activo"), z.literal("Inactivo"), z.literal("Suspendido"), z.literal("Proceso")]),
    categoria: z.string(),
    seguimiento: z.string(),
});

//type Patient = z.infer<typeof PatientSchema>;

export default CreateCaseSchema