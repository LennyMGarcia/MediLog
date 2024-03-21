import * as yup from 'yup';

const yupSurgerySchema = yup.object().shape({
  motivo: yup.string(),
  pacientes: yup.string().required("El nombre del paciente es requerido"),
  especialistas: yup.array().of(yup.string()).required("Se requiere al menos un especialista"),
  observaciones: yup.array().of(yup.string()),
  estudios: yup.array().of(yup.string()),
  instrucciones: yup.array().of(yup.string()),
  categoria: yup.string(),
  resultado: yup.string().oneOf(["Exito", "Fracaso", "Incompleto"], "Resultado inválido"),
  plan_tratamiento: yup.array().of(yup.string()),
});

export default yupSurgerySchema;
