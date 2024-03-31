const express = require('express');
const { body, param, validationResult } = require('express-validator');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

function closeServer() {
    console.log('Cerrando el servidor Express');
    server.close();
}

const cors = require('cors');
const PORT = 3002;
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const id_validation = [
    param('id').escape().trim().notEmpty().isInt().withMessage('Numero de Identificacion Invalido.')
];

app.get('/__test__casos/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    if (validated.isEmpty()) {

        const payload = {
            id: id,
            descripcion: 'Caso de prueba',
            paciente: 'Paciente de prueba',
            pacientes_id: 1,
            especialistas_id: 2,
            estado: 'Activo',
            categoria: 'Categoria de prueba',
            seguimiento: 'Seguimiento de prueba',
        };

        return res.status(200).json(payload);
    } else {
        const error_msg = validated.errors[0].msg;
        return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
    }
});

app.post('/__test__casos', async (req, res) => {
    return res.status(201).json({ 'message': 'Solicitud POST recibida' });
});

app.put('/__test__casos/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    if (validated.isEmpty()) {
        return res.status(200).json({ 'message': `Solicitud PUT recibida para el caso con ID: ${id}` });
    } else {
        const error_msg = validated.errors[0].msg;
        return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
    }
});

app.delete('/__test__casos/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    if (validated.isEmpty()) {
        return res.status(200).json({ 'message': `Solicitud DELETE recibida para el caso con ID: ${id}` });
    } else {
        const error_msg = validated.errors[0].msg;
        return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
    }
});


var server = app.listen(PORT, () => {
    console.log(`Conectado al Puerto:${PORT}`);
});

module.exports = {app, closeServer};