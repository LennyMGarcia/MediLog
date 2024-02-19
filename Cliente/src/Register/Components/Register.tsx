import { Formik, Form } from "formik";
import * as Yup from 'yup'
import useMultiForm from "../Hooks/useMultiForm";
import ContactInformationForm from "./ContactInformationForm";
import BasicInformationForm from "./BasicInformationForm";


//TODO: arreglar tipos en cada documento, agregar Yup que cambie de verificacion, agregar estado y personalizacion

const initialValues = {
    nombre: "",
    apellido: "",
}

const validationSchema = Yup.object({
    nombre: Yup.string().required("required"),
    apellido: Yup.string().required("required"),
    
})

const Register:React.FC = () =>{


    function onSubmit(){
         next()
        return   console.log("Estado del formulario:");

    }

    const {step, next, back} = useMultiForm([<BasicInformationForm type="especialista"/>, <ContactInformationForm/>])

    return(
        <Formik initialValues={initialValues}  onSubmit={onSubmit} validationSchema={validationSchema}>
        {
            formik => {
                return <Form>
                    {step}
                    <button type="submit">ClickMe</button>
                    <button type="button" onClick={back}>back</button>
                </Form>
            }
        }
        </Formik>
    )
}

export default Register;