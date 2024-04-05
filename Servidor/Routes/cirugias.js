const express = require('express');
const router = express.Router();
const Cirugia = require('../Migrations/Cirugia');
const Paciente = require('../Migrations/Paciente');
const Especialista = require('../Migrations/Especialista');
const Usuario = require('../Migrations/Usuario');
const { body, param, validationResult } = require('express-validator');

// Reglas de Validaciones
const validaciones = [
    body('pacientes_id').escape().trim().notEmpty().withMessage('Seleccion de Paciente Obligatorio.'),
    body('especialistas_id').escape().trim().notEmpty().withMessage('Seleccion de Especialista Obligatorio.'),
    body('motivo').escape().trim().isString().notEmpty().withMessage('Motivo de Cirugia Obligatorio.'),
    body('categoria').escape().trim().isString().optional(),
    body('estudios').escape().trim().isString().optional(),
    body('observaciones').escape().trim().isString().optional(),
    body('instrucciones').escape().trim().isString().optional(),
    body('resultado').escape().trim().isString().optional(),
    body('visibilidad').escape().trim().isBoolean().optional(),
];
const edit_validaciones = [
    body('especialistas_id').escape().trim().notEmpty().withMessage('Seleccion de Especialista Obligatorio.'),
    body('motivo').escape().trim().isString().notEmpty().withMessage('Motivo de Cirugia Obligatorio.'),
    body('categoria').escape().trim().isString().optional(),
    body('estudios').trim().isString().optional(),
    body('observaciones').escape().trim().isString().optional(),
    body('instrucciones').trim().isString().optional(),
    body('resultado').escape().trim().isString().optional(),
];
const id_validation = [
    param('id').escape().trim().notEmpty().isInt().withMessage('Numero de Identificacion Invalido.')
];

router.get('/', async (req, res) => {
    const model = new Cirugia();
    const data = await model.get();

    if (data?.length <= 0) return res.status(404).json({ 'message': 'Registro No Existe.' });
    return res.status(200).json(data);
});
router.get('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Cirugia();
        const data = await model.find(id);
        const paciente = new Paciente();
        const paciente_data = await paciente.find(data?.pacientes_id);
        const especialista = new Especialista();
        const especialista_data = await especialista.find(data?.especialistas_id);
        const casos = await paciente.findUserRecords(paciente_data?.id, 'casos');
        const cirugias = await paciente.findUserRecords(paciente_data?.id, 'cirugias');
        const consultas = await paciente.findUserRecords(paciente_data?.id, 'consultas');
        const transacciones = await paciente.findUserRecords(paciente_data?.id, 'transacciones');

        consultas?.forEach(element => {
            element.especialista = `${especialista_data?.nombre} ${especialista_data?.apellido}` || 'Usuario Desconocido'
        });
        cirugias?.forEach(element => {
            element.especialista = `${especialista_data?.nombre} ${especialista_data?.apellido}` || 'Usuario Desconocido'
        });
        data.instrucciones = JSON.parse(data?.instrucciones) || [];
        data.estudios = JSON.parse(data?.estudios) || [];
        const payload = {
            ...data,
            paciente: `${paciente_data?.nombre} ${paciente_data?.apellido}` || 'Paciente Desconocido',
            casos: casos[0]?.success === false ? [] : casos,
            cirugias: cirugias[0]?.success === false ? [] : cirugias,
            consultas: consultas[0]?.success === false ? [] : consultas,
            transacciones: transacciones[0]?.success === false ? [] : transacciones
        }

        if (!data) return res.status(404).json({ 'message': 'Registro No Existe.' });
        return res.status(200).json(payload);
    }

    const error_msg = validated?.errors[0]?.msg || 'Campo Invalido';
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});
router.post('/', validaciones, async (req, res) => {
    const data = req.body;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Cirugia();
        const result = await model.insert(data);

        if (result[0]?.success === false) return res.status(result[0]?.status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated?.errors[0]?.msg || 'Campo Invalido';
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});
router.put('/:id', id_validation, edit_validaciones, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const data = req.body;
        const model = new Cirugia();
        const result = await model.update(data, id);

        if (result[0]?.success === false) return res.status(result[0]?.status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated?.errors[0]?.msg || 'Campo Invalido';
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});
router.delete('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Caso();
        const destroy = await model.delete(id);
        if (destroy[0]?.success === false) return res.status(destroy[0]?.status).json({ 'message': 'Esa Cirugia tiene un caso abierto.' });
        return res.status(200).json({ 'message': 'Registro Borrado Exitosamente.' });
    }

    const error_msg = validated?.errors[0]?.msg || 'Campo Invalido';
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});

module.exports = router;