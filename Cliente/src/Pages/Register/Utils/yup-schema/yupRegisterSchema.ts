import * as Yup from 'yup'
import useDataRegisterStore from '../../ZustandRegisterManagement'
import dayjs from 'dayjs';

 let isPaciente:boolean = String(useDataRegisterStore.getState()["tipo"]) === "Paciente";

const basicInfoSchema = Yup.object({
    nombre: Yup.string()
    .matches(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/, 'El nombre debe seguir el formato correcto, Mayusculas al empezar')
    .matches(/^[^0-9]*$/, 'El nombre no debe contener números')
    .matches(/^[a-zA-Z0-9\s]*$/, 'El nombre no puede contener caracteres especiales')
    .max(35, "El nombre no debe superar los 35 caracteres")
    .required("requerido"),
    apellido: Yup.string()
    .matches(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/, 'El apellido debe seguir el formato correcto')
    .matches(/^[^0-9]*$/, 'El apellido no debe contener números')
    .matches(/^[a-zA-Z0-9\s]*$/, 'El apellido no puede contener caracteres especiales')
    .max(35, "El apellido no debe superar los 35 caracteres")
    .required("requerido"),
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
    .required("requerido")
    .typeError('Debe ser una fecha válida en formato DD-MM-YYYY como 27-05-2001'),
    tipo: Yup.string().oneOf(['Paciente', 'Especialista']).required("requerido"),
    documento_identidad:Yup.string().when('tipo', {
      is: "Paciente",
      then: (basicInfoSchema) => basicInfoSchema
      .required("requerido")
      .matches(/^[0-9]*$/, 'La documento de indetidad solo puede contener números')
      .length(11, "Documento de indentidad debe tener exactamente 11 digitos"),
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
    .matches(/^[0-9]*$/, 'La cvv solo puede contener números')
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
    .typeError('Debe ser una fecha válida en formato DD-MM-YYYY como 27-05-2001'),
    descripcion: Yup.string().notRequired(),
  });

  export const registerValidationSchema = [basicInfoSchema, contactSchema, pricingSchema, FinancialSchema]