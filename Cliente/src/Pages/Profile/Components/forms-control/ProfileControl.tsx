
import RegisterInput from "./ProfileInput";
import RegisterSelect from "./ProfileSelect";
import RegisterDateInput from "./ProfileDateInput";
import { SelectProps } from "@mui/material/Select/Select";
import { TextFieldProps } from "@mui/material/TextField/TextField";

//Interfaces utiles para ayudar a que las propiedades se lean como sus respectivas propiedades de Select, input...
interface IProfileTexfieldfControl extends Omit<TextFieldProps, 'variant'> { }
interface IProfileControl extends Omit<SelectProps | TextFieldProps, 'variant'> {
    control: string,
    selectObject?: {
        key: string;
        value: string;
    }[]
}
interface IProfileSelectfControl extends Omit<SelectProps, 'variant'> {
    selectObject?: {
        key: string;
        value: string;
    }[]
}


//Permite que los componentes sean mas extensibles pasando solo el {..rest} y evitando muchas declaraciones de propiedad
const ProfileControl: React.FC<IProfileControl> = ({ control, ...rest }) => {
    switch (control) {
        case "input":
            return <RegisterInput  {...rest as IProfileTexfieldfControl} />
            break;
        case "select":
            return <RegisterSelect {...rest as IProfileSelectfControl}></RegisterSelect>
            break;
        case "date":
            return <RegisterDateInput {...rest as IProfileControl}></RegisterDateInput>
            break;
        default:
            throw new Error("No se encontro el tipo requerido")
    }
}

export default ProfileControl;