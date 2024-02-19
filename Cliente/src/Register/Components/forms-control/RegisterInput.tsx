import { Field, FieldProps } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';
import useDataRegisterStore from "../../ZustandRegisterManagement";

interface InputProps extends Omit<TextFieldProps, 'variant'> {
    label?: React.ReactNode,
    name?: string,
}

const RegisterInput: React.FC<InputProps> = ({ label, name = "", ...rest }) => {
    const { setRegisterData } = useDataRegisterStore();

    const handleChange = (e: ChangeEvent<any>) => {
        const value = e.target.value;
        setRegisterData(name, value);
    };

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <Field name={name}>
                {({ field, form }: FieldProps) => (
                    <TextField
                        id={name}
                        size="medium"
                        variant="filled"
                        fullWidth
                        color="primary"
                        value={field.value}
                        onChange={(e) => {
                            field.onChange(e);
                            handleChange(e);
                        }}
                        error={Boolean(form.errors[name] && form.touched[name])}
                        helperText={form.errors[name] && form.touched[name] ? String(form.errors[name]) : ''}
                        {...rest}
                    />
                )}
            </Field>
        </>
    );
};

export default RegisterInput;



