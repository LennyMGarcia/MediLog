const Model = require("./Model");
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');

class Cirugia extends Model {
    constructor() {
        super('cirugias');
        this.columns = [
            'pacientes_id',
            'especialistas_id',
            'categoria',
            'motivo',
            'estudios',
            'observaciones',
            'instrucciones',
            'resultado',
            'visibilidad',
            'eliminado',
        ]
    }
    async insert(data = null) {
        if (!data) return [{ 'success': false, 'error': 'Campos Obligatorios' }];
        this.data = data;
        this.values = [
            this.data.pacientes_id,
            this.data.especialistas_id,
            this.data.categoria || null,
            this.data.motivo,
            this.data.estudios || null,
            this.data.observaciones || null,
            this.data.instrucciones || null,
            this.data.resultado || null,
            this.data.visibilidad || true,
            this.data.eliminado || false,
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
        return results;
    }
    async update(data = {}, id = null) {
        if (!id) return [{ 'success': false, 'error': 'Registro No Existe' }];
        this.data = data;
        this.values = [
            this.data.pacientes_id,
            this.data.especialistas_id,
            this.data.categoria || null,
            this.data.motivo,
            this.data.estudios || null,
            this.data.observaciones || null,
            this.data.instrucciones || null,
            this.data.resultado || null,
            this.data.visibilidad || true,
            this.data.eliminado || false,
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.update_query(this.columns, this.values, id), this.values)
        return results;
    }
}


module.exports = Cirugia;