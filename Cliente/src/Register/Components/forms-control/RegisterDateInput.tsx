import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Field, FieldProps } from 'formik';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import useDataRegisterStore, { getAllRegisterData } from "../../ZustandRegisterManagement";

interface DateProps  {
    label?: React.ReactNode,
    name?: string,
}

const RegisterDateInput: React.FC<DateProps> = ({ label, name = "", ...rest }) => {
    const { setRegisterData } = useDataRegisterStore();

    const handleChange = (e: any) => {
        const value = e; //contiene directamente el valor de la fecha seleccionada
        console.log(getAllRegisterData());
        setRegisterData(name, value);
    };

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box display="flex" flexDirection="column" width={isMediumScreen ? "29.25rem" : "18.75rem"} pb="0.625rem">
            {label && <label htmlFor={name} style={{fontSize:"0.9rem"}}>{label}</label>}
            <Field id={name} name={name}>
                {({ field, form }: FieldProps) => (
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                        id={name}
                        format="DD-MM-YYYY"
                        variant="filled"
                        disableFuture
                        color="primary"
                        fullWidth
                        value={field.value}
                        onChange={(date) => {
                            const convertToDate = new Date(date);
                            handleChange(convertToDate); 
                        }}
                        helperText={form.errors[name] && form.touched[name] ? String(form.errors[name]) : ''}
                        {...rest}
                        sx={{
                            '& .MuiInputBase-root': { //elementos que tienen textfield le aplica el heigth
                                height: '2rem',
                            },
                            display: "block",
                        }}
                    />
                    </LocalizationProvider>
                )}
            </Field>
        </Box>
    );
};

export default RegisterDateInput;
