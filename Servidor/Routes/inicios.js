const express = require('express');
const router = express.Router();
const Usuario = require('../Migrations/Usuario');
const bcrypt = require('bcrypt');
const salt_level = 10;

router.post('/register', async (req, res) => {
    const data = req.body;

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (!data.member_id || !data.correo || !data.contrasena) return res.status(400).json({ 'message': 'Campos Obligatorios.' });

    //Funccion que encripta la contrasena del usuario antes de creacion
    const salt = await bcrypt.genSalt(salt_level);
    const hashed_password = await bcrypt.hash(data.contrasena, salt);
    if (!hashed_password) res.status(400).json({ 'message': 'Por favor, Intentar Otra Contraseña.' });

    data.contrasena = hashed_password;
    const model = new Usuario();
    const result = await model.insert(data);

    if (result[0].success === false) return res.status(result[0].status).json(result);

    return res.status(201).json(result);
});

router.post('/login', async (req, res) => {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const model = new Usuario();
    const result = await model.authenticate(correo);
    const hashed_password = result[0].contrasena;

    if (hashed_password) {
        //Funcion que verifica si la contrasena introducida coincide con la contrasena del usuario.
        const authenticated = bcrypt.compareSync(contrasena, hashed_password);
        if (!authenticated) return res.status(404).json({ 'message': 'Credenciales Incorrectas.' });
        return res.status(200).json({ 'message': 'Conectado Exitosamente.' });
    }
    return res.status(404).json({ 'message': 'Credenciales Incorrectas.' });
});

module.exports = router;