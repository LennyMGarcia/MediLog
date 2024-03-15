
import Box from "@mui/material/Box/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import registerDoctor from "/assets/Pictures/registerDoctor.jpg";
import SettingsIcon from '@mui/icons-material/Settings';
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router";
import Divider from "@mui/material/Divider/Divider";

import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio/Radio";
import { createStyles, makeStyles } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl/FormControl";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import { useState } from "react";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';



interface ImageRadioButtonProps {
    value: string,
    src: string,
    alt: string,
    onChange: (value: string) => void,
    selectedValue: string,
    name:string,
}

const ImageRadioButton: React.FC<ImageRadioButtonProps> = ({ value, src, alt, name, onChange, selectedValue }) => {
    const imageStyle: React.CSSProperties = {
        width: '10rem',
        height: '10rem',
        marginLeft:"-12.2rem",
        marginBottom:"7.3rem",
        cursor: 'pointer',
        border: '2px solid transparent',
        borderRadius:"1rem"
    };

    const selectedStyle: React.CSSProperties = {
        borderColor: 'blue',
    };

    return (
        <Box sx={{marginLeft:"5rem"}}>
            <FormControlLabel
            value={value}
            control={<Radio checkedIcon={<CheckCircleRoundedIcon/>} sx={{margin:"2rem"}} />}
            label={
                <img
                    src={src}
                    alt={alt}
                    style={{
                        ...imageStyle,
                        ...(value === selectedValue ? selectedStyle : {borderColor:"white"}),
                    }}
                    onClick={() => onChange(value)}
                />
                
            }
        >
        </FormControlLabel>
        <Typography variant="subtitle2" sx={{marginTop:"-7.5rem", marginLeft:"-5.5rem"}}>{name}</Typography>
        </Box>
        
    );
};


const Appearance: React.FC = () => {
    const navigate = useNavigate();

    const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

    return (
        <Box sx={{
            backgroundColor: "#e9ecef",
            width: "100vw",
            height: "100vh",
            padding: "1px"
        }}>
            <Box sx={{
                backgroundColor: "#fff",
                width: "100vw",
                height: "10vh",
                boxShadow: 1,
                padding: "1px"

            }}>
                <Typography variant="h5" sx={{ margin: "0.7rem", marginLeft: "5rem" }}>Apariencia</Typography>
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
                height: "70vh",
                boxShadow: 1,
                marginLeft: "3rem"
            }}>

                <Typography variant="h6" sx={{ padding: "2rem 0 0.5rem 3rem" }}>Apariencia</Typography>
                <Divider variant="middle" sx={{ margin: "0 2rem" }} />
                <Typography variant="subtitle1" sx={{ padding: "1rem 0 0 3rem" }}>Tema</Typography>
                <Typography variant="subtitle2" sx={{ padding: "0 0 1rem 3rem", color: "gray" }}>Elige el tema de tu preferencia</Typography>
                <FormControl component="fieldset" sx={{paddingLeft:"6rem", marginBottom:"1rem"}}>
                    <RadioGroup row aria-label="gender" name="gender1" value={selectedValue} onChange={(e) => handleChange(e.target.value)}>
                        <ImageRadioButton  value="option1" src={registerDoctor} alt="Opción 1" name="Light" onChange={handleChange} selectedValue={selectedValue} />
                        <ImageRadioButton value="option2" src={registerDoctor} alt="Opción 2" name="Dark" onChange={handleChange} selectedValue={selectedValue} />
                        
                    </RadioGroup>
                </FormControl>
                <Divider variant="middle" sx={{ margin: "0 2rem" }} />


            </Box>

        </Box>
    );

};

export default Appearance;