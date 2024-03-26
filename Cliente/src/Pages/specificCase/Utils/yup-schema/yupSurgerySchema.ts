import * as yup from 'yup';

const yupSurgerySchema = yup.object().shape({
  motivo: yup.string().required("requerido"),
  paciente: yup.string()
    .matches(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/, 'Formato inccorrecto, Mayusculas al empezar')
    .matches(/^[^0-9]*$/, 'El nombre no debe contener números')
    .matches(/^[a-zA-Z0-9\s]*$/, 'El nombre no puede contener caracteres especiales')
    .max(35, "El nombre no debe superar los 35 caracteres")
    .required("Requerido"),
  especialistas: yup.array().of(
    yup.number()).min(1, 'Debe haber al menos un elemento en la lista'),
  observaciones: yup.string().notRequired(),
  estudios: yup.array().of(yup.string()).notRequired(),
  instrucciones: yup.array().of(yup.string()).notRequired(),
  categoria: yup.string().notRequired(),
  resultado: yup.string().oneOf(["Exito", "Fracaso", "Incompleto"], "Resultado inválido").notRequired(),
});

export default yupSurgerySchema;
