import { Formik, Form } from "formik";
import useMultiForm from "../Hooks/useMultiForm";
import ContactInformationForm from "./forms/ContactInformationForm";
import BasicInformationForm from "./forms/BasicInformationForm";
import useDataRegisterStore, { getAllRegisterData } from "../ZustandRegisterManagement";
import { Box, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import prueba2 from "../assets/prueba2.jpg"
import { registerValidationSchema } from "../Utils/yup-schema/yupRegisterSchema";
import FinancialInformationForm from "./forms/FinancialInformationForm";
import PricingForm from "./forms/PricingForm";
import RegisterStepper from "./style/Wrappers/RegisterStepper";
import ThanksForm from "./forms/ThanksForm";

//TODO: Agregar listas para controlar elementos con Yup y crear documentacion
//agregar date control y comenzar con css module y/o material
// se ve feo, agregar todo en un sitio y mas lo que se repite
// Arreglar todo lo que esta mal, sobre todo las variables de prueba y el diseno
//ARREGLAR ARRAY DE VALORES INICIALES Y YUP, sexo al ser select no funciona como se espera
//Crear posible tema de material para que no se vea asi
//Arreglar fecha y cedula

//Crear pricing condicional, si eres paciente no puedes ir a cojer algo que no es tuyo

const initialValues = [
    {
        nombre: "",
        apellido: "",
        sexo:"",
        fecha_nacimiento:"",
        tipo:"",
        especialidad:undefined,
        documento_identidad:undefined
    },

    {
        correo:"",
        contrasena:"",
        confirmarContrasena:""
    },

    {
        pricing:""
    },

    {
        metodo_pago: '',
        datos_financieros: '',
        cvv: '',
        fecha_expiracion: '',
        descripcion: '',
    }
]



const Register: React.FC = () => {
    function onSubmit() {
        console.log(getAllRegisterData());
        next()
    };
    
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const {getRegisterData } = useDataRegisterStore();

    const { currentStepIndex, step, isLastStep ,next, back } = useMultiForm([
        <BasicInformationForm type={String(getRegisterData("tipo")) || ""} />,
        <ContactInformationForm />,
        <PricingForm/>,
        <FinancialInformationForm/>,
        <ThanksForm/>
    ])

    return (
        <Box height={isMediumScreen? "105vh" : "auto"} sx={{ backgroundColor: "#E9ECEF" }}>
            <Grid container spacing={2}>
                {isMediumScreen && (
                    <Grid item xs={12} md={4}>
                        <img style={{ width: '110%', height: '105vh', marginTop:"-16px" }} src={prueba2} alt="" />
                    </Grid>
                )}
                <Grid item xs={12} md={isMediumScreen ? 8 : 12}>
                    {!isLastStep && <RegisterStepper activeStep={currentStepIndex}/>}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: isMediumScreen ? "10px" : "20px"
                    }}>
                        <Formik
                            initialValues={initialValues[currentStepIndex]}
                            onSubmit={onSubmit}
                            validationSchema={registerValidationSchema[currentStepIndex]}>
                            {() => (
                                <Form>
                                    {step}
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mt: "1rem"
                                    }}>
                                        <Button fullWidth sx={{ ml: "10px", color: "#52B69A" }} variant="outlined" type="button" onClick={back}>Regresar</Button>
                                        <Button fullWidth sx={{ ml: "10px", backgroundColor: "#52B69A" }} variant="contained" type="submit">Siguiente</Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

};

export default Register;

