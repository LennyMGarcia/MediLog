import dayjs from 'dayjs';
import { z } from 'zod';

//transform() para formato ISO 8601 antes de ser almacenada en la base de datos. 
const ConsultationSchema = z.object({
    motivo: z.string(),
    pacientes: z.string(),
    especialistas: z.array(z.string()),
    especialistas_id: z.string(),
    observaciones: z.string(),
    estudios: z.array(z.string()),
    plan_tratamiento: z.array(z.string()),
});

//type Patient = z.infer<typeof PatientSchema>;

export default ConsultationSchema