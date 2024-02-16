const express = require('express');
const router = express.Router();
const Paciente = require('../Migrations/Paciente');

router.get('/', async (req, res) => {
    const model = new Paciente();
    const data = await model.get();
    res.json(data);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const model = new Paciente();
    const data = await model.find(id);
    res.json(data);
});
router.post('/', async (req, res) => {
    const data = req.body;

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (!data.nombre || !data.apellido || !data.fecha_nacimiento || !data.documento_identidad || !data.correo) return res.json({ "created": false, 'error': 'Campos Obligatorios' });

    const model = new Paciente();
    const result = await model.insert(data);
    return res.json(result);

});
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    //Condicion que verifica si el numero ID es realmente un INTEGER y no un STRING
    const valid = parseInt(id);
    if (isNaN(valid)) return res.json({ 'created': false, 'error': 'Numero de Identifiacion Invalido' });

    //Condicion que verifica si los campos obligatorios estan incluidos
    const data = req.body;
    if (!data.nombre || !data.apellido || !data.fecha_nacimiento || !data.documento_identidad || !data.correo) return res.json({ "created": false, 'error': 'Campos Obligatorios' });

    const model = new Paciente();
    const result = await model.update(data, id);
    return res.json(result);
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    //Condicion que verifica si el numero ID es realmente un INTEGER y no un STRING
    const valid = parseInt(id);
    if (isNaN(valid)) return res.json({ 'deleted': false, 'error': 'Numero de Identifiacion Invalido' });

    const model = new Paciente();
    const destroy = await model.delete(id);
    res.json({ 'deleted': true });
});

module.exports = router;