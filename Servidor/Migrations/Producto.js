const Model = require("./Model");
const DB = require('../Utils/db_connect');

class Producto extends Model {
    constructor() {
        super('Producto');
        this.columns = [
            'nombre',
            'categoria',
            'precio',
            // 'fecha'
        ];
    }
    async insert(data = {}) {
        this.data = data;
        this.values = [
            this.data.nombre,
            this.data.categoria,
            this.data.precio,
            //this.data.fecha || '2024-05-05'
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
    }
}

module.exports = Producto;