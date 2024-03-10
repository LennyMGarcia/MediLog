
import React, { ChangeEvent } from 'react';

import useTheme from '@mui/material/styles/useTheme';
import { Field, FieldProps, ErrorMessage } from 'formik';
import TextField, { TextFieldProps } from '@mui/material/TextField/TextField';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Box from '@mui/material/Box/Box';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import useDataRegisterStore from '../../../Register/ZustandRegisterManagement';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
    label?: React.ReactNode,
    name?: string,
    placeHolder?:string
}

const ProfileInput: React.FC<InputProps> = ({ label, name = "", placeHolder, ...rest }) => {
    const { setRegisterData } = useDataRegisterStore();

    const handleChange = (e: ChangeEvent<any>) => {
        const value = e.target.value.trim();
        setRegisterData(name, value);
    };

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box display="flex" flexDirection="column" width={isMediumScreen ? "29.25rem" : "18.75rem"} pb="-2rem">
            <Field id={name} name={name}>
                {({ field, form }: FieldProps) => (
                   <React.Fragment>
                    <TextField
                        label={label}
                        id={name}
                        placeholder={placeHolder ? `${placeHolder}` : ""}
                        variant="outlined"
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
                                height: 'auto', 
                            },
                            mt: "0.5rem"
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

export default ProfileInput;




