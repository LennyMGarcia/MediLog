import { Formik, Form } from "formik";
import * as Yup from 'yup'
import useMultiForm from "../Hooks/useMultiForm";
import ContactInformationForm from "./ContactInformationForm";
import BasicInformationForm from "./BasicInformationForm";
import { getRegisterData } from "../ZustandRegisterManagement";
import useDataRegisterStore from "../ZustandRegisterManagement";
import { Box, Button, Grid, Step, StepLabel, Stepper, useMediaQuery, useTheme } from "@mui/material";
import prueba2 from "../assets/prueba2.jpg"

//TODO: Agregar listas para controlar elementos con Yup y crear documentacion
//agregar date control y comenzar con css module y/o material
// se ve feo, agregar todo en un sitio y mas lo que se repite
// Arreglar todo lo que esta mal, sobre todo las variables de prueba y el diseno

const initialValues = {
    nombre: "",
    apellido: "",
}

const validationSchema = Yup.object({
    nombre: Yup.string().required("required"),
    apellido: Yup.string().required("required"),

})

const Register: React.FC = () => {
    const { setRegisterData } = useDataRegisterStore()

    function onSubmit() {
        next()
        setRegisterData("nombre", "hola")
        return console.log(getRegisterData());

    }

    const { step, next, back } = useMultiForm([
        <BasicInformationForm type="especialista" />,
        <ContactInformationForm />])

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const steps = [
        'Registro A',
        'Registro B',
        'Registro C',
      ];

    return (
        <Box mt={"7.5vh"} width={"100vw"} height={"85vh"} sx={{ backgroundColor: "#E9ECEF" }}>
            <Grid container spacing={isMediumScreen ? 8 : 0} width={"100vw"}>
                <Grid item width={isMediumScreen ? "100vw" : "0"} height={isMediumScreen ? "85vh" : "0"} md={4}>
                    <img style={{margin: -20}} width={"100%"} height={"100%"} src={prueba2} alt="" />
                </Grid>
                <Grid item md={8} xs={12}>
                    <Stepper activeStep={1} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} padding={isMediumScreen ? "10px" : "120px"}>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {() => (
                                <Form>
                                    {step}
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: "1rem" }}>
                                        <Button fullWidth sx={{ ml: "10px", color: "#52B69A" }} variant="outlined" type="button" onClick={back}>back</Button>
                                        <Button fullWidth sx={{ ml: "10px", backgroundColor: "#52B69A" }} variant="contained" type="submit">Next {/*finish*/}</Button>
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

