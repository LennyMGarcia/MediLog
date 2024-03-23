// Helper que se usara para re-llenar base de datos en caso de perder o borrar los registros anteriores

//const DB = require('../Utils/db_connect');
const Especialista = require('../Migrations/Especialista');
const Paciente = require('../Migrations/Paciente');
const Consulta = require('../Migrations/Consulta');
const Cirugia = require('../Migrations/Cirugia');
const Producto = require('../Migrations/Producto');
//const Usuario = require('../Migrations/Usuario');
const Caso = require('../Migrations/Caso');
const Transaccion = require('../Migrations/Transaccion');

const random = Math.floor(Math.random() * 5000);
const randomEmails = ['azul', 'rojo', 'verder', 'amarillo', 'morado', 'marron', 'negro', 'blanco'];
const randomNames = ['Fulano', 'Roberto', 'Casandra', 'Melissa', 'Alberto', 'Pedro', 'Yulissa', 'Daniel', 'David', 'Elizabet', 'Isabel'];
const randomLastNames = ['Perez', 'Lopez', 'Garcia', 'Sierra', 'Corripio', 'Abinader', 'Fernandez', 'Encarnacion', 'Santana'];
const randomMotivo = ['Cirugia Estetica', 'Cirugia Correctiva', 'Malestar', 'Dolores', 'Tumores', 'Cancer', 'Patologia', 'Hernia'];
const randomCategoria = ['Cirugia', 'Terapia', 'Radiologia', 'Colonoscopia', 'Bariatrica', 'Dialisis'];
const randomEstado = ['Activo', 'Inactivo', 'Suspendido', 'Eliminado', 'En Proceso'];
const randomSexo = ['F', 'M'];
const randomEspecialidad = ['Medico', 'Pscicologo', 'Terapeuta', 'Cirujano', 'Enfermera'];
const randomSangre = ['O', 'A', 'B'];
const randomProductos = ['Paciente', 'Medico', 'Especialista', 'Independiente', 'Basico'];
const randomProductosCategoria = ['Paciente', 'Medico'];
const randomPago = ['Tarjeta de Credito', 'Tarjeta de Debito'];

//Funccion que selecciona un dato random en un array cualquiera
const getRandomData = (data) => {
    const rand = Math.floor(Math.random() * data.length);
    return data[rand];
}
//Funccion que genera una fecha de nacimiento random
const getRandomFecha = () => {
    const ano = Math.floor(Math.random() * (2024 - 1999) + 1999);
    const dia = Math.floor(Math.random() * (30 - 1) + 1);
    const mes = Math.floor(Math.random() * (12 - 1) + 1);
    const fecha = `${ano}-${mes}-${dia}`;
    return fecha;
}
const getRandomCedula = () => {
    const cedula = Math.floor(Math.random() * (450000000 - 200000000) + 200000000);
    return cedula;
}
const getRandomTelefono = () => {
    const cedula = Math.floor(Math.random() * (809999999 - 809200000) + 809200000);
    return cedula;
}
const seed_especialista = async () => {
    const model = new Especialista();
    const data = {
        nombre: `${getRandomData(randomNames)}`,
        apellido: `${getRandomData(randomLastNames)}`,
        sexo: `${getRandomData(randomSexo)}`,
        fecha_nacimiento: `${getRandomFecha()}`,
        correo: `${getRandomData(randomEmails)}${random}@gmail.com`,
        direccion: 'Santo Domingo, RD',
        telefono: `${getRandomTelefono()}`,
        especialidad: `${getRandomData(randomEspecialidad)}`,
        eliminado: false,
    }
    const success = await model.insert(data);
    if (success.insertId) {
        return { 'success': true, 'message': 'Campos Obligatorios.', 'status': 200, 'id': success.insertId }
    }
    return { 'success': false, 'error': success[0].error, 'status': success[0].status };
}
const seed_paciente = async () => {
    const dbmodel = new Paciente();
    const data = {
        nombre: `${getRandomData(randomNames)}`,
        apellido: `${getRandomData(randomLastNames)}`,
        fecha_nacimiento: `${getRandomFecha()}`,
        documento_identidad: `${getRandomCedula()}`,
        sexo: `${getRandomData(randomSexo)}`,
        correo: `${getRandomData(randomEmails)}${random}@gmail.com`,
        direccion: 'Santo Domingo, RD',
        telefono: `${getRandomTelefono()}`,
        tipo_sangre: `${getRandomData(randomSangre)}`,
        padecimientos: '["Diabetes", "Ulceras", "Colitis"]',
        alergias: '["Flores", "Mujeres", "Perfume"]',
        familiares_id: '[1, 2]',
        eliminado: false,
    }
    const success = await dbmodel.insert(data);
    if (success.insertId) {
        return { 'success': true, 'message': 'Campos Obligatorios.', 'status': 200, 'id': success.insertId }
    }
    return { 'success': false, 'error': success[0].error, 'status': success[0].status };
}
const seed_consulta = async (pacientes_id, especialistas_id) => {
    const dbmodel = new Consulta();
    const data = {
        pacientes_id: pacientes_id || 1,
        especialistas_id: especialistas_id || 1,
        motivo: `${getRandomData(randomMotivo)}`,
        estudios: 1,
        observaciones: 'Se Detecto una anomalia causada por otras condiciones medicas',
        plan_tratamiento: '["Tratar Herida Diaria con soluciones topicas", "Seguir Dieta Balanceada"]',
        visibilidad: true,
        eliminado: false,
    }
    const success = await dbmodel.insert(data);
    if (success.insertId) {
        return { 'success': true, 'message': 'Campos Obligatorios.', 'status': 200, 'id': success.insertId }
    }
    return { 'success': false, 'error': success[0].error, 'status': success[0].status };

}
const seed_cirugia = async (pacientes_id, especialistas_id) => {
    const dbmodel = new Cirugia();
    const data = {
        pacientes_id: pacientes_id || 1,
        especialistas_id: especialistas_id || 1,
        categoria: `${getRandomData(randomCategoria)}`,
        motivo: `${getRandomData(randomMotivo)}`,
        estudios: '["Biopsia", "Rayos-X"]',
        observaciones: 'Se Detecto una anomalia causada por otras condiciones medicas',
        instrucciones: '["No Realizar Actividad Fisica", "Hidratarse"]',
        resultado: 'Exito',
        visibilidad: true,
        eliminado: false,
    }
    const success = await dbmodel.insert(data);
    if (success.insertId) {
        return { 'success': true, 'message': 'Campos Obligatorios.', 'status': 200, 'id': success.insertId }
    }
    return { 'success': false, 'error': success[0].error, 'status': success[0].status };
}
const seed_producto = async () => {
    const dbmodel = new Producto();
    const data = {
        nombre: `${getRandomData(randomProductos)}`,
        categoria: `${getRandomData(randomProductosCategoria)}`,
        precio: `${random}`,
    }
    const success = await dbmodel.insert(data);

    if (success.insertId) {
        return { 'success': true, 'message': 'Campos Obligatorios.', 'status': 200, 'id': success.insertId }
    }
    return { 'success': false, 'error': success[0].error, 'status': success[0].status };
}
/*const seed_usuario = async (pacientes_id, plan) => {
    const dbmodel = new Usuario();
    const data = {
        member_id: pacientes_id || 1,
        correo: `${getRandomData(randomEmails)}${random}@gmail.com`,
        contrasena: `password`,
        tipo: `${getRandomData(randomProductos)}`,
        plan: plan || 1,
        metodo_pago: `${getRandomData(randomPago)}`,
        datos_financieros: `${getRandomCedula()}`,
        cvv: '963',
        fecha_expiracion: '05/25',
        eliminado: false,
    }
    const success = await dbmodel.insert(data);
    if (success.insertId) {
        return { 'success': true, 'message': 'Campos Obligatorios.', 'status': 200, 'id': success.insertId }
    }
    return { 'success': false, 'error': success[0].error, 'detalles': success, 'status': success[0].status, };
}*/

