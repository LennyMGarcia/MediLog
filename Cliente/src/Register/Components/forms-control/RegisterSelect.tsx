import React, { useEffect } from 'react';
import { Field, FieldProps } from 'formik';
import { MenuItem, Select, SelectChangeEvent, SelectProps, useMediaQuery, useTheme } from '@mui/material';
import useDataRegisterStore, {RegisterSchemaValues } from "../../ZustandRegisterManagement";

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

//Lo hice para sacar una propiedad de getState de zustand, puede estar mas arriba ya que puede ser utilizado nuevamente
interface RegisterExtendedState extends RegisterSchemaValues {
    [key: string]: any;
}

const RegisterSelect: React.FC<ISelect> = ({ label, name = "name", selectObject, ...rest }) => {

    const { setRegisterData } = useDataRegisterStore();
    //Para mantener el select cuando se vuelva atras, simplemente revisa name y setRegister data y actualiza
    /*Tenia useState pero este funciona mejor ya que el useState cuando se desmontaba se reiniciaba
       y podia agregarla pero seria mucho codigo cuando se usara un useEffect*/
    useEffect(() => {
        const state = useDataRegisterStore.getState() as RegisterExtendedState;
        if (!state[name]) {
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
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name}>
                {({ form }: FieldProps) => (
                    <React.Fragment>
                        <Select
                            id={name}
                            variant="filled"
                            fullWidth
                            displayEmpty 
                            value={(useDataRegisterStore.getState() as RegisterExtendedState)[name] || ''}//explicacion en la interfaz
                            onChange={handleChange}
                            {...rest}
                            error={Boolean(form.errors[name] && form.touched[name])}
                            sx={{height: '50px',
                             mb:"10px",display:"block", width: isMediumScreen? "31.25rem" : "18.75rem"}}
                        >
                            <MenuItem key="" value="" disabled defaultValue="sel">
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
                    </React.Fragment>
                )}
            </Field>
        </>
    )
}

export default RegisterSelect;







