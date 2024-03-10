import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
//import useDataRegisterStore from "../../ZustandRegisterManagement";
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';;
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import { Field, ErrorMessage} from 'formik';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Box from '@mui/material/Box/Box';
import { useFormikContext } from 'formik';
import useDataRegisterStore from '../../../Register/ZustandRegisterManagement';

interface DateProps  {
    label?: React.ReactNode,
    name?: string,
}

const ProfileDateInput: React.FC<DateProps> = ({ label, name = "", ...rest }) => {
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
            <Field id={name} name={name}>
                {() => (
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                        label={label}
                        id={name}
                        format="DD-MM-YYYY"
                        variant="outlined"
                        disableFuture
                        color="primary"
                        fullWidth
                        value={value}
                        onChange={(date) => handleChange(date)}
                        {...rest}
                        sx={{
                            '& .MuiInputBase-root': {
                                height: '3rem',
                            },
                            display: "block", mt: "0.5rem"
                        }}
                    />
                    <ErrorMessage name={name}>
                            {(msg) => (
                                <FormHelperText style={{ color: 'red' }}>{msg}</FormHelperText>
                            )}
                        </ErrorMessage>
                    </LocalizationProvider>
                )}
            </Field>
        </Box>
    );
};

export default ProfileDateInput;
