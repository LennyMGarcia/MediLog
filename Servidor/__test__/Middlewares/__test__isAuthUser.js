const __isAuthUser = (id) => {
    //Middle que protege las rutas de acceso no autorizado
    const auth_user = {id:id};
    if (auth_user.id == 1) {
        return "200"
    }

    return "401";
}

module.exports = __isAuthUser;