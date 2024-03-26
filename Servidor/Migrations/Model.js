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
            return result;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }
    async find(id) {
        try {
            this.id = id;
            const query = new Builder(this.table);
            const [result, fields] = await DB.query(query.select_query('*', 'id'), [this.id]);
            return result[0];
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }
    async findUserRecords(id, table) {
        try {
            this.id = id;
            const query = new Builder(table);
            const [result, fields] = await DB.query(query.select_query('*', 'pacientes_id'), [this.id]);
            return result;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }
    }
    async delete(id) {
        try {
            this.id = id;
            const [result, fields] = await DB.query(`DELETE FROM ${this.table} WHERE id = ?`, [this.id]);
            return result;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }
}

module.exports = Model;