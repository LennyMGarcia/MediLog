const Model = require("./Model");
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');

class Consulta extends Model {
    constructor() {
        super('consultas');
        this.columns = [
            'pacientes_id',
            'especialistas_id',
            'motivo',
            'estudios',
            'observaciones',
            'plan_tratamiento',
            'visibilidad',
            'eliminado',
            //'fecha'
        ]
    }
    async insert(data = {}) {
        this.data = data;
        this.values = [
            this.data.pacientes_id,
            this.data.especialistas_id,
            this.data.motivo,
            this.data.estudios || null,
            this.data.observaciones || null,
            this.data.plan_tratamiento || null,
            this.data.visibilidad || true,
            this.data.eliminado || false,
            //this.data.fecha || '2024-05-05'
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
    }
}

module.exports = Consulta;