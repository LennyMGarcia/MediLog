const Model = require("./Model");

class Paciente extends Model {
    constructor() {
        super('pacientes');
    }
}

module.exports = Paciente;