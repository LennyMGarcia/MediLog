const express = require('express');
const router = express.Router();
const Usuario = require('../Migrations/Usuario');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Reglas de Validaciones para Login y Register
const validaciones = [
    body('username').escape().trim().isEmail().notEmpty().withMessage('Correo Invalido.'),
    body('password').escape().trim().isAlphanumeric().isLength({ max: 12, min: 8 }).notEmpty().withMessage('Contraseña Obligatoria.'),
];
const validaciones_register = [
    body('correo').escape().trim().isEmail().notEmpty().withMessage('Correo Invalido.'),
    body('contrasena').escape().trim().isAlphanumeric().isLength({ max: 12, min: 8 }).notEmpty().withMessage('Contraseña Obligatoria.'),
];

router.post('/register', validaciones_register, async (req, res) => {
    const data = req.body;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {

        const model = new Usuario();
        const result = await model.insert(data);

        if (result[0]?.success === false) return res.status(result[0]?.status).json(result);
        const query = new Usuario(result?.insertId);
        const user = await query.getUser();
        console.log(user);
        return res.status(201).json({ user: user, 'message': 'Operacion Exitosa.' });
    }

    const error_msg = validated?.errors[0]?.msg || 'Campos Invalidos';
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});

router.post('/login', validaciones, async (req, res) => {
    const correo = req.body.username;
    const contrasena = req.body.password;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Usuario();
        const result = await model.authenticate(correo);
        const hashed_password = result[0]?.contrasena;

        if (hashed_password) {
            //Funcion que verifica si la contrasena introducida coincide con la contrasena del usuario.
            const authenticated = bcrypt.compareSync(contrasena, hashed_password);
            if (!authenticated) return res.status(401).json({ 'message': 'Credenciales Incorrectas.' });
            const query = new Usuario(result[0]?.id);
            const user = await query.getUser();
            console.log(user);
            return res.status(200).json({ user: user, 'message': 'Conectado Exitosamente.' });
        }
        return res.status(404).json({ 'message': 'Usuario No Existe.' });
    }

    const error_msg = validated?.errors[0]?.msg || 'Campos Invalidos';
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});

module.exports = router;