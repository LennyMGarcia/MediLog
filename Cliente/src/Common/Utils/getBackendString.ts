//Funccion que devuelve el enlace de conexion completo segun la ruta con la cual uno desea mandar solicitud a axios
// getBackendConnectionString() devuelve 'http://localhost:3001/'
// getBackendConnectionString('test') devuelve 'http://localhost:3001/test'
// getBackendConnectionString('login') devuelve 'http://localhost:3001/login'
// TODO - Configurar Funccionalidad para aceptar queries

const getBackendConnectionString = (route: string = ""): string => {
    const backend = 'http://localhost:3001/';

    if (route === "") {
        const connection_string = `${backend}`;
        return connection_string;
    }
    const connection_string = `${backend}${route}`;
    return connection_string;
}

export default getBackendConnectionString;