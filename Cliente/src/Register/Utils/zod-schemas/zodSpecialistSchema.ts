import {z} from 'zod';

const SpecialistSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    sexo: z.string(),
    correo: z.string().email(),
    direccion: z.string(),
    telefono: z.string(),
    especialidad:z.string(),
});

type Specialist = z.infer<typeof SpecialistSchema>;