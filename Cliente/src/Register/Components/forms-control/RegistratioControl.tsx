import { SelectProps, TextFieldProps } from "@mui/material";
import RegisterInput from "./RegisterInput";
import RegisterSelect from "./RegisterSelect";
import { ChangeEvent} from 'react';

interface IRegistrationTexfieldfControl extends  Omit<TextFieldProps, 'variant'>{
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
interface IRegistrationControl extends  Omit<SelectProps | TextFieldProps, 'variant'>{
    control:string,
    selectObject?: {
        key: string;
        value: string;
    }[]
}
interface IRegistrationSelectfControl extends  Omit<SelectProps, 'variant'>{
    selectObject?: {
        key: string;
        value: string;
    }[]
}


//Permite que los componentes sean mas extensibles pasando solo el {..rest} y evitando muchas declaraciones de propiedad
const RegistrationControl:React.FC<IRegistrationControl> = ({control,  ...rest}) =>{
    switch(control){
        case "input":
            return <RegisterInput  {...rest as IRegistrationTexfieldfControl}/>
             break;
        case "select":
            return <RegisterSelect {...rest as IRegistrationSelectfControl}></RegisterSelect>
             break;
        default:
         throw new Error("No se encontro el tipo requerido")
    }
}

export default RegistrationControl;