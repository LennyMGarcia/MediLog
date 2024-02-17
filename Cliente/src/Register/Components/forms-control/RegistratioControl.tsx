import RegisterInput from "./RegisterInput";

interface IRegistrationControl{
    control:string
    label:string,
    name:string
}

const RegistrationControl:React.FC<IRegistrationControl> = ({control, label, name, ...rest}) =>{
    switch(control){
        case "input":
            return <RegisterInput label={label} name={name} {...rest}/>
             break;
        case "select":
            return <div>select</div>
             break;
        default:
         throw new Error("No se encontro el tipo requerido")
    }
}

export default RegistrationControl;