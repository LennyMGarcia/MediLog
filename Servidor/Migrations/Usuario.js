const Model = require("./Model");
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');
const bcrypt = require('bcrypt');
const salt_level = 10;
const Paciente = require('./Paciente');
const Especialista = require('./Especialista');
const Producto = require('./Producto');

class Usuario extends Model {
    constructor(id = null) {
        super('usuarios');
        this.columns = [
            'member_id',
            'correo',
            'contrasena',
            'tipo',
            'plan',
            'metodo_pago',
            'datos_financieros',
            'cvv',
            'fecha_expiracion',
            'eliminado',
        ];
        this.id = id;
        this.member_id = null;
        this.tipo = null;
        this.plan = null;
    }
    //Funccion que se encarga de autentificar un usuario segun se numero de identificacion.

    async getUser() {
        if (!this.id) return [{ 'success': false, 'error': 'Campos Obligatorios.', 'status': 400 }];

        try {
            const result = await this.find(this.id);
            this.member_id = result?.member_id;
            this.tipo = result?.tipo;
            this.plan = result?.plan;
            const query = new Builder('productos');
            const [productos_results, fields] = await DB.query(query.select_query('*', 'id'), [this.plan]);
            if (this.tipo === 'Paciente') {
                const model = new Paciente();
                const search = await model.find(this.member_id);
                const rows = {
                    id: result.id,
                    member_id: result.member_id,
                    nombre: search.nombre,
                    apellido: search.apellido,
                    correo: result.correo,
                    tipo: result.tipo,
                    plan: productos_results[0]?.nombre || 'Basico'
                }
                return rows;
            } else {
                const model = new Especialista();
                const search = await model.find(this.member_id);
                console.log(search);
                const rows = {
                    id: result.id,
                    member_id: result.member_id,
                    nombre: search.nombre,
                    apellido: search.apellido,
                    correo: result.correo,
                    tipo: result.tipo,
                    plan: productos_results[0]?.nombre || 'Basico'
                }
                return rows;
            }

            return result;

        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }
    async getMember(member_id) {
        if (!member_id) return [{ 'success': false, 'error': 'Campos Obligatorios.', 'status': 400 }];

        try {
            const query = new Builder(this.table);
            const [result, fields] = await DB.query(query.select_query('*', 'member_id'), [member_id]);
            this.id = result[0]?.id;
            this.member_id = result[0]?.member_id;
            this.tipo = result[0]?.tipo;
            this.plan = result[0]?.plan;
            return result[0];
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }
    async insert(data = null) {
        if (!data) return [{ 'success': false, 'error': 'Campos Obligatorios.', 'status': 400 }];

        try {
            this.data = data;
            this.values = [
                this.data.member_id || null,
                this.data.correo,
                this.data.contrasena,
                this.data.tipo || 'Paciente',
                this.data.plan || null,
                this.data.metodo_pago || null,
                this.data.datos_financieros || null,
                this.data.cvv || null,
                this.data.fecha_expiracion || null,
                this.data.eliminado || false,
            ];

            //Funccion que encripta la contrasena
            const salt = await bcrypt.genSalt(salt_level);
            const hashed_password = await bcrypt.hash(this.data.contrasena, salt);
            if (!hashed_password) return [{ 'success': false, 'error': 'Por favor, Intentar Otra Contraseña', 'status': 500 }];

            this.values[2] = hashed_password;

            //Condicion que crea el usuario segun su tipo (Paciente / Especialista)
            if (this.values[3] === 'Paciente') {
                this.pacientes_values = {
                    'nombre': this.data.nombre,
                    'apellido': this.data.apellido,
                    'fecha_nacimiento': this.data.fecha_nacimiento,
                    'documento_identidad': this.data.documento_identidad || 'X-XXXXXXXXXX-XXX',
                    'sexo': this.data.sexo || null,
                    'correo': this.data.correo,
                    'direccion': this.data.direccion || null,
                    'telefono': this.data.telefono || null,
                    'tipo_sangre': this.data.tipo_sangre || null,
                    'padecimientos': this.data.padecimientos || null,
                    'alergias': this.data.alergias || null,
                    'familiares_id': this.data.familiares_id || null,
                };

                const paciente = new Paciente();
                const model = await paciente.insert(this.pacientes_values);

                //Condicion que registra el usuario solamente si se creo el especialista correctamente.

                if (model.insertId) {
                    this.values[0] = model.insertId;
                    const query = new Builder(this.table);
                    const [results, field] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
                    return results;
                }
                return [{ 'success': false, 'error': 'Campos Obligatorios.', 'status': 500 }];
            } else {
                this.especialistas_values = {
                    'nombre': this.data.nombre,
                    'apellido': this.data.apellido,
                    'sexo': this.data.sexo || null,
                    'fecha_nacimiento': this.data.fecha_nacimiento || null,
                    'correo': this.data.correo,
                    'direccion': this.data.direccion || null,
                    'telefono': this.data.telefono || null,
                    'especialidad': this.data.especialidad,
                };
                const especialista = new Especialista();
                const model = await especialista.insert(this.especialistas_values);

                //Condicion que registra el usuario solamente si se creo el especialista correctamente.
                if (model.insertId) {
                    this.values[0] = model.insertId;
                    const query = new Builder(this.table);
                    const [results, field] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
                    return results;
                }
                return [{ 'success': false, 'error': 'Campos Obligatorios.', 'status': 500 }];
            }
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }
    async update(data = {}, id = null) {
        if (!id) return [{ 'success': false, 'error': 'Registro No Existe.', 'status': 400 }];

        try {
            this.data = data;
            this.values = [
                this.data.correo,
                this.data.contrasena,
                this.data.tipo || 'Paciente',
                this.data.plan || null,
                this.data.metodo_pago || null,
                this.data.datos_financieros || null,
                this.data.cvv || null,
                this.data.fecha_expiracion || null,
                this.data.eliminado || false,
            ];

            this.editable_columns = [
                'correo',
                'contrasena',
                'tipo',
                'plan',
                'metodo_pago',
                'datos_financieros',
                'cvv',
                'fecha_expiracion',
                'eliminado',
            ];
            const query = new Builder(this.table);
            const [results, fields] = await DB.execute(query.update_query(this.editable_columns, this.values, id), this.values)

            return results;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }
    async update_plan(data = null, id = null) {
        if (!id) return [{ 'success': false, 'error': 'Registro No Existe.', 'status': 400 }];

        try {
            this.data = data;
            this.values = [
                this.data || null,
            ];

            this.editable_columns = [
                'plan',
            ];
            const query = new Builder(this.table);
            const [results, fields] = await DB.execute(query.update_query(this.editable_columns, this.values, id), this.values)

            return results;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }
    async update_password(data = null, id = null) {
        if (!id) return [{ 'success': false, 'error': 'Registro No Existe.', 'status': 400 }];

        try {
            this.data = data;
            this.values = [
                this.data || null,
            ];
            this.editable_columns = [
                'contrasena',
            ];
            //Funccion que encripta la contrasena
            const salt = await bcrypt.genSalt(salt_level);
            const hashed_password = await bcrypt.hash(this.data, salt);
            if (!hashed_password) return [{ 'success': false, 'error': 'Por favor, Intentar Otra Contraseña', 'status': 500 }];

            this.values[0] = hashed_password;

            const query = new Builder(this.table);
            const [results, fields] = await DB.execute('UPDATE usuarios SET contrasena = ? where id=?', [hashed_password, id])
            return results;

        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
        }

    }
    async authenticate(correo = null) {
        if (!correo) return [{ 'success': false, 'error': 'Correo de Usuario Obligatorio.', 'status': 400 }];

        try {
            this.correo = correo
            const query = new Builder(this.table);
            const [results, fields] = await DB.execute(query.select_query('contrasena, member_id, tipo, id', 'correo'), [this.correo]);

            return results;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }

    //Funccion que se encarga de buscar los casos de un usuario especifico.
    async casos() {
        if (!this.member_id) return [{ 'success': false, 'error': 'Acceso Denegado.', 'status': 400 }];

        const columns = [
            'descripcion',
            'pacientes_id',
            'especialistas_id',
            'consultas',
            'cirugias',
            'estado',
            'categoria',
            'seguimiento',
            'visibilidad',
            'eliminado',
        ];

        if (this.tipo === 'Paciente') {
            try {
                const query = new Builder('casos');
                const [results, fields] = await DB.execute(query.select_query(columns, 'pacientes_id'), [this.member_id]);

                if (results.length <= 0) {
                    return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
                }

                return results;
            } catch (error) {
                return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
                // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
            }
        } else {
            try {
                const query = new Builder('casos');
                const [results, fields] = await DB.execute(query.select_query(columns, 'especialistas_id'), [this.member_id]);

                if (results.length <= 0) {
                    return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
                }

                return results;
            } catch (error) {
                return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
                // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
            }
        }
    }
    //Funccion que se encarga de buscar los cirugias de un usuario especifico.

    async cirugias() {
        if (!this.member_id) return [{ 'success': false, 'error': 'Acceso Denegado.', 'status': 400 }];

        const columns = [
            'pacientes_id',
            'especialistas_id',
            'categoria',
            'motivo',
            'estudios',
            'observaciones',
            'instrucciones',
            'resultado',
            'visibilidad',
            'eliminado',
        ];

        if (this.tipo === 'Paciente') {
            try {
                const query = new Builder('cirugias');
                const [results, fields] = await DB.execute(query.select_query(columns, 'pacientes_id'), [this.member_id]);

                if (results.length <= 0) {
                    return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
                }

                return results;
            } catch (error) {
                return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
                // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
            }
        } else {
            try {
                const query = new Builder('cirugias');
                const [results, fields] = await DB.execute(query.select_query(columns, 'especialistas_id'), [this.member_id]);

                if (results.length <= 0) {
                    return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
                }

                return results;
            } catch (error) {
                return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
                // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
            }
        }

    }
    //Funccion que se encarga de buscar los consultas de un usuario especifico.

    async consultas() {
        if (!this.member_id) return [{ 'success': false, 'error': 'Acceso Denegado.', 'status': 400 }];

        const columns = [
            'pacientes_id',
            'especialistas_id',
            'motivo',
            'estudios',
            'observaciones',
            'plan_tratamiento',
            'visibilidad',
            'eliminado',
        ];

        if (this.tipo === 'Paciente') {
            try {
                const query = new Builder('consultas');
                const [results, fields] = await DB.execute(query.select_query(columns, 'pacientes_id'), [this.member_id]);

                if (results.length <= 0) {
                    return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
                }

                return results;
            } catch (error) {
                return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
                // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
            }
        } else {
            try {
                const query = new Builder('consultas');
                const [results, fields] = await DB.execute(query.select_query(columns, 'especialistas_id'), [this.member_id]);

                if (results.length <= 0) {
                    return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
                }

                return results;
            } catch (error) {
                return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
                // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
            }
        }
    }
    //Funccion que se encarga de buscar los pacientes de un usuario especifico.

    async pacientes() {
        if (!this.member_id) return [{ 'success': false, 'error': 'Acceso Denegado o Registro No Existe.', 'status': 400 }];
        const casos_columns = [
            'pacientes_id',
        ];

        //'especialistas_id',
        if (this.tipo !== 'Paciente') {
            try {
                const pacientes_ids = [];
                const query = new Builder('casos');
                const [results, fields] = await DB.execute(query.select_query(casos_columns, 'especialistas_id'), [this.member_id]);

                if (results.length <= 0) {
                    return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
                }
                results.forEach(el => {
                    if (!pacientes_ids.includes(el.pacientes_id)) {
                        pacientes_ids.push(el.pacientes_id);
                    }
                });
                const res = this.getAllPacientes(pacientes_ids);

                if (res.length <= 0) {
                    return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
                }

                return res;
            } catch (error) {
                return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
                // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
            }
        }
        return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];

    }
    //Funccion que se encarga de buscar los pacientes de un usuario especifico.

    async getAllPacientes(ids = []) {
        if (!ids) return [{ 'success': false, 'error': 'Acceso Denegado.', 'status': 400 }];

        const pacientes_columns = [
            'id',
            'nombre',
            'apellido',
            'fecha_nacimiento',
            'documento_identidad',
            'sexo',
            'correo',
            'direccion',
            'telefono',
            'tipo_sangre',
            'padecimientos',
            'alergias',
            'familiares_id',
            'eliminado',
        ];
        const pacientes = [];

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            try {
                const query = new Builder('pacientes');
                const [results, fields] = await DB.execute(query.select_query(pacientes_columns, 'id'), [id]);
                pacientes.push(...results);
            } catch (error) {
                return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
                // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
            }
        }
        return pacientes;
    }
    //Funccion que se encarga de buscar las transacciones de un usuario especifico.

    async transacciones() {
        if (!this.member_id) return [{ 'success': false, 'error': 'Acceso Denegado.', 'status': 400 }];

        const columns = [
            'productos_id',
            'usuarios_id',
            'monto',
            'metodo_pago',
            'descripcion',
        ];

        try {
            const query = new Builder('transacciones');
            const [results, fields] = await DB.execute(query.select_query(columns, 'usuarios_id'), [this.member_id]);
            if (results.length <= 0) {
                return [{ 'success': false, 'error': 'No Existe Registros.', 'status': 404 }];
            }
            return results;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }
    }
}

module.exports = Usuario;