const Model = require("./Model");
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');

class Caso extends Model {
    constructor() {
        super('casos');
        this.columns = [
            'descripcion',
            'pacientes_id',
            'especialistas_id',
            'consultas',
            'cirugias',
            'estado',
            'categoria',
            'seguimiento',
            'visibilidad',
            'eliminado',
            //'fecha'
        ];
    }
    async insert(data = {}) {
        this.data = data;
        this.values = [
            this.data.descripcion,
            this.data.pacientes_id,
            this.data.especialistas_id,
            this.data.consultas || null,
            this.data.cirugias || null,
            this.data.estado || null,
            this.data.categoria || 'Activo',
            this.data.seguimiento || 'No Indicaciones',
            this.data.visibilidad || true,
            this.data.eliminado || false,
            //this.data.fecha || '2024-05-05'
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
    }
}

module.exports = Caso;