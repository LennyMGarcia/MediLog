import * as yup from 'yup'

import dayjs from 'dayjs';


const yupCaseSchema = yup.object().shape({
  descripcion: yup.string().notRequired(),
  pacientes: yup.string()
    .matches(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/, 'El nombre debe seguir el formato correcto, Mayusculas al empezar')
    .matches(/^[^0-9]*$/, 'El nombre no debe contener números')
    .matches(/^[a-zA-Z0-9\s]*$/, 'El nombre no puede contener caracteres especiales')
    .max(35, "El nombre no debe superar los 35 caracteres")
    .required("Requerido").nonNullable(),
  especialistas: yup.array().of(
    yup.number()).min(1, 'Debe haber al menos un elemento en la lista'),
  estado: yup.string().oneOf(["Activo", "Inactivo", "Suspendido", "Eliminado", "En proceso"]).notRequired(),
  seguimiento: yup.string().notRequired(),
});





export default yupCaseSchema