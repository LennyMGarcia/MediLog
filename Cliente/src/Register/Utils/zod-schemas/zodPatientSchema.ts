import {z} from 'zod';

//transform() para formato ISO 8601 antes de ser almacenada en la base de datos. 
const PatientSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    fecha_nacimiento: z.date().refine(value => value < new Date(), {
        message: 'La fecha de nacimiento debe ser anterior a la fecha actual'
      }).transform(value => value.toISOString().split('T')[0]),
    documento_identidad: z.string().refine(value => value.length === 7 && /^\d+$/.test(value), {
        message: 'El número debe tener exactamente 7 dígitos'
      }),
    sexo: z.string(),
    correo: z.string().email(),
    direccion: z.string(),
    telefono: z.string(),
});

type Patient = z.infer<typeof PatientSchema>;