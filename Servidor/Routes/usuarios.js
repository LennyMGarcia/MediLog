const express = require('express');
const router = express.Router();
const Usuario = require('../Migrations/Usuario');
const Producto = require('../Migrations/Producto');
const bcrypt = require('bcrypt');
const salt_level = 10;
const { body, param, validationResult } = require('express-validator');

// Reglas de Validaciones
const validaciones = [
    body('member_id').escape().trim().notEmpty().withMessage('Nombre Obligatorio.'),
    body('correo').escape().trim().isEmail().notEmpty().withMessage('Correo Invalido.'),
    body('contrasena').escape().trim().isAlphanumeric().isLength({ max: 12, min: 8 }).notEmpty().withMessage('Contraseña Obligatoria.'),
    body('tipo').escape().trim().isString().optional(),
    body('plan').escape().trim().isInt().optional(),
    body('datos_financieros').escape().trim().isString().optional(),
    body('cvv').escape().trim().isString().optional(),
    body('fecha_expiracion').escape().trim().isString().optional(),
];
const edit_validaciones = [
    body('plan').escape().trim().isString().notEmpty().withMessage('Numero Identificacion Invalido.'),
];
const id_validation = [
    param('id').escape().trim().notEmpty().isInt().withMessage('Numero de Identificacion Invalido.')
];

router.get('/', async (req, res) => {
    const model = new Usuario();
    const data = await model.get();

    if (data.length <= 0) return res.status(404).json({ 'message': 'Registro No Existe.' });

    return res.status(200).json(data);
});
router.get('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Usuario();
        const data = await model.find(id);

        if (!data) return res.status(404).json({ 'message': 'Registro No Existe.' });
        return res.status(200).json(data);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});
router.post('/', async (req, res) => {
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
router.put('/:id', id_validation, edit_validaciones, async (req, res) => {
    const id = req.params.id;
    const plan = req.body.plan;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const data = req.body;

        const product_model = new Producto();
        const producto = await product_model.getIdByName(plan);
        console.log(producto);
        const model = new Usuario();
        const result = await model.update_plan(producto.id, id);

        if (result[0]?.success === false) return res.status(result[0].status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});
/*router.put('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const data = req.body;
        if (!data.contrasena || !data.correo) return res.status(400).json({ 'message': 'Campos Obligatorios.' });

        const model = new Usuario();
        const result = await model.update(data, id);

        if (result[0].success === false) return res.status(result[0].status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});*/
router.delete('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {

        const model = new Usuario();
        const destroy = await model.delete(id);
        return res.status(200).json({ 'message': 'Registro Eliminado Exitosamente.' });
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});

module.exports = router;