const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 3001;

//PROXY que permite comunicacion entre cliente y servidor
app.use(cors({ origin: 'http://localhost:3000/' }));

// Middleware que convierte los datos provenientes de los request a formato JSON (BODY PARSE)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Iniciar Servidor en Puerto Designado
app.listen(PORT, () => {
    console.log(`Conectado al Puerto:${PORT}`);
});