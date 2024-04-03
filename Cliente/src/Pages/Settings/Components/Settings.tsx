import Box from "@mui/material/Box/Box";
import medilogConfig from "/assets/Pictures/medilogConfig.png";
import SettingsIcon from "@mui/icons-material/Settings";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import DeleteIcon from "@mui/icons-material/Delete";
import PasswordIcon from "@mui/icons-material/Password";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { useMediaQuery } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { globalTheme } from "../../../theme/globalTheme";

const Settings: React.FC = () => {
    const navigate = useNavigate();

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box
            sx={{
                backgroundColor: globalTheme.palette.background.main,
                width: "100vw",
                height: "100vh",
                padding: "1px",
            }}
        >
            <Box
                sx={{
                    backgroundColor: globalTheme.palette.background.secondary,
                    width: "100vw",
                    height: "10vh",
                    boxShadow: 1,
                    padding: "1px",
                }}
            >
                <Typography variant="h5" sx={{ margin: "0.7rem", marginLeft: "5rem", color: globalTheme.font.primary.main }}>
                    Configuración de la cuenta
                </Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: globalTheme.palette.background.secondary,
                    width: isMediumScreen ? "15vw" : "50vw",
                    height: "5vh",
                    boxShadow: 1,
                    margin: isMediumScreen ? "3rem 0 0 3rem" : "3rem 0 0 0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderStartStartRadius: "1rem",
                    borderTopRightRadius: "1rem",
                }}
            >
                <SettingsIcon
                    sx={{
                        color: "gray",
                        width: "1rem",
                        height: "1rem",
                        paddingRight: "0.5rem",
                    }}
                />
                <Typography variant="subtitle1" sx={{ color: "#aaa" }}>
                    configuración /
                </Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: globalTheme.palette.background.secondary,
                    width: isMediumScreen ? "90vw" : "100vw",
                    height: "70vh",
                    boxShadow: 1,
                    marginLeft: isMediumScreen ? "3rem" : 0,
                }}
            >
                <Grid container>
                    <Grid item container md={7} xs={12}>
                        <Grid
                            item
                            container
                            md={6}
                            xs={12}
                            sx={{ width: "10px", height: "1px", marginTop: "3rem" }}
                        >
                            <Button
                                onClick={() => navigate("/settings/appearance")}
                                sx={{
                                    margin: "1rem",
                                    padding: "1rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "0.5rem",
                                    "&:hover": {
                                        backgroundColor: "#efe",
                                    },
                                }}
                            >
                                <Grid container>
                                    <Grid
                                        item
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: globalTheme.palette.background.main,
                                            width: isMediumScreen ? "5vw" : "23vw",
                                            height: "10vh",
                                            borderRadius: "0.5rem",
                                        }}
                                    >
                                        <SettingsBrightnessIcon
                                            sx={{
                                                width: isMediumScreen ? "3.5vw" : "10vw",
                                                height: "7vh",
                                                color: globalTheme.palette.primary.main,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            width: "13rem",
                                            paddingLeft: "1rem",
                                            textAlign: "left",
                                        }}
                                    >
                                        <Typography variant="subtitle1" sx={{ color: globalTheme.font.primary.main }}>
                                            Apariencia y fuente
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ color: "#aaa" }}>
                                            Cambiar tema del sitema y tamaño de la fuente
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Grid>

                        <Grid
                            item
                            container
                            md={6}
                            xs={12}
                            sx={{
                                width: "10px",
                                height: "1px",
                                marginTop: isMediumScreen ? "3rem" : "7rem",
                            }}
                        >
                            <Button
                                onClick={() => navigate("/settings/changePlan")}
                                sx={{
                                    margin: "1rem",
                                    padding: "1rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "0.5rem",
                                    "&:hover": {
                                        backgroundColor: "#efe",
                                    },
                                }}
                            >
                                <Grid container>
                                    <Grid
                                        item
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: globalTheme.palette.background.main,
                                            width: isMediumScreen ? "5vw" : "23vw",
                                            height: "10vh",
                                            borderRadius: "0.5rem",
                                        }}
                                    >
                                        <ViewCarouselIcon
                                            sx={{
                                                width: isMediumScreen ? "3.5vw" : "10vw",
                                                height: "7vh",
                                                color: globalTheme.palette.primary.main,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            width: "13rem",
                                            paddingLeft: "1rem",
                                            textAlign: "left",
                                        }}
                                    >
                                        <Typography variant="subtitle1" sx={{ color: globalTheme.font.primary.main }}>
                                            Cambiar Plan
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ color: "#aaa" }}>
                                            Cambiar plan y todo lo relacionado a ello{" "}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Grid>

                        <Grid
                            item
                            container
                            md={6}
                            xs={12}
                            sx={{
                                width: "10px",
                                height: "1px",
                                marginTop: isMediumScreen ? "1rem" : "7rem",
                            }}
                        >
                            <Button
                                onClick={() => navigate("/settings/changePassword")}
                                sx={{
                                    margin: "1rem",
                                    padding: "1rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "0.5rem",
                                    "&:hover": {
                                        backgroundColor: "#efe",
                                    },
                                }}
                            >
                                <Grid container>
                                    <Grid
                                        item
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: globalTheme.palette.background.main,
                                            width: isMediumScreen ? "5vw" : "23vw",
                                            height: "10vh",
                                            borderRadius: "0.5rem",
                                        }}
                                    >
                                        <PasswordIcon
                                            sx={{
                                                width: isMediumScreen ? "3.5vw" : "10vw",
                                                height: "7vh",
                                                color: globalTheme.palette.primary.main,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            width: "13rem",
                                            paddingLeft: "1rem",
                                            textAlign: "left",
                                        }}
                                    >
                                        <Typography variant="subtitle1" sx={{ color: globalTheme.font.primary.main }}>
                                            Cambiar contrañena
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ color: "#aaa" }}>
                                            Cambiar contraseña por una nueva y más segura
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Grid>

                        <Grid
                            item
                            container
                            md={6}
                            xs={12}
                            sx={{
                                width: "10px",
                                height: "1px",
                                marginTop: isMediumScreen ? "1rem" : "7rem",
                            }}
                        >
                            <Button
                                onClick={() => navigate("/settings/deleteAccount")}
                                sx={{
                                    margin: "1rem",
                                    padding: "1rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "0.5rem",
                                    "&:hover": {
                                        backgroundColor: "#efe",
                                    },
                                }}
                            >
                                <Grid container>
                                    <Grid
                                        item
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: globalTheme.palette.background.main,
                                            width: isMediumScreen ? "5vw" : "23vw",
                                            height: "10vh",
                                            borderRadius: "0.5rem",
                                        }}
                                    >
                                        <DeleteIcon
                                            sx={{
                                                width: isMediumScreen ? "3.5vw" : "10vw",
                                                height: "7vh",
                                                color: globalTheme.palette.primary.main,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            width: "13rem",
                                            paddingLeft: "1rem",
                                            textAlign: "left",
                                        }}
                                    >
                                        <Typography variant="subtitle1" sx={{ color: globalTheme.font.primary.main }}>
                                            Eliminar cuenta
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ color: "#aaa" }}>
                                            Eliminar cuenta y sus datos de forma permanente
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Grid>
                    </Grid>
                    {isMediumScreen && (
                        <Grid item md={5} xs={12}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    justifyItems: "center",
                                    paddingTop: "5rem",
                                }}
                            >
                                <img
                                    src={medilogConfig}
                                    style={{ width: "15rem", height: "15rem" }}
                                ></img>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default Settings;
