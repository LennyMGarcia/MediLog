import { Field, FieldProps } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent} from 'react';
import { RegisterSchema } from '../../ZustandRegisterManagement';
interface InputProps extends Omit<TextFieldProps, 'variant'> {
    label?: React.ReactNode, 
    name?: string,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    setRegisterData: (newData: RegisterSchema) => void,
}

const RegisterInput: React.FC<InputProps> = ({ label, name = "name", onChange, setRegisterData, ...rest }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value; // Extraer el valor del evento
        
    };

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                name={name}
                value={"todavia"} 
                onChange={handleChange} 
                {...rest}
            >
                {({ field, form }: FieldProps) => (
                    <TextField
                        id={name}
                        size="medium" 
                        variant="filled"
                        fullWidth
                        color="primary"
                        {...field}
                        {...rest}
                        error={Boolean(form.errors[name] && form.touched[name])}
                        helperText={form.errors[name] && form.touched[name] ? String(form.errors[name]) : ''}
                    />
                )}
            </Field>
        </>
    );
};

export default RegisterInput;
