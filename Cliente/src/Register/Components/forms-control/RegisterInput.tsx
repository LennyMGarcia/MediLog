import { Field, FieldProps } from 'formik';
import { Box, TextField, TextFieldProps, useMediaQuery, useTheme } from '@mui/material';
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

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box display="flex" flexDirection="column" width={isMediumScreen ? "31.25rem" : "18.75rem"} pb="0.625rem">
            {label && <label htmlFor={name}>{label}</label>}
            <Field id={name} name={name}>
                {({ field, form }: FieldProps) => (
                    <TextField
                        id={name}
                        placeholder={`Escriba su ${name}`}
                        variant="filled"
                        color="primary"
                        fullWidth
                        value={field.value}
                        onChange={(e) => {
                            field.onChange(e);
                            handleChange(e);
                        }}
                        error={Boolean(form.errors[name] && form.touched[name])}
                        helperText={form.errors[name] && form.touched[name] ? String(form.errors[name]) : ''}
                        {...rest}
                        sx={{
                            '& .MuiInputBase-root': { //elementos que tienen textfield le aplica el heigth
                                height: '2.813rem',
                            },
                            display: "block",
                        }}
                    />
                )}
            </Field>
        </Box>
    );
};

export default RegisterInput;




