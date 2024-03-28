
interface IHTTPTextError{
    erroNumber:string | number;
}

export default function getHTTPTextError<IHTTPTextError>(erroNumber: string | number):string {
    switch(String(erroNumber)){
        case "400":
            return "Campos faltantes";
        break;
        case "404":
            return "Registro no existe";
        break;
        case "500":
            return "Conflicto con base de datos o acceso denegado";
        break;
        case "501":
            return "Falta de privilegio o falta de autorizacion";
        break;
        default:
            return "Se produjo un error al procesar la solicitud"
    }
}