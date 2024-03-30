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

router.get('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    // Verificar si los campos son válidos
    if (validated.isEmpty()) {
        // Simulación de los datos de la consulta encontrada en la base de datos
        const data = {
            id: id,
            pacientes_id: 1,
            especialistas_id: 2,
            fecha: '2024-03-30',
            motivo: 'Motivo de consulta',
            diagnostico: 'Diagnóstico de consulta',
            tratamiento: 'Tratamiento de consulta',
            estudios: JSON.stringify(['Estudio 1', 'Estudio 2']),
            plan_tratamiento: JSON.stringify(['Plan 1', 'Plan 2'])
        };

        // Simulación de los datos del paciente asociado
        const paciente_data = {
            id: data.pacientes_id,
            nombre: 'Nombre Paciente',
            apellido: 'Apellido Paciente'
        };

        // Simulación de los datos del especialista asociado
        const especialista_data = {
            id: data.especialistas_id,
            nombre: 'Nombre Especialista',
            apellido: 'Apellido Especialista'
        };

        // Simulación de los datos de casos, cirugías, consultas y transacciones asociadas
        const casos = [];
        const cirugias = [];
        const consultas = [];
        const transacciones = [];

        // Construcción del payload final
        const payload = {
            ...data,
            paciente: `${paciente_data.nombre} ${paciente_data.apellido}` || 'Paciente Desconocido',
            consultas: consultas,
            casos: casos,
            cirugias: cirugias,
            transacciones: transacciones
        };

        // Enviar la respuesta
        return res.status(200).json(payload);
    }

    // Si los campos no son válidos, devolver un mensaje de error
    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': error_msg });
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