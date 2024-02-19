import React from 'react';
import { Field, FieldProps } from 'formik';
import { MenuItem, Select, SelectProps } from '@mui/material';

interface ISelect extends Omit<SelectProps, "variant"> {
    label?: React.ReactNode,
    name?: string,
    selectObject?: {
        key: string | number,
        value: string | number
    }[]
}

const RegisterSelect: React.FC<ISelect> = ({ label, name = "name", selectObject = { key: "key", value: "value" }, ...rest }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <Field
                name={name}
                {...rest}
            >
                {({ field, form }: FieldProps) => (
                    <React.Fragment>
                        <Select
                            id={name}
                            variant="filled"
                            fullWidth
                            displayEmpty
                            {...field}
                            {...rest}
                            error={Boolean(form.errors[name] && form.touched[name])}            
                        >   
                            {Array.isArray(selectObject) ? (
                                selectObject.map((option, index) => (
                                    <MenuItem key={index} value={option.value}  defaultValue={option.value}  selected={index === 0}>
                                        {option.key}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem key={selectObject.key} value={selectObject.value}>
                                    {selectObject.value}
                                </MenuItem>)}
                        </Select>
                    </React.Fragment>

                )}
            </Field>
        </>
    )
}

export default RegisterSelect;