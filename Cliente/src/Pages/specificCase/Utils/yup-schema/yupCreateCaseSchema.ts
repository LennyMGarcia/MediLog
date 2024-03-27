import * as yup from 'yup'

import dayjs from 'dayjs';


const yupCreateCaseSchema = yup.object().shape({
    descripcion: yup.string().nonNullable().required("Requerido"),
    especialistas_id: yup.string().nonNullable().required("Requerido"),
    pacientes_id: yup.string().nonNullable().required("Requerido"),
    consultas: yup.string().notRequired(),
    cirugias: yup.string().notRequired(),
    estado: yup.string().oneOf(["Activo", "Inactivo", "Suspendido", "Proceso"]).notRequired(),
    categoria: yup.string().notRequired().max(20, "El nombre no debe superar los 35 caracteres"),
    seguimiento: yup.string().notRequired(),
});


/** pacientes: yup.string()
        .matches(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/, 'El nombre debe seguir el formato correcto, Mayusculas al empezar')
        .matches(/^[^0-9]*$/, 'El nombre no debe contener números')
        .matches(/^[a-zA-Z0-9\s]*$/, 'El nombre no puede contener caracteres especiales')
        .max(35, "El nombre no debe superar los 35 caracteres")
        .required("Requerido").nonNullable(),
    especialistas: yup.array().of(
        yup.number()).min(1, 'Debe haber al menos un elemento en la lista'), */


export default yupCreateCaseSchema