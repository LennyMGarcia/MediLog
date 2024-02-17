const Model = require("./Model");
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');

class Producto extends Model {
    constructor() {
        super('productos');
        this.columns = [
            'nombre',
            'categoria',
            'precio',
        ];
    }
    async insert(data = null) {
        if (!data) return [{ 'success': false, 'error': 'Campos Obligatorios' }];
        this.data = data;
        this.values = [
            this.data.nombre,
            this.data.categoria,
            this.data.precio,
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
        return results;
    }
    async update(data = {}, id = null) {
        if (!id) return [{ 'success': false, 'error': 'Registro No Existe' }];
        this.data = data;
        this.values = [
            this.data.nombre,
            this.data.categoria,
            this.data.precio,
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.update_query(this.columns, this.values, id), this.values)
        return results;
    }
}

module.exports = Producto;