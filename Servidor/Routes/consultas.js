const express = require('express');
const router = express.Router();
const Consulta = require('../Migrations/Consulta');
const Paciente = require('../Migrations/Paciente');
const Especialista = require('../Migrations/Especialista');
const Usuario = require('../Migrations/Usuario');
const { body, param, validationResult } = require('express-validator');

// Reglas de Validaciones
const validaciones = [
    body('pacientes_id').escape().trim().notEmpty().withMessage('Seleccion de Paciente Obligatorio.'),
    body('especialistas_id').escape().trim().notEmpty().withMessage('Seleccion de Especialista Obligatorio.'),
    body('motivo').escape().trim().isString().notEmpty().withMessage('Motivo de Consulta Obligatorio.'),
    body('estudios').trim().isString().optional(),
    body('observaciones').escape().trim().isString().optional(),
    body('plan_tratamiento').trim().isString().optional(),
    body('visibilidad').escape().trim().isBoolean().optional(),
];
const edit_validaciones = [
    body('especialistas_id').escape().trim().notEmpty().withMessage('Seleccion de Especialista Obligatorio.'),
    body('motivo').escape().trim().isString().notEmpty().withMessage('Motivo de Consulta Obligatorio.'),
    body('estudios').trim().isString().optional(),
    body('observaciones').escape().trim().isString().optional(),
    body('plan_tratamiento').trim().isString().optional(),
];
const id_validation = [
    param('id').escape().trim().notEmpty().isInt().withMessage('Numero de Identificacion Invalido.')
];

router.get('/', async (req, res) => {
    const model = new Consulta();
    const data = await model.get();

    if (data.length <= 0) return res.status(404).json({ 'message': 'Registro No Existe.' });
    return res.status(200).json(data);
});
router.get('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Consulta();
        const data = await model.find(id);
        const paciente = new Paciente();
        const paciente_data = await paciente.find(data?.pacientes_id);
        const especialista = new Especialista();
        const especialista_data = await especialista.find(data?.especialistas_id);
        const usuario = new Usuario(data?.pacientes_id);
        const user = await usuario.getUser();
        const casos = await usuario.casos();
        const cirugias = await usuario.cirugias();
        const consultas = await usuario.consultas();
        const transacciones = await usuario.transacciones();

        consultas.forEach(element => {
            element.especialista = `${especialista_data?.nombre} ${especialista_data?.apellido}` || 'Usuario Desconocido'
        });
        cirugias.forEach(element => {
            element.especialista = `${especialista_data?.nombre} ${especialista_data?.apellido}` || 'Usuario Desconocido'
        });
        data.estudios = JSON.parse(data.estudios) || [];
        data.plan_tratamiento = JSON.parse(data.plan_tratamiento) || [];
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

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});
router.post('/', validaciones, async (req, res) => {
    const data = req.body;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {

        const model = new Consulta();
        const result = await model.insert(data);

        if (result[0]?.success === false) return res.status(result[0].status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});
router.put('/:id', id_validation, edit_validaciones, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const data = req.body;
        const model = new Consulta();
        const result = await model.update(data, id);

        if (result[0]?.success === false) return res.status(result[0].status).json(result);
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
        const model = new Consulta();
        const destroy = await model.delete(id);
        return res.status(200).json({ 'message': 'Registro Eliminado Exitosamente.' });
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});

module.exports = router;