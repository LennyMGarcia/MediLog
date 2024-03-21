import * as yup from 'yup';

const yupConsultationSchema = yup.object().shape({
    motivo: yup.string().required("requerido"),
    pacientes: yup.string().required("El nombre del paciente es requerido"),
    especialistas: yup.array().of(yup.string()).required("Se requiere al menos un especialista"),
    observaciones: yup.array().of(yup.string()),
    estudios: yup.array().of(yup.string()),
    plan_tratamiento: yup.array().of(yup.string()),
});

export default yupConsultationSchema;
