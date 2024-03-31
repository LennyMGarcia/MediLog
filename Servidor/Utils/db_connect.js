// Configuracion del archivo .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//Importar libreria de MySql modo Promise
const mysql = require('mysql2/promise');

//Configuracion que permite multiples conexiones a la base de dato sin cerrar 
const DB = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    database: process.env.DATABASE_NAME || 'medilogPrueba',
    password: process.env.DATABASE_PASSWORD || '',
    port: process.env.DATABASE_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10, //Cantidad Maxima de Conexiones
    maxIdle: 10, //Tiempo de Inactividad Maxima
    idleTimeout: 60000, //Tiempo de Penalidad por Inactividad
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

module.exports = DB;