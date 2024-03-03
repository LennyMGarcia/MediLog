import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import React from "react";

import { Link } from "react-router-dom";


const ThanksForm: React.FC = () => {


    return (
        <>
            <Box>
                <Box sx={{ textAlign: "center" }}><Typography variant={"h5"}>Agradecimientos</Typography></Box>
                <Box sx={{ textAlign: "center", padding:"100px" }}><Typography variant={"body1"}>Gracias por suscribirte a la aplicacion de nuestro lider Julio Sierra, de verdad te agradecemos por tu cooperacion y por tu tiempo, Julio te vigilara siempre si llenaste algo mal y danaste el backend de Ben </Typography></Box>
                <Link style={{padding:"100px"}} to={"/"} type="button">dame duro</Link>
            </Box>
        </>
    )
}

export default ThanksForm;