const isLoggedIn = (req, res, next) => {
    //Middle que redirige si user ya esta loggeado
    const auth_user = req.body.user;
    //console.log('user ID: ' + auth_user?.id);
    if (!auth_user) {
        next();
    }

    return res.status(307).json({ 'message': 'Accesso Denegado.', redirectTo: '/' });
}

module.exports = isLoggedIn;