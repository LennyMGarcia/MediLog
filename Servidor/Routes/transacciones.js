const express = require('express');
const router = express.Router();
const Transaccion = require('../Migrations/Transaccion');
const { body, param, validationResult } = require('express-validator');

// Reglas de Validaciones
const validaciones = [
    body('productos_id').escape().trim().isInt().notEmpty().withMessage('Seleccion de Producto Obligatoria.'),
    body('usuarios_id').escape().trim().isInt().notEmpty().withMessage('Usuario Obligatorio.'),
    body('monto').escape().trim().isFloat({ min: 0 }).notEmpty().withMessage('Monto Total Obligatorio.'),
    body('metodo_pago').escape().trim().isString().optional(),
    body('descripcion').escape().trim().isString().optional(),
];
const id_validation = [
    param('id').escape().trim().notEmpty().isInt().withMessage('Numero de Identificacion Invalido.')
];

router.get('/', async (req, res) => {
    const model = new Transaccion();
    const data = await model.get();

    if (data.length <= 0) return res.status(404).json({ 'message': 'Registro No Existe.' });

    return res.status(200).json(data);
});
router.get('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Transaccion();
        const data = await model.find(id);

        if (!data) return res.status(404).json({ 'message': 'Registro No Existe.' });

        return res.status(200).json(data);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});
router.post('/', validaciones, async (req, res) => {
    const data = req.body;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Transaccion();
        const result = await model.insert(data);

        if (result[0].success === false) return res.status(result[0].status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});
router.put('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const data = req.body;
        if (!data.productos_id || !data.usuarios_id || !data.monto) return res.status(400).json({ 'message': 'Campos Obligatorios.' });

        const model = new Transaccion();
        const result = await model.update(data, id);

        if (result[0].success === false) return res.status(result[0].status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});
router.delete('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Transaccion();
        const destroy = await model.delete(id);
        return res.status(200).json({ 'message': 'Registro Elimindado Exitosamente.' });
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});


module.exports = router;