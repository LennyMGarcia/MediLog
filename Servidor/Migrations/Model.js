if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//Importar libreria de MySql modo Promise
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');

//Modelo que asistira en correr Queries en la Base de Dato

class Model {

    constructor(table) {
        this.table = table;
    }
    async get() {
        try {
            const query = new Builder(this.table);
            const [result, fields] = await DB.query(query.select_query('*'));
            if (result?.length <= 0) {
                return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
            }
            return result;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
        }

    }
    async find(id) {
        try {
            this.id = id;
            const query = new Builder(this.table);
            const [result, fields] = await DB.query(query.select_query('*', 'id'), [this.id]);
            if (result?.length <= 0) {
                return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
            }
            return result[0];
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
        }

    }
    async findUserRecords(id, table) {
        try {
            this.id = id;
            const query = new Builder(table);
            const [result, fields] = await DB.query(query.select_query('*', 'pacientes_id'), [this.id]);
            if (result?.length <= 0) {
                return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
            }
            return result;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
        }
    }
    async delete(id) {
        try {
            this.id = id;
            const [result, fields] = await DB.query(`DELETE FROM ${this.table} WHERE id = ?`, [this.id]);

            if (!result) return [{ 'success': false, 'error': `Accesso Denegado.`, 'status': 401 }];

            return result;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }
}

module.exports = Model;