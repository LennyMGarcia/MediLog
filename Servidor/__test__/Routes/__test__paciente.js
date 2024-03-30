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
        // Simulación de los datos del paciente encontrado en la base de datos
        const data = {
            id: id,
            nombre: 'Nombre Paciente',
            apellido: 'Apellido Paciente',
            fecha_nacimiento: '1990-01-01',
            documento_identidad: '123456789',
            sexo: 'M',
            correo: 'paciente@example.com',
            direccion: 'Dirección del Paciente',
            telefono: '987654321',
            tipo_sangre: 'A-',
            padecimientos: false,
            alergias: false,
            familiares_id: '[1, 2, 3]' // IDs de familiares simulados
        };

        // Simulación de los datos del usuario asociado
        const user = {
            id: data.id,
            metodo_pago: 'Tarjeta de Crédito',
            datos_financieros: 'Datos Financieros del Usuario',
            cvv: '123',
            fecha_expiracion: '03-03-2030'
        };

        // Simulación de los datos del producto asociado al plan del usuario
        const producto = {
            nombre: 'Plan Premium',
            categoria: 'Categoria del Plan',
            precio: 99.99
        };

        // Simulación de los familiares y sus casos asociados
        const familias = [
            { id: 1, nombre: 'Familiar 1', apellido: 'Apellido Familiar 1' },
            { id: 2, nombre: 'Familiar 2', apellido: 'Apellido Familiar 2' },
            { id: 3, nombre: 'Familiar 3', apellido: 'Apellido Familiar 3' }
        ];

        const casos_familiares = [
            { id: 1, descripcion: 'Caso Familiar 1' },
            { id: 2, descripcion: 'Caso Familiar 2' },
            { id: 3, descripcion: 'Caso Familiar 3' }
        ];

        // Construcción del payload final
        const payload = {
            id: data.id || '',
            tipo: 'Paciente',
            nombre: data.nombre || '',
            apellido: data.apellido || '',
            fecha_nacimiento: data.fecha_nacimiento || '',
            documento_identidad: data.documento_identidad || '',
            sexo: data.sexo || 'M',
            correo: data.correo || '',
            direccion: data.direccion || '',
            telefono: data.telefono || '',
            tipo_sangre: data.tipo_sangre || 'A-',
            padecimientos: data.padecimientos || false,
            alergias: data.alergias || false,
            familiares: data.familiares_id || false,
            familias: familias || [],
            casos_familiares: casos_familiares || [],
            metodo_pago: user.metodo_pago || 'Tarjeta de Crédito',
            datos_financieros: user.datos_financieros || '',
            cvv: user.cvv || '',
            fecha_expiracion: user.fecha_expiracion || '03-03-2030',
            descripcion: producto.nombre || 'Basico',
            categoria: producto.categoria || 'Paciente',
            precio: producto.precio || 0
        };

        // Enviar la respuesta
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