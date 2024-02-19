import { Formik, Form } from "formik";
import * as Yup from 'yup'
import useMultiForm from "../Hooks/useMultiForm";
import ContactInformationForm from "./ContactInformationForm";
import BasicInformationForm from "./BasicInformationForm";
import { getRegisterData } from "../ZustandRegisterManagement";
import useDataRegisterStore from "../ZustandRegisterManagement";



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
    const {setRegisterData} = useDataRegisterStore()

    function onSubmit(){
         next()
         setRegisterData("nombre", "hola")
        return   console.log(getRegisterData()) ;

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