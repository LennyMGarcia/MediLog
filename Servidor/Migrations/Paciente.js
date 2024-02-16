const Model = require("./Model");
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');

class Paciente extends Model {
    constructor() {
        super('pacientes');
        this.columns = [
            'nombre',
            'apellido',
            'fecha_nacimiento',
            'documento_identidad',
            'sexo',
            'correo',
            'direccion',
            'telefono',
            'tipo_sangre',
            'padecimientos',
            'alergias',
            'familiares_id',
            'eliminado',
            // 'fecha'
        ];
    }
    async insert(data = {}) {
        this.data = data;
        this.values = [
            this.data.nombre,
            this.data.apellido,
            this.data.fecha_nacimiento,
            this.data.documento_identidad || 'X-XXXXXXXXXX-XXX',
            this.data.sexo || null,
            this.data.correo,
            this.data.direccion || null,
            this.data.telefono || null,
            this.data.tipo_sangre || null,
            this.data.padecimientos || null,
            this.data.alergias || null,
            this.data.familiares_id || null,
            this.data.eliminado || false,
            //this.data.fecha || '2024-05-05'
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
    }
}

module.exports = Paciente;