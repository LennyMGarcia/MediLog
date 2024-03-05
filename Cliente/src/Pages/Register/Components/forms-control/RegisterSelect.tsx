import React, { useEffect } from 'react';

import useDataRegisterStore from "../../ZustandRegisterManagement";
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select/Select';
import { Field, FieldProps, ErrorMessage  } from 'formik';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';

//Solo para omitir variant en la seleccion de SelectProps, puede ser usado nuevamente
interface ISelect extends Omit<SelectProps, "variant"> {
    label?: React.ReactNode,
    name?: string,
    //Ayuda bastante a proporcionar una clave que puede ser el texto de menuItem y un valor que va a la DB
    selectObject?: {
        key: string | number,
        value: string | number
    }[]
}

const RegisterSelect: React.FC<ISelect> = ({ label, name = "name", selectObject, ...rest }) => {

    const { setRegisterData, getRegisterData } = useDataRegisterStore();
    //Para mantener el select cuando se vuelva atras, simplemente revisa name y setRegister data y actualiza
    /*Tenia useState pero este funciona mejor ya que el useState cuando se desmontaba se reiniciaba
       y podia agregarla pero seria mucho codigo cuando se usara un useEffect*/
    useEffect(() => {
        const state = getRegisterData(name);
        if (!state) {
            setRegisterData(name, '');
        }
    }, [name, setRegisterData]);

    const handleChange = (e: SelectChangeEvent<any>) => {
        const newValue = e.target.value;
        setRegisterData(name, newValue);
    };

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <>
            <label htmlFor={name} style={{ fontSize: "0.9rem", display: "block" }}>{label}</label>

            <Field id={name} name={name}>
                {({ field, form }: FieldProps) => (
                    <React.Fragment>
                        <Select
                            id={name}
                            name={field.name}
                            variant="filled"
                            fullWidth
                            displayEmpty
                            value={getRegisterData(name) || ''}
                            onChange={(e) => {
                                field.onChange(e);
                                handleChange(e);
                            }}
                            {...rest}
                            error={Boolean(form.errors[name] && form.touched[name])}
                            sx={{
                                height: '2rem', fontSize: "0.9rem",
                                mb: "1px", maxWidth: isMediumScreen ? "29.25rem" : "18.75rem"
                            }}
                        >
                            <MenuItem key="" value="" disabled defaultValue="sel" >
                                Seleccione una opcion
                            </MenuItem>
                            {Array.isArray(selectObject) ? ( //Revisa si hay un array de objetos y lo recorre
                                selectObject.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.key}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem key="" value="" disabled>
                                    <span>No hay nada</span>
                                </MenuItem>)}
                        </Select>
                        <ErrorMessage name={name}>
                            {(msg) => (
                                <FormHelperText style={{ color: 'red' }}>{msg}</FormHelperText>
                            )}
                        </ErrorMessage>
                    </React.Fragment>
                )}
            </Field>
        </>
    )
}

export default RegisterSelect;







