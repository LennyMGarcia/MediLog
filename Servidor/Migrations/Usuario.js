const Model = require("./Model");
const DB = require('../Utils/db_connect');

class Usuario extends Model {
    constructor() {
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
            // 'fecha'
        ];
    }
    async insert(data = {}) {
        this.data = data;
        this.values = [
            this.data.member_id,
            this.data.correo,
            this.data.contrasena,
            this.data.tipo || 'Paciente',
            this.data.plan || 'NULL',
            this.data.metodo_pago || 'NULL',
            this.data.datos_financieros || 'NULL',
            this.data.cvv || 'NULL',
            this.data.fecha_expiracion || 'NULL',
            this.data.eliminado || false,
            //this.data.fecha || '2024-05-05'
        ];
        const query = new Builder(this.table);
        const [results, fields] = await DB.execute(query.insert_query(this.columns, this.values), this.values);
    }
}

module.exports = Usuario;