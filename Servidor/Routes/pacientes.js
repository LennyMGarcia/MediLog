const express = require('express');
const router = express.Router();
const Paciente = require('../Migrations/Paciente');

router.get('/', (req, res) => {
    const model = new Paciente();
    const data = model.get();
    res.json(data);
});
router.post('/', (req, res) => {

});
router.patch('/{id}', (req, res) => {

});
router.delete('/{id}', (req, res) => {

});

module.exports = router;