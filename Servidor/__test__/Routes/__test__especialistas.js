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
        // Simulación de los datos del especialista encontrado en la base de datos
        const data = {
            id: id,
            nombre: 'Nombre Especialista',
            apellido: 'Apellido Especialista',
            fecha_nacimiento: '1990-01-01',
            sexo: 'M',
            correo: 'especialista@example.com',
            direccion: 'Dirección del Especialista',
            telefono: '123456789',
            especialidad: 'Especialidad del Especialista'
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

        // Construcción del payload final
        const payload = {
            id: data.id || '',
            tipo: 'Especialista',
            nombre: data.nombre || '',
            apellido: data.apellido || '',
            fecha_nacimiento: data.fecha_nacimiento || '',
            sexo: data.sexo || 'M',
            correo: data.correo || '',
            direccion: data.direccion || '',
            telefono: data.telefono || '',
            especialidad: data.especialidad || '',
            metodo_pago: user.metodo_pago || 'Tarjeta de Crédito',
            datos_financieros: user.datos_financieros || '',
            cvv: user.cvv || '',
            fecha_expiracion: user.fecha_expiracion || '03-03-2030',
            descripcion: producto.nombre || 'Básico',
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