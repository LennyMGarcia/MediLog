import * as Yup from 'yup'
import useDataRegisterStore from '../../ZustandRegisterManagement'
import dayjs from 'dayjs';

 let isPaciente = String(useDataRegisterStore.getState()["tipo"]) === "Paciente";

const basicInfoSchema = Yup.object({
    nombre: Yup.string().required("requerido"),
    apellido: Yup.string().required("requerido"),
    sexo: Yup.string().oneOf(['m', 'f']).required("requerido"),
    fecha_nacimiento: Yup.date()
    .nonNullable() 
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        // si el valor original es una cadena, intenta parsearlo como una fecha
        const date = dayjs(originalValue, 'YYYY-MM-DD').toDate();
        return date;
      }
      return value;
    })
    .max(new Date(), 'La fecha no puede ser posterior a la fecha actual')
    .required("Campo requerido")
    .typeError('Debe ser una fecha válida en formato YYYY-MM-DD como 2001-05-27'),
    tipo: Yup.string().oneOf(['Paciente', 'Especialista']).required("requerido"),
    documento_identidad:Yup.string().when('tipo', {
      is: "Paciente",
      then: (basicInfoSchema) => basicInfoSchema.required("requerido").length(11, "Documento de indentidad debe tener exactamente 11 digitos"),
      otherwise: (basicInfoSchema) => basicInfoSchema.notRequired()
    }),
    especialidad: Yup.string().when('tipo', {
      is: "Especialista",
      then: (basicInfoSchema) => basicInfoSchema.required('Especialidad requerida'),
      otherwise: (basicInfoSchema) => basicInfoSchema.notRequired(),
    }),
    
})

basicInfoSchema.describe({ value: { tipo: isPaciente } });

const contactSchema = Yup.object({
    telefono: Yup.string()
    .matches(/^1?(809|829|849)\d{7}$/, 'El numero de telefono invalido en  Rep. Dom.')
    .notRequired(),
    correo: Yup.string().email('Direccion de correo invalida').required('Requerido'),
    contrasena: Yup.string()
    .min(6, 'La contrasena debe tener al menos 8 caracteres')
    .max(24, "La contrasena no debe superar los 24 caracteres")
    .required('Required'),
    confirmarContrasena: Yup.string()
      .oneOf([Yup.ref('contrasena'), undefined], 'La contrasena debe coincidir')
      .required('Requerido'),
  });

  const pricingSchema = Yup.object({
    pricing: Yup.string().required("Plan requerido").when('tipo', {
      is: "Paciente",
      then: (basicInfoSchema) => basicInfoSchema.oneOf(['Basico', 'Familiar', "Paciente"], "Debe seleccionar un plan basico, familiar o paciente").required("requerido"),
      otherwise: (basicInfoSchema) => basicInfoSchema.oneOf(['Independiente', 'Hospitales', "Especialista"], "debe seleccionar un plan independiente, de especialista o hospitalario").required("requerido"),
    }),
  });

  const FinancialSchema = Yup.object({
    metodo_pago: Yup.string().oneOf(['Tarjeta de credito', 'Tarjeta de debito']).notRequired(),
    datos_financieros: Yup.string().length(16, "Debe tener 16 digitos").notRequired(),
    cvv: Yup.string()
    .min(3, "debe tener minimo 3 digitos")
    .max(4, "debe tener maximo 4 digitos")
    .notRequired(),
    fecha_expiracion: Yup.date()
    .nonNullable() 
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const date = dayjs(originalValue, 'YYYY-MM-DD').toDate();
        return date;
      }
      return value;
    })
    .notRequired()
    .typeError('Debe ser una fecha válida en formato YYYY-MM-DD como 2001-05-27'),
    descripcion: Yup.string().notRequired(),
  });

  export const registerValidationSchema = [basicInfoSchema, contactSchema, pricingSchema, FinancialSchema]