const express = require('express');
const router = express.Router();
const Paciente = require('../Migrations/Paciente');
const { body, param, validationResult } = require('express-validator');

// Reglas de Validaciones
const validaciones = [
    body('nombre').escape().trim().isString().notEmpty().withMessage('Nombre Obligatorio.'),
    body('apellido').escape().trim().isString().notEmpty().withMessage('Apellido Obligatorio.'),
    body('correo').escape().trim().isEmail().notEmpty().withMessage('Correo Invalido.'),
    body('fecha_nacimiento').escape().trim().isDate().notEmpty().withMessage('Fecha de Nacimiento Obligatoria.'),
    body('documento_identidad').escape().trim().isString().notEmpty().withMessage('Documento de Identificacion Obligatorio.'),
    body('direccion').escape().trim().isString().optional(),
    body('sexo').escape().trim().isString().optional(),
    body('telefono').escape().trim().isString().optional(),
    body('tipo_sangre').escape().trim().isString().optional(),
    body('padecimientos').escape().trim().isString().optional(),
    body('alergias').escape().trim().isString().optional(),
    body('familiares_id').escape().trim().isString().optional(),
];
const id_validation = [
    param('id').escape().trim().notEmpty().isInt().withMessage('Numero de Identificacion Invalido.')
];

router.get('/', async (req, res) => {
    const model = new Paciente();
    const data = await model.get();

    if (data.length <= 0) return res.status(404).json({ 'message': 'Registro No Existe.' });
    return res.status(200).json(data);
});
router.get('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Paciente();
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
        const model = new Paciente();
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
        if (!data.nombre || !data.apellido || !data.fecha_nacimiento || !data.documento_identidad || !data.correo) return res.status(400).json({ 'message': 'Campos Obligatorios.' });

        const model = new Paciente();
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

        const model = new Paciente();
        const destroy = await model.delete(id);
        return res.status(200).json({ 'message': 'Registro Eliminado Exitosamente.' });
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});

module.exports = router;