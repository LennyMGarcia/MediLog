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
        ];
    }
    async insert(data = null) {
        if (!data) return [{ 'success': false, 'error': 'Campos Obligatorios', 'status': 400 }];

        try {
            this.data = data;
            this.values = [
                this.data.productos_id,
                this.data.usuarios_id,
                this.data.monto,
                this.data.metodo_pago || null,
                this.data.descripcion || null,
            ];
            const query = new Builder(this.table);
            const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
            return results;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
        }

    }
    async update(data = {}, id = null) {
        if (!id) return [{ 'success': false, 'error': 'Registro No Existe', 'status': 404 }];

        try {
            this.data = data;
            this.values = [
                this.data.productos_id,
                this.data.usuarios_id,
                this.data.monto,
                this.data.metodo_pago || null,
                this.data.descripcion || null,
            ];
            const query = new Builder(this.table);
            const [results, fields] = await DB.execute(query.update_query(this.columns, this.values, id), this.values)
            return results;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
        }

    }
}

module.exports = Transaccion;