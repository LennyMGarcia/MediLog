const express = require('express');
const router = express.Router();
const Usuario = require('../Migrations/Usuario');
const bcrypt = require('bcrypt');
const salt_level = 10;
const { body, validationResult } = require('express-validator');

// Reglas de Validaciones
const validaciones = [
    body('correo').escape().trim().isEmail().notEmpty().withMessage('Correo Invalido.'),
    body('contrasena').escape().trim().isAlphanumeric().isLength({ max: 12, min: 8 }).notEmpty().withMessage('Contraseña Obligatoria.'),
];

router.post('/register', validaciones, async (req, res) => {
    const data = req.body;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {

        const model = new Usuario();
        const result = await model.insert(data);

        if (result[0]?.success === false) return res.status(result[0].status).json(result);

        return res.status(201).json(result);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});

router.post('/login', validaciones, async (req, res) => {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
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
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});

module.exports = router;