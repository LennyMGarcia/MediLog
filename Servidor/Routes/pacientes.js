const express = require('express');
const router = express.Router();
const Paciente = require('../Migrations/Paciente');
const Usuario = require('../Migrations/Usuario');
const Producto = require('../Migrations/Producto');
const { body, param, validationResult } = require('express-validator');
const Caso = require('../Migrations/Caso');

// Reglas de Validaciones
const validaciones = [
    body('nombre').escape().trim().isString().notEmpty().withMessage('Nombre Obligatorio.'),
    body('apellido').escape().trim().isString().notEmpty().withMessage('Apellido Obligatorio.'),
    body('correo').escape().trim().isEmail().notEmpty().withMessage('Correo Invalido.'),
    body('fecha_nacimiento').escape().trim().isDate().notEmpty().withMessage('Fecha de Nacimiento Obligatoria.'),
    body('documento_identidad').escape().trim().isString().notEmpty().withMessage('Documento de Identificacion Obligatorio.'),
    body('direccion').escape().trim().isString().optional(),
    body('sexo').escape().trim().isString().optional(),
    body('telefono').escape().trim().isString().optional(),
    body('tipo_sangre').escape().trim().isString().optional(),
    body('padecimientos').escape().trim().isString().optional(),
    body('alergias').escape().trim().isString().optional(),
    body('familiares_id').escape().trim().isString().optional(),
];
//

const edit_validaciones = [
    body('nombre').escape().trim().isString().notEmpty().withMessage('Nombre Obligatorio.'),
    body('apellido').escape().trim().isString().notEmpty().withMessage('Apellido Obligatorio.'),
    body('fecha_nacimiento').escape().trim().isString().optional(),
    body('documento_identidad').escape().trim().isString().notEmpty().withMessage('Documento de Identificacion Obligatorio.'),
    body('direccion').escape().trim().isString().optional(),
    body('sexo').escape().trim().isString().optional(),
    body('telefono').escape().trim().isString().optional(),
    body('tipo_sangre').escape().trim().isString().optional(),
    body('padecimientos').trim().isString().optional(),
    body('alergias').trim().isString().optional(),
    body('familiares_id').trim().isString().optional(),
];
const id_validation = [
    param('id').escape().trim().notEmpty().isInt().withMessage('Numero de Identificacion Invalido.')
];

router.get('/', async (req, res) => {
    const model = new Paciente();
    const data = await model.get();

    if (data?.length <= 0) return res.status(404).json({ 'message': 'Registro No Existe.' });
    return res.status(200).json(data);
});
router.get('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Paciente();
        const data = await model.find(id);
        const user_model = new Usuario();
        const user = await user_model.getMember(data?.id);
        const casos = await user_model.findUserRecords(data?.id, 'casos');
        const product_model = new Producto();
        const producto = await product_model.find(user?.plan)

        //Funccion que busca los familiares de un paciente si hay
        const obj = JSON.parse(data?.familiares_id);
        var familias = []
        var ids = []
        var casos_familiares = [];
        if (obj?.length >= 1) {
            obj?.forEach((element) => {
                if (typeof (element) === 'string') {
                    const id = parseInt(element);
                    ids.push(id);
                } else {
                    ids.push(element);
                }
            });

            for (let i = 0; i < ids.length; i++) {
                const element = ids[i];
                const family_member = new Paciente();
                const family_member_data = await family_member.find(element);
                const cases_family_member = new Caso();
                const cases_family_member_data = await family_member.findUserRecords(family_member_data?.id, 'casos');
                familias.push(family_member_data);
                casos_familiares.push(...cases_family_member_data);
            }
        }

        const payload = {
            id: data?.id || '',
            tipo: 'Paciente',
            nombre: data?.nombre || '',
            apellido: data?.apellido || '',
            fecha_nacimiento: data?.fecha_nacimiento || '',
            documento_identidad: data?.documento_identidad || '',
            sexo: data?.sexo || 'M',
            correo: data?.correo || '',
            direccion: data?.direccion || '',
            telefono: data?.telefono || '',
            tipo_sangre: data?.tipo_sangre || 'A-',
            padecimientos: data?.padecimientos || false,
            alergias: data?.alergias || false,
            familiares: data?.familiares_id || false,
            familias: familias || [],
            casos_familiares: casos_familiares || [],
            casos: casos[0]?.success === false ? [] : casos,
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
    const error_msg = validated?.errors[0]?.msg;
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });

});
router.post('/', validaciones, async (req, res) => {
    const data = req.body;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const model = new Paciente();
        const result = await model.insert(data);

        if (result[0]?.success === false) return res.status(result[0].status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated?.errors[0]?.msg;
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });

});
router.put('/:id', id_validation, edit_validaciones, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {
        const data = req.body;

        const model = new Paciente();
        const result = await model.update(data, id);
        console.log(result);
        if (result[0]?.success === false) return res.status(result[0].status).json(result);
        return res.status(201).json(result);
    }

    const error_msg = validated?.errors[0]?.msg;
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });
});
router.delete('/:id', id_validation, async (req, res) => {
    const id = req.params.id;
    const validated = validationResult(req);

    //Condicion que verifica si los campos obligatorios estan incluidos
    if (validated.isEmpty()) {

        const model = new Paciente();
        const destroy = await model.delete(id);
        if (destroy[0]?.success === false) return res.status(destroy[0]?.status).json({ 'message': 'Ese Paciente tiene un caso abierto.' });
        return res.status(200).json({ 'message': 'Registro Eliminado Exitosamente.' });
    }

    const error_msg = validated?.errors[0]?.msg;
    return res.status(400).json({ 'message': `${error_msg} para campo de ' ${validated.errors[0].path} '` });

});

module.exports = router;