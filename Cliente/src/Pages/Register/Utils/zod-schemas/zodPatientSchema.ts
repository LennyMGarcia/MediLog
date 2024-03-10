import dayjs from 'dayjs';
import {z} from 'zod';

//transform() para formato ISO 8601 antes de ser almacenada en la base de datos. 
const PatientSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    fecha_nacimiento: z.date().refine(value => dayjs(value).isBefore(dayjs()), {
      message: 'La fecha de nacimiento debe ser anterior a la fecha actual'
    }).transform(value => dayjs(value).format('YYYY-MM-DD')),
    sexo: z.string(),
    correo: z.string().email(),
    direccion: z.string().nullable(),
    telefono: z.string().nullable(),
    documento_identidad: z.string()
});

//type Patient = z.infer<typeof PatientSchema>;

export default PatientSchema