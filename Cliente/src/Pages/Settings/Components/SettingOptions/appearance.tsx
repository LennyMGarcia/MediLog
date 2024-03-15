
import Box from "@mui/material/Box/Box";
import registerDoctor from "/assets/Pictures/registerDoctor.jpg";
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router";
import Divider from "@mui/material/Divider/Divider";

import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio/Radio";

import FormControl from "@mui/material/FormControl/FormControl";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import { useState } from "react";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Slider from "@mui/material/Slider/Slider";

import * as React from 'react';
import Swal from "sweetalert2";
import LinearScaleIcon from '@mui/icons-material/LinearScale';


const marks = [
    {
        value: 0,
        label: 'Pequeña',
    },
    {
        value: 50,
        label: 'Mediana',
    },
    {
        value: 100,
        label: 'Grande',
    },
];

interface ImageRadioButtonProps {
    value: string,
    src: string,
    alt: string,
    onChange: (value: string) => void,
    selectedValue: string,
    name: string,
}

const HandleResetButtom = () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: `Esta acción restablecera toda la configuracion`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#52b69a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, restablecelo',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: () => !Swal.isLoading(),
        allowEscapeKey: () => !Swal.isLoading(),
        allowEnterKey: () => !Swal.isLoading(),
        stopKeydownPropagation: false,

    }).then((result) => {
        if (result.isConfirmed) {
            
            Swal.fire({
                title: 'Eliminado',
                text: 'Se ha restableecido todo con exito.',
                icon: 'success',
                
            });
        }
    });
};


const Appearance: React.FC = () => {

    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleChange = (value: string) => {
        setSelectedValue(value);
    };

    return (
        <Box sx={{
            backgroundColor: "#e9ecef",
            width: "100vw",
            height: "160vh",
            padding: "1px"
        }}>
            <Box sx={{
                backgroundColor: "#fff",
                width: "100vw",
                height: "10vh",
                boxShadow: 1,
                padding: "1px",
                display:"flex",
                justifyContent:"left",
                alignItems:"center"

            }}>
                <LinearScaleIcon sx={{ margin: "0.7rem", marginLeft: "3rem" }}></LinearScaleIcon>
                <Typography variant="h5" sx={{ margin: "0.7rem", marginLeft: "0.5rem" }}>Apariencia</Typography>
            </Box>

            <Box sx={{
                backgroundColor: "#fff",
                width: "16vw",
                height: "5vh",
                boxShadow: 1,
                margin: "3rem 0 0 3rem",
                display: "flex", justifyContent: "center", alignItems: "center",
                borderStartStartRadius: "1rem",
                borderTopRightRadius: "1rem"
            }}>
                <SettingsIcon sx={{ color: "gray", width: "1rem", height: "1rem", paddingRight: "0.5rem" }} /><Typography variant="subtitle1" sx={{ color: "gray" }}>configuracion / Apariencia</Typography>
            </Box>

            <Box sx={{
                backgroundColor: "#fff",
                width: "90vw",
                height: "130vh",
                boxShadow: 1,
                marginLeft: "3rem"
            }}>

                <Typography variant="h6" sx={{ padding: "2rem 0 0.5rem 3rem" }}>Apariencia</Typography>
                <Typography variant="subtitle2" sx={{ padding: "0 0 1rem 3rem", color: "gray" }}>Cambia como quieres que luzca el sistema</Typography>
                <Divider variant="middle" sx={{ margin: "0 2rem" }} />

                <Typography variant="subtitle1" sx={{ padding: "1rem 0 0rem 3rem" }}>Reiniciar configuracion</Typography>
                <Box sx={{display:"flex", justifyContent:"space-between", textAlign:"center", padding: "0 0rem 0.5rem 0", }}>
                <Typography variant="subtitle2" sx={{ padding: "0 0 0 3rem", color: "gray" }}>Regrese al aspecto base del sistema</Typography>
                <Button variant="contained" sx={{ marginRight:"3rem", background:"#52b69a", '&:hover': { backgroundColor: '#34a0a4',},}} onClick={HandleResetButtom}>
                    Reset
                </Button>
                </Box>
                
                <Divider variant="middle" sx={{ margin: "0 2rem" }} />

                <Typography variant="subtitle1" sx={{ padding: "1rem 0 0 3rem" }}>Tema</Typography>
                <Typography variant="subtitle2" sx={{ padding: "0 0 1rem 3rem", color: "gray" }}>Elige el tema de tu preferencia</Typography>
                <FormControl component="fieldset" sx={{ paddingLeft: "6rem", marginBottom: "1rem" }}>
                    <RadioGroup row aria-label="gender" name="gender1" value={selectedValue} onChange={(e) => handleChange(e.target.value)}>
                        <ImageRadioButton value="option1" src={registerDoctor} alt="Opción 1" name="Claro" onChange={handleChange} selectedValue={selectedValue} />
                        <ImageRadioButton value="option2" src={registerDoctor} alt="Opción 2" name="Oscuro" onChange={handleChange} selectedValue={selectedValue} />

                    </RadioGroup>
                </FormControl>
                <Divider variant="middle" sx={{ margin: "0 2rem" }} />

                <FontSizeSlider />
            </Box>
        </Box>
    );
};

