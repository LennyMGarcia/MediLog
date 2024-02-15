const express = require('express');
const router = express.Router();
const Transaccion = require('../Migrations/Transaccion');

router.get('/', (req, res) => {
    const model = new Transaccion();
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