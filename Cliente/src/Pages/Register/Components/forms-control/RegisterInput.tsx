
import React, { ChangeEvent } from 'react';
import useDataRegisterStore, { getAllRegisterData } from "../../ZustandRegisterManagement";
import useTheme from '@mui/material/styles/useTheme';
import { Field, FieldProps, ErrorMessage } from 'formik';
import TextField, { TextFieldProps } from '@mui/material/TextField/TextField';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Box from '@mui/material/Box/Box';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
    label?: React.ReactNode,
    name?: string,
    placeHolder?:string
}

const RegisterInput: React.FC<InputProps> = ({ label, name = "", placeHolder, ...rest }) => {
    const { setRegisterData } = useDataRegisterStore();

    const handleChange = (e: ChangeEvent<any>) => {
        const value = e.target.value.trim();
        console.log(getAllRegisterData());
        setRegisterData(name, value);
    };

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box display="flex" flexDirection="column" width={isMediumScreen ? "29.25rem" : "18.75rem"} pb="-2rem">
            {label && <label htmlFor={name} style={{fontSize:"0.9rem", marginBottom:"2px"}}>{label}</label>}
            <Field id={name} name={name}>
                {({ field, form }: FieldProps) => (
                   <React.Fragment>
                    <TextField
                        id={name}
                        placeholder={placeHolder ? `${placeHolder}` : ""}
                        variant="filled"
                        color="primary"
                        fullWidth
                        
                        value={field.value || ""}
                        onChange={(e) => {
                            field.onChange(e);
                            handleChange(e);
                        }}
                        error={Boolean(form.errors[name] && form.touched[name])}
                        {...rest}
                        sx={{
                            '& .MuiInputBase-root': { //elementos que tienen textfield le aplica el heigth
                                height: '2rem',
                            },
                            display: "block",
                        }}
                    />
                    <ErrorMessage name={name}>
                            {(msg) => (
                                <FormHelperText style={{ color: 'red' }}>{msg}</FormHelperText>
                            )}
                        </ErrorMessage>
                    </React.Fragment>
                )}
            </Field>
        </Box>
    );
};

export default RegisterInput;




