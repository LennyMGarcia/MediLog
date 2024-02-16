const express = require("express");
const router = express.Router();
const Casos = require('../Migrations/Caso');

router.get('/', async (req, res) => {
    const model = new Casos();
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