const express = require('express');
const router = express.Router();
const Usuario = require('../Migrations/Usuario');

router.get('/', async (req, res) => {
    const model = new Usuario();
    const data = await model.get();
    res.json(data);
});
router.post('/', (req, res) => {

});
router.patch('/{id}', (req, res) => {

});
router.delete('/{id}', (req, res) => {

});

module.exports = router;