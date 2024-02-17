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

const seed_especialista = () => {
    const model = new Especialista();
    const data = {
        nombre: 'Fulano',
        apellido: 'Detal',
        sexo: 'M',
        fecha_nacimiento: '2003-04-04',
        correo: 'testtes11t@gmail.com',
        direccion: 'Santo Domingo, RD',
        telefono: '8523697412',
        especialidad: 'Terapeuta',
        eliminado: false,
    }
    model.insert(data);
}
const seed_paciente = () => {
    const dbmodel = new Paciente();
    const data = {
        nombre: 'Fulano',
        apellido: 'Detal',
        fecha_nacimiento: '2003-02-02',
        documento_identidad: '6326999485546',
        sexo: 'M',
        correo: 'test@gmail.com',
        direccion: 'Santo Domingo, RD',
        telefono: '6632859332',
        tipo_sangre: 'O+',
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
        motivo: 'Colonoscopia',
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
        categoria: 'Estetica',
        motivo: 'Cirugia Estetica',
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
        nombre: 'Basico',
        categoria: 'Paciente',
        precio: 500,
    }
    dbmodel.insert(data);

}
const seed_usuario = () => {
    const dbmodel = new Usuario();
    const data = {
        member_id: 1,
        correo: 'Paciente@test.com',
        contrasena: 'Paciente12',
        tipo: 'Paciente',
        plan: 1,
        metodo_pago: 'Tarjeta de Credito',
        datos_financieros: '4551663285967452',
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
        monto: 500,
        metodo_pago: 500,
        descripcion: 500,
    }
    dbmodel.insert(data);
}
const seed_caso = () => {
    const dbmodel = new Caso();
    const data = {
        descripcion: 'Dolores Cronicos',
        pacientes_id: 1,
        especialistas_id: 1,
        consultas: 1,
        cirugias: 1,
        estado: 'Activo',
        categoria: 'Cirugia',
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

