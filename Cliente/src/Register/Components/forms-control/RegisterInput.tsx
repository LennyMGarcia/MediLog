import {Field, FieldProps} from 'formik';
import { TextField } from '@mui/material';


interface InputProps{
    label:string,
    name:string
}

const RegisterInput:React.FC<InputProps> = ({label, name, ...rest}) => {
    return(
    <>
        <label htmlFor={name}>{label}</label>
        <Field
         name={name}
         {...rest}
        >
            {({field, form}:FieldProps) => (
                    <TextField
                    id={name}
                    variant="filled"
                    fullWidth
                    {...field}
                    {...rest}
                    error= {Boolean(form.errors[name] && form.touched[name])}
                    helperText={form.errors[name] && form.touched[name] ? String(form.errors[name]) : ''}
                    />
                )}
        </Field>
    </>
)}

export default RegisterInput;