const express = require("express");
const router = express.Router();
const Caso = require('../Migrations/Caso');
const Consulta = require('../Migrations/Consulta');
const Cirugia = require('../Migrations/Cirugia');
const Paciente = require('../Migrations/Paciente');
const Especialista = require('../Migrations/Especialista');
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
const edit_validaciones = [
    body('descripcion').escape().trim().notEmpty().withMessage('Nombre de Caso Obligatorio.'),
    body('especialistas_id').escape().trim().notEmpty().withMessage('Seleccion de Especialista Obligatorio.'),
    body('estado').escape().trim().isString().optional(),
    body('seguimiento').escape().trim().isString().optional(),
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
        const paciente = new Paciente();
        const paciente_data = await paciente.find(data?.pacientes_id);
        const especialista = new Especialista();
        const especialista_data = await especialista.find(data?.especialistas_id);
        const consulta = new Consulta();
        const consulta_data = await consulta.find(data?.consultas);
        const cirugia = new Cirugia();
        const cirugia_data = await cirugia.find(data?.cirugias);
        //  especialistas: [`${especialista_data?.nombre} ${especialista_data?.apellido}`],

        const payload = {
            id: data?.id || '',
            descripcion: data?.descripcion || 'Caso Desconocido',
            paciente: `${paciente_data?.nombre} ${paciente_data?.apellido}`,
            pacientes_id: data?.pacientes_id || '',
            especialistas_id: `${data?.especialistas_id}` || '',
            especialistas: [data?.especialistas_id],
            consultas: [consulta_data?.motivo] || '',
            consultas_id: consulta_data?.id || '',
            cirugias: [cirugia_data?.motivo] || '',
            cirugias_id: cirugia_data?.id || '',
            estado: data?.estado || 'Suspendido',
            categoria: data?.categoria || 'Caso Desconocido',
            seguimiento: data?.seguimiento || 'No Indicaciones',
        }

        if (!data) return res.status(404).json({ 'message': 'Registro No Existe.' });
        return res.status(200).json(payload);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});
router.post('/', validaciones, async (req, res) => {
    const data = req.body;

    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {

        const model = new Caso();
        const result = await model.insert(data);

        if (result[0]?.success === false) return res.status(result[0]?.status).json(result);
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

        const model = new Caso();
        const result = await model.update(data, id);

        if (result[0]?.success === false) return res.status(result[0]?.status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
});
router.put('/subscribe/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const especialistas_id = req.body.especialistas_id;

        const model = new Caso();
        const result = await model.subscribe(id, especialistas_id);
        console.log(result);
        if (result[0]?.success === false) return res.status(result[0].status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
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