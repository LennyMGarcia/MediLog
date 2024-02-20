const express = require("express");
const router = express.Router();
const Caso = require('../Migrations/Caso');

router.get('/', async (req, res) => {
    const model = new Caso();
    const data = await model.get();

    if (data.length <= 0) return res.status(404).json({ 'message': 'Registro No Existe.' });
    return res.status(200).json(data);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const model = new Caso();
    const data = await model.find(id);

    if (!data) return res.status(404).json({ 'message': 'Registro No Existe.' });
    return res.status(200).json(data);
});
router.post('/', async (req, res) => {
    const data = req.body;

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (!data.pacientes_id || !data.especialistas_id || !data.descripcion) return res.status(400).json({ 'message': 'Campos Obligatorios' });

    const model = new Caso();
    const result = await model.insert(data);

    if (result[0].success === false) return res.status(result[0].status).json(result);
    return res.status(201).json(result);

});
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    //Condicion que verifica si el numero ID es realmente un INTEGER y no un STRING
    const valid = parseInt(id);
    if (isNaN(valid)) return res.status(400).json({ 'message': 'Numero de Identifiacion Invalido.' });

    //Condicion que verifica si los campos obligatorios estan incluidos
    const data = req.body;
    if (!data.pacientes_id || !data.especialistas_id || !data.descripcion) return res.status(400).json({ 'message': 'Campos Obligatorios.' });

    const model = new Caso();
    const result = await model.update(data, id);

    if (result[0].success === false) return res.status(result[0].status).json(result);
    return res.status(201).json(result);
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    //Condicion que verifica si el numero ID es realmente un INTEGER y no un STRING
    const valid = parseInt(id);
    if (isNaN(valid)) return res.status(400).json({ 'message': 'Numero de Identifiacion Invalido.' });

    const model = new Caso();
    const destroy = await model.delete(id);
    return res.status(200).json({ 'message': 'Registro Borrado Exitosamente.' });
});

module.exports = router;