const Model = require("./Model");

class Transaccion extends Model {
    constructor() {
        super('transacciones');
    }
}

module.exports = Transaccion;