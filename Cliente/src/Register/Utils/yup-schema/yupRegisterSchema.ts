import * as Yup from 'yup'

const basicInfoSchema = Yup.object({
    nombre: Yup.string().required("requerido"),
    apellido: Yup.string().required("requerido"),
    //sexo: Yup.string().required("required"),
    especialidad: Yup.string().required("requerido"),
})

const contactSchema = Yup.object({
    correo: Yup.string().email('Direccion de correo invalida').required('Requerido'),
    contrasena: Yup.string()
    .min(8, 'La contrasena debe tener al menos 8 caracteres')
    .max(24, "La contrasena no debe superar los 24 caracteres")
    .required('Required'),
    confirmarContrasena: Yup.string()
      .oneOf([Yup.ref('contrasena'), undefined], 'La contrasena debe coincidir')
      .required('Requerido'),
  })

  export const registerValidationSchema = [basicInfoSchema, contactSchema]