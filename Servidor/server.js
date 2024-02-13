// Comando que configura el archivo de .env 
// Verifica que el antorno no sea de produccion, en caso de no serlo permite accesso al .env local,
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

const PORT = 3001;

//Conexion a la base de datos (DB)
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
})

//PROXY que permite comunicacion entre cliente y servidor
app.use(cors({ origin: 'http://localhost:3000/' }));

// Middleware que convierte los datos provenientes de los request a formato JSON (BODY PARSE)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/especialistas", (req, res) => {
    const query = 'SELECT * FROM especialistas';
    db.query(query, (err, data) => {
        if (err) res.json(err);
        console.log(data);
        return res.json(data);
    });
});

// Iniciar Servidor en Puerto Designado
app.listen(PORT, () => {
    console.log(`Conectado al Puerto:${PORT}`);
    //console.log(conexion);
});