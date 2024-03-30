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
        // Simulación de los datos del usuario encontrado en la base de datos
        const user = {
            id: id,
            tipo: 'Especialista' // Supongamos que el tipo de usuario es "Especialista"
        };

        // Simulación de los datos de casos, cirugías, consultas y transacciones asociados al usuario
        const casos = [
            { id: 1, descripcion: 'Caso 1' },
            { id: 2, descripcion: 'Caso 2' }
        ];
        const cirugias = [
            { id: 1, descripcion: 'Cirugía 1' },
            { id: 2, descripcion: 'Cirugía 2' }
        ];
        const consultas = [
            { id: 1, descripcion: 'Consulta 1' },
            { id: 2, descripcion: 'Consulta 2' }
        ];
        const transacciones = [
            { id: 1, descripcion: 'Transacción 1' },
            { id: 2, descripcion: 'Transacción 2' }
        ];

        // Si el usuario es un paciente, también simulamos los datos de pacientes asociados
        if (user.tipo === 'Paciente') {
            const pacientes = [
                { id: 1, nombre: 'Paciente 1' },
                { id: 2, nombre: 'Paciente 2' }
            ];

            // Crear el payload con los datos simulados
            const payload = {
                casos: casos,
                cirugias: cirugias,
                consultas: consultas,
                transacciones: transacciones,
                pacientes: pacientes
            };

            // Enviar la respuesta con el payload
            return res.status(200).json(payload);
        }

        // Si el usuario es un especialista, no necesitamos los datos de pacientes
        // Crear el payload con los datos simulados
        const payload = {
            casos: casos,
            cirugias: cirugias,
            consultas: consultas,
            transacciones: transacciones
        };

        // Enviar la respuesta con el payload
        return res.status(200).json(payload);
    }

    // Si los campos no son válidos, devolver un mensaje de error
    const error_msg = validated.errors[0].msg;
    return res.status(400).json({ 'message': `${error_msg} para campo de '${validated.errors[0].path}'` });
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