const Model = require("./Model");
const DB = require('../Utils/db_connect');

class Transaccion extends Model {
    constructor() {
        super('transacciones');
        this.columns = [
            'productos_id',
            'usuario_id',
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
            this.data.usuario_id,
            this.data.monto,
            this.data.metodo_pago || 'NULL',
            this.data.descripcion || 'NULL',
            //this.data.fecha || '2024-05-05'
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
    }
}

module.exports = Transaccion;