const Model = require("./Model");
const DB = require('../Utils/db_connect');

class Cirugia extends Model {
    constructor() {
        super('cirugias');
    }
}

module.exports = Cirugia;