const Model = require("./Model");
const DB = require('../Utils/db_connect');

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
            this.data.fecha_nacimiento || 'NULL',
            this.data.documento_identidad || 'NULL',
            this.data.sexo || 'NULL',
            this.data.correo,
            this.data.direccion || 'NULL',
            this.data.telefono || 'NULL',
            this.data.tipo_sangre || 'Desconocido',
            this.data.padecimientos || 'NULL',
            this.data.alergias || 'NULL',
            this.data.familiares_id || 'NULL',
            this.data.eliminado || false,
            //this.data.fecha || '2024-05-05'
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
    }
}

module.exports = Paciente;