const express = require('express');
const router = express.Router();
const Cirugia = require('../Migrations/Cirugia');

router.get('/', (req, res) => {
    const model = new Cirugia();
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