const express = require("express");
const router = express.Router();
const Caso = require('../Migrations/Caso');
const { body, param, validationResult } = require('express-validator');

// Reglas de Validaciones
const validaciones = [
    body('descripcion').escape().trim().notEmpty().withMessage('Nombre de Caso Obligatorio.'),
    body('pacientes_id').escape().trim().notEmpty().withMessage('Seleccion de Paciente Obligatorio.'),
    body('especialistas_id').escape().trim().notEmpty().withMessage('Seleccion de Especialista Obligatorio.'),
    body('consultas').escape().trim().isInt().optional(),
    body('cirugias').escape().trim().isInt().optional(),
    body('estado').escape().trim().isString().optional(),
    body('categoria').escape().trim().isString().optional(),
    body('seguimiento').escape().trim().isString().optional(),
    body('visibilidad').escape().trim().isBoolean().optional(),
];
const id_validation = [
    param('id').escape().trim().notEmpty().isInt().withMessage('Numero de Identificacion Invalido.')
];

router.get('/', async (req, res) => {
    const model = new Caso();
    const data = await model.get();

    if (data.length <= 0) return res.status(404).json({ 'message': 'Registro No Existe.' });
    return res.status(200).json(data);
});
router.get('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Caso();
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

        const model = new Caso();
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

        const model = new Caso();
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
        const model = new Caso();
        const destroy = await model.delete(id);
        return res.status(200).json({ 'message': 'Registro Borrado Exitosamente.' });
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});

module.exports = router;