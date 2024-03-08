
import ProfileInput from "./ProfileInput";
import ProfileSelect from "./ProfileSelect";
import ProfileDateInput from "./ProfileDateInput";
import { SelectProps } from "@mui/material/Select/Select";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import ProfileMultiInput from "./ProfileMultiInput";

//Interfaces utiles para ayudar a que las propiedades se lean como sus respectivas propiedades de Select, input...
interface IProfileTexfieldfControl extends Omit<TextFieldProps, 'variant'> { 
    Values?:[]
}
interface IProfileControl extends Omit<SelectProps | TextFieldProps, 'variant'> {
    control: string,
    selectObject?: {
        key: string;
        value: string;
    }[],
    Values?: any[]
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
            return <ProfileInput  {...rest as IProfileTexfieldfControl} />
            break;
        case "select":
            return <ProfileSelect {...rest as IProfileSelectfControl}></ProfileSelect>
            break;
        case "date":
            return <ProfileDateInput {...rest as IProfileControl}></ProfileDateInput>
            break;
        case "multiInput":
            return <ProfileMultiInput {...rest as IProfileTexfieldfControl}></ProfileMultiInput>
            break;
        default:
            throw new Error("No se encontro el tipo requerido")
    }
}

export default ProfileControl;