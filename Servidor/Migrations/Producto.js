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
    async getIdByName(name = null) {
        if (!name) return [{ 'success': false, 'error': 'Campos Obligatorios.', 'status': 400 }];

        this.values = name;
        try {
            const query = new Builder(this.table);
            const [results, fields] = await DB.execute(query.select_query('id', 'nombre'), [this.values]);
            return results[0];
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
        }

    }
    async insert(data = null) {
        if (!data) return [{ 'success': false, 'error': 'Campos Obligatorios.', 'status': 400 }];

        try {
            this.data = data;
            this.values = [
                this.data.nombre,
                this.data.categoria,
                this.data.precio,
            ];
            const query = new Builder(this.table);
            const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
            return results;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
        }

    }
    async update(data = {}, id = null) {
        if (!id) return [{ 'success': false, 'error': 'Registro No Existe.', 'status': 404 }];

        try {
            this.data = data;
            this.values = [
                this.data.nombre,
                this.data.categoria,
                this.data.precio,
            ];
            const query = new Builder(this.table);
            const [results, fields] = await DB.execute(query.update_query(this.columns, this.values, id), this.values)
            return results;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
        }

    }
}

module.exports = Producto;