const seed_transaccion = async (productos_id, usuarios_id) => {
    const dbmodel = new Transaccion();
    const data = {
        productos_id: productos_id || 1,
        usuarios_id: usuarios_id || 1,
        monto: `${random}`,
        metodo_pago: `${getRandomData(randomPago)}`,
        descripcion: 'No Detalles',
    }
    const success = await dbmodel.insert(data);
    if (success.insertId) {
        return { 'success': true, 'message': 'Campos Obligatorios.', 'status': 200, 'id': success.insertId }
    }
    return { 'success': false, 'error': success[0].error, 'status': success[0].status };
}
const seed_caso = async (pacientes_id, especialistas_id, consultas, cirugias) => {
    const dbmodel = new Caso();
    const data = {
        descripcion: `${getRandomData(randomMotivo)}`,
        pacientes_id: pacientes_id || 1,
        especialistas_id: especialistas_id || 1,
        consultas: consultas || 1,
        cirugias: cirugias || 1,
        estado: `${getRandomData(randomEstado)}`,
        categoria: `${getRandomData(randomCategoria)}`,
        seguimiento: 'Citas en 3 meses',
        visibilidad: true,
        eliminado: false,
    }
    const success = await dbmodel.insert(data);
    if (success.insertId) {
        return { 'success': true, 'message': 'Campos Obligatorios.', 'status': 200, 'id': success.insertId }
    }
    return { 'success': false, 'error': success[0].error, 'status': success[0].status };

}
module.exports = seed_database = async () => {
    const productos = await seed_producto();
    if (!productos?.success) return console.log({ error: "Operacion Fallida Al Crear Tabla Producto", message: productos?.error });
    console.log(productos);

    const especialistas_id = await seed_especialista();
    if (!especialistas_id?.success) return console.log({ error: "Operacion Fallida Al Crear Tabla Especialista", message: especialistas_id?.error });
    console.log(especialistas_id);

    const pacientes_id = await seed_paciente();
    if (!pacientes_id?.success) return console.log({ error: "Operacion Fallida Al Crear Tabla Paciente", message: pacientes_id?.error });
    console.log(pacientes_id);

    const cirugias = await seed_cirugia(pacientes_id?.id, especialistas_id?.id);
    if (!cirugias?.success) return console.log({ error: "Operacion Fallida Al Crear Tabla Cirugia", message: cirugias?.error });
    console.log(cirugias);

    const consultas = await seed_consulta(pacientes_id?.id, especialistas_id?.id);
    if (!consultas?.success) return console.log({ error: "Operacion Fallida Al Crear Tabla Consulta", message: consultas?.error });
    console.log(consultas);

    const casos = await seed_caso(pacientes_id?.id, especialistas_id?.id, consultas?.id, cirugias?.id);
    if (!casos?.success) return console.log({ error: "Operacion Fallida Al Crear Tabla caso", message: casos?.error });
    console.log(casos);

    const transaccions = await seed_transaccion(productos?.id);
    if (!transaccions?.success) return console.log({ error: "Operacion Fallida Al Crear Tabla transaccion", message: transaccions?.error });
    console.log(transaccions);

}

seed_database();
