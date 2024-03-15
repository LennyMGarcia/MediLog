
import Box from "@mui/material/Box/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import registerDoctor from "/assets/Pictures/registerDoctor.jpg";
import SettingsIcon from '@mui/icons-material/Settings';
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router";


const Settings: React.FC = () => {
    const navigate = useNavigate();

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
                height: "70vh",
                boxShadow: 1,
                marginLeft: "3rem"
            }}>

                <Grid container>
                    <Grid item container md={7}>

                    <Grid item container md={6} sx={{width:"10px", height:"1px", marginTop:"3rem"}}>
                            <Button onClick={() => navigate("/register")}  sx={{margin:"1rem",padding:"1rem", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "0.5rem", "&:hover": {
                                backgroundColor: '#efe'}}}>
                            <Grid  container >
                                <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e9ecef", width: "5vw", height: "10vh", borderRadius: "0.5rem",}}>
                                    <AccountCircleIcon sx={{ width: "3.5vw", height: "7vh", color: "#52b69a" }} />
                                </Grid>
                                <Grid item sx={{  width: "13rem", paddingLeft:"1rem", textAlign:"left" }}>
                                    <Typography variant="subtitle1"  sx={{ color: "black" }}>Informacion de perfil</Typography>
                                    <Typography variant="subtitle2" sx={{ color: "gray" }}>Cambiar contrasena, seguridad & privacidad</Typography>
                                </Grid>
                            </Grid>
                            </Button>
                            
                        </Grid>

                        <Grid item container md={6} sx={{width:"10px", height:"1px", marginTop:"3rem"}}>
                            <Button onClick={() => navigate("/register")}  sx={{margin:"1rem",padding:"1rem", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "0.5rem", "&:hover": {
                                backgroundColor: '#efe'}}}>
                            <Grid  container >
                                <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e9ecef", width: "5vw", height: "10vh", borderRadius: "0.5rem",}}>
                                    <AccountCircleIcon sx={{ width: "3.5vw", height: "7vh", color: "#52b69a" }} />
                                </Grid>
                                <Grid item sx={{  width: "13rem", paddingLeft:"1rem", textAlign:"left" }}>
                                    <Typography variant="subtitle1"  sx={{ color: "black" }}>Informacion de perfil</Typography>
                                    <Typography variant="subtitle2" sx={{ color: "gray" }}>Cambiar contrasena, seguridad & privacidad</Typography>
                                </Grid>
                            </Grid>
                            </Button>
                            
                        </Grid>

                        <Grid item container md={6} sx={{width:"10px", height:"1px", marginTop:"-5rem"}}>
                            <Button onClick={() => navigate("/register")}  sx={{margin:"1rem",padding:"1rem", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "0.5rem", "&:hover": {
                                backgroundColor: '#efe'}}}>
                            <Grid  container >
                                <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e9ecef", width: "5vw", height: "10vh", borderRadius: "0.5rem",}}>
                                    <AccountCircleIcon sx={{ width: "3.5vw", height: "7vh", color: "#52b69a" }} />
                                </Grid>
                                <Grid item sx={{  width: "13rem", paddingLeft:"1rem", textAlign:"left" }}>
                                    <Typography variant="subtitle1"  sx={{ color: "black" }}>Informacion de perfil</Typography>
                                    <Typography variant="subtitle2" sx={{ color: "gray" }}>Cambiar contrasena, seguridad & privacidad</Typography>
                                </Grid>
                            </Grid>
                            </Button>
                            
                        </Grid>

                        <Grid item container md={6} sx={{width:"10px", height:"1px", marginTop:"-5rem"}}>
                            <Button onClick={() => navigate("/register")}  sx={{margin:"1rem",padding:"1rem", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "0.5rem", "&:hover": {
                                backgroundColor: '#efe'}}}>
                            <Grid  container >
                                <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e9ecef", width: "5vw", height: "10vh", borderRadius: "0.5rem",}}>
                                    <AccountCircleIcon sx={{ width: "3.5vw", height: "7vh", color: "#52b69a" }} />
                                </Grid>
                                <Grid item sx={{  width: "13rem", paddingLeft:"1rem", textAlign:"left" }}>
                                    <Typography variant="subtitle1" sx={{ color: "black" }}>Informacion de perfil</Typography>
                                    <Typography variant="subtitle2" sx={{ color: "gray" }}>Cambiar contrasena, seguridad & privacidad</Typography>
                                </Grid>
                            </Grid>
                            </Button>
                            
                        </Grid>

                        

                        

                        

                    </Grid>
                    <Grid item md={5} >
                        <Box>
                            <img src={registerDoctor} style={{ width: "28rem", height: "22rem", padding: "2rem" }} ></img>
                        </Box>

                    </Grid>

                </Grid>

            </Box>

        </Box>
    );

};

export default Settings;