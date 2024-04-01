const isAuthUser = (req, res, next) => {
    //Middle que protege las rutas de acceso no autorizado
    const auth_user = req.body.user;
    //console.log('user ID: ' + auth_user?.id);
    if (auth_user) {
        next();
    }

    return res.status(401).json({ 'message': 'Accesso Denegado. PorFavor de Conectarse' });
}

module.exports = isAuthUser;