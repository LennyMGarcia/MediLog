import * as yup from 'yup';

const yupConsultationSchema = yup.object().shape({
    motivo: yup.string().required("requerido"),
    pacientes:yup.string()
    .matches(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/, 'El nombre debe seguir el formato correcto, Mayusculas al empezar')
    .matches(/^[^0-9]*$/, 'El nombre no debe contener números')
    .matches(/^[a-zA-Z0-9\s]*$/, 'El nombre no puede contener caracteres especiales')
    .max(35, "El nombre no debe superar los 35 caracteres")
    .required("Requerido").nonNullable(),
    especialistas: yup.array().of(
        yup.string()
          .matches(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/, 'El nombre debe seguir el formato correcto, Mayúsculas al empezar')
          .matches(/^[^0-9]*$/, 'El nombre no debe contener números')
          .matches(/^[a-zA-Z0-9\s]*$/, 'El nombre no puede contener caracteres especiales')
          .max(35, "El nombre no debe superar los 35 caracteres")
      ).min(1, 'Debe haber al menos un elemento en la lista'),
    observaciones: yup.string().notRequired(),
    estudios: yup.array().of(yup.string()).notRequired(),
    plan_tratamiento: yup.array().of(yup.string()).notRequired(),
});

export default yupConsultationSchema;
