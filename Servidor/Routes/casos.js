const express = require("express");
const router = express.Router();
const Casos = require('../Migrations/Caso');

router.get('/', (req, res) => {
    const model = new Casos();
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