
import React, { ChangeEvent } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useTheme from '@mui/material/styles/useTheme';
import { Field, FieldProps, ErrorMessage, FieldArray } from 'formik';
import TextField, { TextFieldProps } from '@mui/material/TextField/TextField';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Box from '@mui/material/Box/Box';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import Accordion from '@mui/material/Accordion/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import profileStyle from "../../style/profileStyle.module.css"

interface InputProps extends Omit<TextFieldProps, 'variant'> {
    label?: React.ReactNode,
    name?: string,
    placeHolder?: string,
    Values?:any[],
}

const ProfileMultiInput: React.FC<InputProps> = ({ label, name = "", placeHolder, Values ,...rest }) => {
    //const { setRegisterData } = useDataRegisterStore();

    const handleChange = (e: ChangeEvent<any>) => {
        const value = e.target.value.trim();
        //setRegisterData(name, value);
    };
    
    

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box>
            <Accordion key={name}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id={name}
                >
                    {label}
                </AccordionSummary>
                <AccordionDetails>
                    <FieldArray name={name}>
                        {fieldArrayProps => {
                            const { push, remove, form } = fieldArrayProps;
                            const { values } = form;
                            const arrayValues = values[name] || [];
                            
                             
                            

                            return (
                                <Box>
                                    {arrayValues.map((_: any, index: any) => (
                                        <Box key={index}>
                                            <Field name={`arrayValues[${index}]`}
                                           
                                            >
                                                {({ field, form }: FieldProps) => (
                                                    <React.Fragment>
                                                        <TextField
                                                            id={name}
                                                            placeholder={placeHolder ? `${placeHolder}` : ""}
                                                            variant="outlined"
                                                            color="primary"
                                                            fullWidth
                                                            value={(Values ?? [])[index] ?? ""}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleChange(e);
                                                                {console.log(`arrayValues[${index}]`)}
                                                            }}
                                                            error={Boolean(form.errors[name] && form.touched[name])}
                                                            {...rest}
                                                            sx={{
                                                                '& .MuiInputBase-root': {
                                                                    height: 'auto',
                                                                },
                                                                mt: index == 0 ? "-1rem" : "0.5rem "
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
                                            
                                                <Button variant="contained" sx={{
                                                    backgroundColor: " #52b69a",
                                                    height: "1rem",
                                                    width: '1rem',
                                                    '&:hover': {
                                                        backgroundColor: "#34a0a4"
                                                    }
                                                }} type='button' onClick={() => {
                                                    Swal.fire({
                                                        title: '¿Estás seguro?',
                                                        text: `Esta acción eliminará este elemento`,
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#52b69a',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Sí, eliminarlo',
                                                        cancelButtonText: 'Cancelar',
                                                        customClass: {
                                                            container: profileStyle.sweetAlertContainer,
                                                        },
                                                        allowOutsideClick: () => !Swal.isLoading(),
                                                        allowEscapeKey: () => !Swal.isLoading(),
                                                        allowEnterKey: () => !Swal.isLoading(),
                                                        stopKeydownPropagation: false,

                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            remove(index);
                                                            Swal.fire({
                                                                    title: 'Eliminado',
                                                                    text: 'El elemento ha sido eliminado.',
                                                                    icon: 'success',
                                                                    customClass: {
                                                                      container: profileStyle.sweetAlertContainer, 
                                                                    }
                                                                  }
                                                            );
                                                        }
                                                    });
                                                }}>
                                                    - {/*Simbolo negativo*/}
                                                </Button>
                                        </Box>
                                    ))}
                                    <Button sx={{
                                        backgroundColor: " #52b69a",
                                        height: "1rem",
                                        width: '1rem',
                                        '&:hover': {
                                            backgroundColor: "#34a0a4"
                                        }
                                    }} variant="contained" type='button' onClick={() => push('')}>
                                        + {/*Simbolo positivo*/}
                                    </Button>
                                    
                                </Box>
                            )
                        }}
                    </FieldArray>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default ProfileMultiInput;


