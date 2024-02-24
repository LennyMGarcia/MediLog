import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Field, FieldProps, useFormikContext } from 'formik';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import useDataRegisterStore from "../../ZustandRegisterManagement";
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';

interface DateProps  {
    label?: React.ReactNode,
    name?: string,
}

const RegisterDateInput: React.FC<DateProps> = ({ label, name = "", ...rest }) => {
    const { setRegisterData } = useDataRegisterStore();
    const formik = useFormikContext<any>();
    const [value, setValue] = React.useState<Dayjs | null>(null);

    useEffect(() => {
        if (formik.values[name]) {
            setValue(dayjs(formik.values[name]));
        }
    }, [formik.values[name]]);

    const handleChange = (date: Dayjs | null) => {
        setValue(date);
        formik.setFieldValue(name, date ? date.format('YYYY-MM-DD') : null); //establecer el valor en el formulario
        setRegisterData(name, date ? date.toDate() : null);
    };
    
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box display="flex" flexDirection="column" width={isMediumScreen ? "29.25rem" : "18.75rem"} pb="0.625rem">
            {label && <label htmlFor={name} style={{fontSize:"0.9rem"}}>{label}</label>}
            <Field id={name} name={name}>
                {({ form }: FieldProps) => (
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                        id={name}
                        format="DD-MM-YYYY"
                        variant="filled"
                        disableFuture
                        color="primary"
                        fullWidth
                        value={value}
                        onChange={(date) => handleChange(date)}
                        helperText={form.errors[name] && form.touched[name] ? String(form.errors[name]) : ''}
                        {...rest}
                        sx={{
                            '& .MuiInputBase-root': {
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
