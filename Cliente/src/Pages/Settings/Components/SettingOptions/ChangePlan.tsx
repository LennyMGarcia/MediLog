import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box/Box';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from "@mui/material/Button/Button";
import Divider from '@mui/material/Divider/Divider';


interface Option {
    value: string,
    label: string,
    subLabel: string,
    color: string,
}

interface RadioCardProps {
    options: Option[];
}



const ChangePlan: React.FC = () => {
    const options: Option[] = [
        { value: 'small', label: 'Plan Basico - $0 - ', subLabel: "Plan con los requerimientos esenciales, sin ventajas anadidas", color: "#52b69a" },
        { value: 'medium', label: 'Plan Familiar - $1000', subLabel: "Plan escalable, costumizable, con opciones avanzadas y para toda la familia", color: "#34a0a4" },
        { value: 'large', label: 'Plan Paciente', subLabel: "Plan  escalable y costumizable para un solo usuario", color: "#d9ed92" },
    ];

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
                padding: "1px"

            }}>
                <Typography variant="h5" sx={{ margin: "0.7rem", marginLeft: "5rem" }}>Configuracion de la cuenta</Typography>
            </Box>

            <Box sx={{
                backgroundColor: "#fff",
                width: "15vw",
                height: "5vh",
                boxShadow: 1,
                margin: "3rem 0 0 3rem",
                display: "flex", justifyContent: "center", alignItems: "center",
                borderStartStartRadius: "1rem",
                borderTopRightRadius: "1rem"
            }}>
                <SettingsIcon sx={{ color: "gray", width: "1rem", height: "1rem", paddingRight: "0.5rem" }} /><Typography variant="subtitle1" sx={{ color: "gray" }}>configuracion /</Typography>
            </Box>

            <Box sx={{
                backgroundColor: "#fff",
                width: "90vw",
                height: "100vh",
                boxShadow: 1,
                marginLeft: "3rem"
            }}>


                <Typography variant="h6" sx={{ padding: "2rem 0 0.5rem 3rem" }}>Configuracion de Plan</Typography>
                <Typography variant="subtitle2" sx={{ padding: "0 0 1rem 3rem", color: "gray" }}>Cambia la configuracion y el tipo de plan</Typography>
                <Divider variant="middle" sx={{ margin: "0 2rem" }} />

                <Typography variant="subtitle1" sx={{ padding: "1rem 0 0 3rem" }}>Plan</Typography>
                <Typography variant="subtitle2" sx={{ padding: "0 0 1rem 3rem", color: "gray" }}>Cambia la configuracion de tu plan</Typography>
                <RadioCard options={options} />


            </Box>

        </Box>
    );
};

const RadioCard: React.FC<RadioCardProps> = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (value: string) => {
        setSelectedOption(value);
    };

    return (
        <div>
            {options.map((option) => (
                <Card
                    key={option.value}
                    onClick={() => handleOptionChange(option.value)}
                    sx={{ margin: "1rem 0 0 3rem", paddingLeft: "1rem", display: "flex", justifyContent: "left", alignItems: "center", cursor: 'pointer', marginBottom: 1, borderRadius: "1rem", border: selectedOption === option.value ? '2px solid #52b69a' : '2px solid #e9ecef', width: "40rem", height: "5rem" }}
                >   <Box sx={{ backgroundColor: option.color != "" ? option.color : "#e9ecef", borderRadius: "50%", width: "3rem", height: "3rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ViewInArIcon></ViewInArIcon>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="h6">{option.label}</Typography>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                {option.subLabel}
                            </Typography>
                        </CardContent>
                    </Box>

                </Card>
            ))}
        </div>
    );
};

export default ChangePlan;


