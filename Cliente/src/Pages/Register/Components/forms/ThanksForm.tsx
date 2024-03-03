import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import React from "react";
import highFiving from "/assets/Pictures/highFiving.png"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const ThanksForm: React.FC = () => {


    return (
        <>
            <Box>

                 
                <Box sx={{ width:"13rem", height:"13rem" ,textAlign: "center", backgroundColor: "#52B69A" , borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center", margin:"auto"}}>
                    <img src={highFiving} style={{width:"15rem", height:"15rem", marginBottom:"20px"}}/>
                    </Box>
                <Box sx={{ textAlign: "center", margin:"20px" }}><Typography variant={"h5"}>Gracias por subcribirse! </Typography></Box>
                <Box sx={{ textAlign: "center", margin:"50px" }}><Typography variant={"body1"}>Deseamos que disfrute de nuestros servicios</Typography></Box>

            </Box>
        </>
    )
}

export default ThanksForm;