const ImageRadioButton: React.FC<ImageRadioButtonProps> = ({ value, src, alt, name, onChange, selectedValue }) => {
    const imageStyle: React.CSSProperties = {
        width: '20rem',
        height: '15rem',
        marginLeft: "-22.2rem",
        marginBottom: "12.3rem",
        cursor: 'pointer',
        border: '2px solid transparent',
        borderRadius: "1rem"
    };

    const selectedStyle: React.CSSProperties = {
        borderColor: "#52b69a",
    };

    return (
        <Box sx={{ marginLeft: "14rem" }}>
            <FormControlLabel
                value={value}
                control={<Radio checkedIcon={<CheckCircleRoundedIcon sx={{color:"#52b69a"}}/>} sx={{ margin: "2rem" }} />}
                label={
                    <img
                        src={src}
                        alt={alt}
                        style={{
                            ...imageStyle,
                            ...(value === selectedValue ? selectedStyle : { borderColor: "white" }),
                        }}
                        onClick={() => onChange(value)}
                    />
                }
            >
            </FormControlLabel>
            <Typography variant="subtitle2" sx={{ marginTop: "-12.5rem", marginLeft: "-15.5rem" }}>{name}</Typography>
        </Box>

    );
};

const FontSizeSlider: React.FC = () => {
    const [value, setValue] = React.useState<number | string | Array<number | string>>(50);

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            let numericValue: any;

            if (typeof value === 'string') {
                numericValue = parseInt(value, 10);
            } else {
                numericValue = value;
            }

            const closestValue = newValue.reduce((prev, curr) => (
                Math.abs(curr - numericValue) < Math.abs(prev - numericValue) ? curr : prev
            )); //si es mayor se pone prev, si es menor se pone current, si pones 45 al principio se pondra
            //current que es 50 por el array de marks, luego se evalua la otra y da false asi que se pone prev que es 50

            setValue(closestValue);
        } else {
            setValue(newValue);
        }
    };

    return (
        <Box sx={{ width: "50rem" }}>
            <Typography variant="subtitle1" sx={{ padding: "1rem 0 0 3rem" }}>Tema</Typography>
            <Typography variant="subtitle2" sx={{ padding: "0 0 1rem 3rem", color: "gray" }}>Elige el tema de tu preferencia</Typography>
            <Slider
                sx={{ margin: "1rem 0 0 4rem", color: "#52b69a" }}
                track={false}
                value={Number(value)}
                onChange={handleChange}
                marks={marks}
                step={null}
                size="medium"
                valueLabelDisplay="on"
            />
        </Box>
    );
};

export default Appearance;