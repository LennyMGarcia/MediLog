const express = require('express');
const router = express.Router();
const Especialista = require('../Migrations/Especialista');
const Usuario = require('../Migrations/Usuario');
const Producto = require('../Migrations/Producto');
const { body, param, validationResult } = require('express-validator');

// Reglas de Validaciones
const validaciones = [
    body('nombre').escape().trim().notEmpty().withMessage('Nombre Obligatorio.'),
    body('apellido').escape().trim().notEmpty().withMessage('Apellido Obligatorio.'),
    body('sexo').escape().trim().isString().notEmpty().withMessage('Motivo de Consulta Obligatorio.'),
    body('correo').escape().trim().isEmail().notEmpty().withMessage('Correo Invalido.'),
    body('especialidad').escape().trim().isString().notEmpty().withMessage('Especialidad Obligatoria.'),
    body('fecha_nacimiento').escape().trim().isString().optional(),
    body('direccion').escape().trim().isString().optional(),
    body('telefono').escape().trim().isString().optional(),
];
const edit_validaciones = [
    body('nombre').escape().trim().notEmpty().withMessage('Nombre Obligatorio.'),
    body('apellido').escape().trim().notEmpty().withMessage('Apellido Obligatorio.'),
    body('sexo').escape().trim().isString().notEmpty().withMessage('Motivo de Consulta Obligatorio.'),
    body('especialidad').trim().isString().notEmpty().withMessage('Especialidad Obligatoria.'),
    body('fecha_nacimiento').escape().trim().isString().optional(),
    body('direccion').escape().trim().isString().optional(),
    body('telefono').escape().trim().isString().optional(),
];
const id_validation = [
    param('id').escape().trim().notEmpty().isInt().withMessage('Numero de Identificacion Invalido.')
];

router.get('/', async (req, res) => {
    const model = new Especialista();
    const data = await model.get();

    if (data?.length <= 0) return res.status(404).json({ 'message': 'Registro No Existe.' });
    return res.status(200).json(data);
});
router.get('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Especialista();
        const data = await model.find(id);
        const user_model = new Usuario();
        const user = await user_model.getMember(data?.id);
        const product_model = new Producto();
        const producto = await product_model.find(user?.plan)

        const payload = {
            id: data?.id || '',
            tipo: 'Especialista',
            nombre: data?.nombre || '',
            apellido: data?.apellido || '',
            fecha_nacimiento: data?.fecha_nacimiento || '',
            sexo: data?.sexo || 'M',
            correo: data?.correo || '',
            direccion: data?.direccion || '',
            telefono: data?.telefono || '',
            especialidad: data?.especialidad || '',
            metodo_pago: user?.metodo_pago || 'Tarjeta de Credito',
            datos_financieros: user?.datos_financieros || '',
            cvv: user?.cvv || '',
            fecha_expiracion: user?.fecha_expiracion || '03-03-2030',
            descripcion: producto?.nombre || 'Basico',
            categoria: producto?.categoria || 'Paciente',
            precio: producto?.precio || 0,
        }
        if (!data) return res.status(404).json({ 'message': 'Registro No Existe.' });
        return res.status(200).json(payload);

    }

    const error_msg = validated?.errors[0]?.msg || 'Campo Invalido';
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});
router.post('/', validaciones, async (req, res) => {
    const data = req.body;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Especialista();
        const result = await model.insert(data);

        if (result[0]?.success === false) return res.status(result[0]?.status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated?.errors[0]?.msg || 'Campo Invalido';
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});
router.put('/:id', id_validation, edit_validaciones, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const data = req.body;

        const model = new Especialista();
        const result = await model.update(data, id);

        if (result[0]?.success === false) return res.status(result[0]?.status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated?.errors[0]?.msg || 'Campo Invalido';
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});
router.delete('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {

        const model = new Especialista();
        const destroy = await model.delete(id);
        if (destroy[0]?.success === false) return res.status(destroy[0]?.status).json({ 'message': 'Ese Especialista tiene un caso abierto.' });
        return res.status(200).json({ 'message': 'Registro Eliminado Exitosamente.' });
    }

    const error_msg = validated?.errors[0]?.msg || 'Campo Invalido';
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});



module.exports = router;