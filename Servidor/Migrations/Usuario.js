const Model = require("./Model");

class Usuario extends Model {
    constructor() {
        super('usuarios');
    }
}

module.exports = Usuario;