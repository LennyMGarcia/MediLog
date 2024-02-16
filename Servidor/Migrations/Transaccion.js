const Model = require("./Model");
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');

class Transaccion extends Model {
    constructor() {
        super('transacciones');
        this.columns = [
            'productos_id',
            'usuarios_id',
            'monto',
            'metodo_pago',
            'descripcion',
            //'fecha'
        ];
    }
    async insert(data = {}) {
        this.data = data;
        this.values = [
            this.data.productos_id,
            this.data.usuarios_id,
            this.data.monto,
            this.data.metodo_pago || null,
            this.data.descripcion || null,
            //this.data.fecha || '2024-05-05'
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
    }
}

module.exports = Transaccion;