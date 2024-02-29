const Model = require("./Model");
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');
const EventEmitter = require('node:events');

class Paciente extends Model {
    constructor() {
        super('pacientes');
        this.columns = [
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
    }
    async insert(data = null) {
        if (!data) return [{ 'success': false, 'error': 'Campos Obligatorios.', 'status': 400 }];

        try {
            this.data = data;
            this.values = [
                this.data.nombre,
                this.data.apellido,
                this.data.fecha_nacimiento,
                this.data.documento_identidad || 'X-XXXXXXXXXX-XXX',
                this.data.sexo || null,
                this.data.correo,
                this.data.direccion || null,
                this.data.telefono || null,
                this.data.tipo_sangre || null,
                this.data.padecimientos || null,
                this.data.alergias || null,
                this.data.familiares_id || null,
                this.data.eliminado || false,
            ];
            const query = new Builder(this.table);
            const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
            return results;
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
                this.data.nombre,
                this.data.apellido,
                this.data.fecha_nacimiento,
                this.data.documento_identidad || 'X-XXXXXXXXXX-XXX',
                this.data.sexo || null,
                this.data.correo,
                this.data.direccion || null,
                this.data.telefono || null,
                this.data.tipo_sangre || null,
                this.data.padecimientos || null,
                this.data.alergias || null,
                this.data.familiares_id || null,
                this.data.eliminado || false,
            ];
            const query = new Builder(this.table);
            const [results, fields] = await DB.execute(query.update_query(this.columns, this.values, id), this.values)
            return results;
        } catch (error) {
            return [{ 'success': false, 'error': `${error}`, 'status': 500 }];
            // return [{ 'success': false, 'error': 'Campos Obligatorios o Invalidos.' }];
        }

    }
}

module.exports = Paciente;