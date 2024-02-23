import * as Yup from 'yup'
import useDataRegisterStore from '../../ZustandRegisterManagement'

 let isPaciente = String(useDataRegisterStore.getState()["tipo"]) === "Paciente";

const basicInfoSchema = Yup.object({
    nombre: Yup.string().required("requerido"),
    apellido: Yup.string().required("requerido"),
    sexo: Yup.string().oneOf(['m', 'f']).required("requerido"),
    /*fecha_nacimiento: Yup.string()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/, 
      'Formato de fecha inválido. Utiliza el formato YYYY-MM-DD'
    )
    .transform((value, originalValue) => {

      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
      }
    
      return originalValue;
    })
    .max(new Date().getTime(), 'La fecha no puede ser posterior a la fecha actual').nullable(),*/
    tipo: Yup.string().oneOf(['Paciente', 'Especialista']).required("requerido"),
    especialidad: Yup.string().test('especialidad-required', 'Especialidad requerida', function(value) {
        if (!isPaciente) {
            return !!value; 
        }
        return true; 
    }),
    documento_identidad: Yup.string().test('documento-required', 'Documento de identidad debe tener exactamente 11 digitos', function(value) {
        if (!isPaciente) {
            return Boolean(value && /^\d{11}$/.test(value)); 
        }
        return true; 
    }),
})

const contactSchema = Yup.object({
    telefono: Yup.string()
    .matches(/^1?(809|829|849)\d{7}$/, 'El numero de telefono invalido en  Rep. Dom.')
    .required('Número telefonico obligatorio'),
    correo: Yup.string().email('Direccion de correo invalida').required('Requerido'),
    contrasena: Yup.string()
    .min(6, 'La contrasena debe tener al menos 8 caracteres')
    .max(24, "La contrasena no debe superar los 24 caracteres")
    .required('Required'),
    confirmarContrasena: Yup.string()
      .oneOf([Yup.ref('contrasena'), undefined], 'La contrasena debe coincidir')
      .required('Requerido'),
  })

  export const registerValidationSchema = [basicInfoSchema, contactSchema]