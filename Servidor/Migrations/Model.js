if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//Importar libreria de MySql modo Promise
const mysql = require('mysql2/promise');

//Modelo que asistira en correr Queries en la Base de Dato
class Model {

    constructor(table) {
        this.table = table;
    }
    async get() {
        const db = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
            port: process.env.DATABASE_PORT

        });
        const [result, fields] = await db.query(`SELECT * FROM ${this.table}`);

        return result;
    }
    async find(id) {
        this.id = id;
        const db = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
            port: process.env.DATABASE_PORT

        });
        const [result, fields] = await db.query(`SELECT * FROM ${this.table} WHERE id = ?`, [this.id]);
        return result[0];
    }
    async delete(id) {
        this.id = id;
        const db = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
            port: process.env.DATABASE_PORT

        });
        const [result, fields] = await db.query(`DELETE FROM ${this.table} WHERE id = ?`, [this.id]);
        return result;
    }
}

module.exports = Model;