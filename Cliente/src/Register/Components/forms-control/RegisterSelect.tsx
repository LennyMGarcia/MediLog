import React, { useState } from 'react';
import { Field, FieldProps } from 'formik';
import { MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import useDataRegisterStore from "../../ZustandRegisterManagement";

interface ISelect extends Omit<SelectProps, "variant"> {
    label?: React.ReactNode,
    name?: string,
    selectObject?: {
        key: string | number,
        value: string | number
    }[]
}

const RegisterSelect: React.FC<ISelect> = ({ label, name = "name", selectObject, ...rest }) => {
    
    const { setRegisterData } = useDataRegisterStore();
    const [value, setValue] = useState('');

    const handleChange = (e: SelectChangeEvent<any>) => {
        const newValue = e.target.value;
        setValue(newValue);  // Actualizamos el estado
        setRegisterData(name, newValue);  // Llamamos a la función para actualizar los datos en el almacén
    };
    
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name}>
                {({ field, form }: FieldProps) => (
                    <React.Fragment>
                        <Select
                            id={name}
                            variant="filled"
                            fullWidth
                            displayEmpty
                            value={value}  // Usamos el estado value aquí en lugar de field.value
                            onChange={handleChange}
                            {...rest}
                            error={Boolean(form.errors[name] && form.touched[name])}            
                        >   
                        <MenuItem key="" value="" disabled defaultValue="sel">
                                    Seleccione una opcion
                          </MenuItem>
                            {Array.isArray(selectObject) ? (
                                selectObject.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.key}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem key="" value="">
                                    <p>No hay nada</p>
                                </MenuItem>)}
                        </Select>
                    </React.Fragment>

                )}
            </Field>
        </>
    )
}

export default RegisterSelect;





