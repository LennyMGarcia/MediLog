// Helper que se usara para re-llenar base de datos en caso de perder o borrar los registros anteriores

//const DB = require('../Utils/db_connect');
const Especialista = require('../Migrations/Especialista');
const Paciente = require('../Migrations/Paciente');
const Consulta = require('../Migrations/Consulta');
const Cirugia = require('../Migrations/Cirugia');
const Producto = require('../Migrations/Producto');
const Usuario = require('../Migrations/Usuario');
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
const randomProductos = ['Paciente', 'Medico', 'Especialista', 'Independiente'];
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
const seed_especialista = () => {
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
    model.insert(data);
}
const seed_paciente = () => {
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
        padecimientos: '{"padecimientos":["Diabetes", "Ulceras", "Colitis"]}',
        alergias: '{"alergias":["Flores", "Mujeres", "Perfume"]}',
        familiares_id: '{"familiares": [1, 2]}',
        eliminado: false,
    }
    dbmodel.insert(data);
}
const seed_consulta = () => {
    const dbmodel = new Consulta();
    const data = {
        pacientes_id: 1,
        especialistas_id: 1,
        motivo: `${getRandomData(randomMotivo)}`,
        estudios: 1,
        observaciones: 'Se Detecto una anomalia causada por otras condiciones medicas',
        plan_tratamiento: '{"plan_tratamiento":["Tratar Herida Diaria con soluciones topicas", "Seguir Dieta Balanceada"]}',
        visibilidad: true,
        eliminado: false,
    }
    dbmodel.insert(data);

}
const seed_cirugia = () => {
    const dbmodel = new Cirugia();
    const data = {
        pacientes_id: 1,
        especialistas_id: 1,
        categoria: `${getRandomData(randomCategoria)}`,
        motivo: `${getRandomData(randomMotivo)}`,
        estudios: '{"estudios":["Biopsia", "Rayos-X"]}',
        observaciones: 'Se Detecto una anomalia causada por otras condiciones medicas',
        instrucciones: '{"instrucciones":["No Realizar Actividad Fisica", "Hidratarse"]}',
        resultado: 'Exito',
        visibilidad: true,
        eliminado: false,
    }
    dbmodel.insert(data);
}
const seed_producto = () => {
    const dbmodel = new Producto();
    const data = {
        nombre: `Plan # ${random}`,
        categoria: `${getRandomData(randomProductos)}`,
        precio: `${random}`,
    }
    dbmodel.insert(data);

}
const seed_usuario = () => {
    const dbmodel = new Usuario();
    const data = {
        member_id: 1,
        correo: `${getRandomData(randomEmails)}${random}@gmail.com`,
        contrasena: `${getRandomData(randomNames)}${random}`,
        tipo: `${getRandomData(randomProductos)}`,
        plan: 1,
        metodo_pago: `${getRandomData(randomPago)}`,
        datos_financieros: `${getRandomCedula()}`,
        cvv: '963',
        fecha_expiracion: '05/25',
        eliminado: false,
    }
    dbmodel.insert(data);
}

const seed_transaccion = () => {
    const dbmodel = new Transaccion();
    const data = {
        productos_id: 1,
        usuarios_id: 1,
        monto: `${random}`,
        metodo_pago: `${getRandomData(randomPago)}`,
        descripcion: 'No Detalles',
    }
    dbmodel.insert(data);
}
const seed_caso = () => {
    const dbmodel = new Caso();
    const data = {
        descripcion: `${getRandomData(randomMotivo)}`,
        pacientes_id: 1,
        especialistas_id: 1,
        consultas: 1,
        cirugias: 1,
        estado: `${getRandomData(randomEstado)}`,
        categoria: `${getRandomData(randomCategoria)}`,
        seguimiento: 'Citas en 3 meses',
        visibilidad: true,
        eliminado: false,
    }
    dbmodel.insert(data);

}
module.exports = seed_database = () => {
    seed_especialista();
    seed_paciente();
    seed_cirugia();
    seed_consulta();
    seed_producto();
    seed_usuario();
    seed_caso();
    seed_transaccion();
}

seed_database();
