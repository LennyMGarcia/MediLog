const Model = require("./Model");
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');

class Especialista extends Model {
    constructor() {
        super('especialistas');
        this.columns = [
            'nombre',
            'apellido',
            'sexo',
            'fecha_nacimiento',
            'correo',
            'direccion',
            'telefono',
            'especialidad',
            'eliminado',
            // 'fecha'
        ];
    }
    async insert(data = {}) {
        this.data = data;
        this.values = [
            this.data.nombre,
            this.data.apellido,
            this.data.sexo || 'NULL',
            this.data.fecha_nacimiento || 'NULL',
            this.data.correo,
            this.data.direccion || 'NULL',
            this.data.telefono || 'NULL',
            this.data.especialidad || 'Desconocido',
            this.data.eliminado || false,
            //this.data.fecha || '2024-05-05'
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
    }
}

module.exports = Especialista;