import axios from "axios";

class DatabaseManager {
    constructor(ruta, params, data) {
        this.ruta = ruta;
        this.params = params;
        this.data = data;
    }
    create() {
        const query = axios.post(this.ruta, this.data
            , {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(res => {
                console.log(res);
                return res;

            }).catch(error => {
                console.log(error);
                return error;

            })
    }
    get() {
        const query = axios.get(this.ruta
            , {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(res => {
                console.log(res);
                return res;

            }).catch(error => {
                console.log(error);
                return error;
            });
    }
    edit() {
        const query = axios.put(this.ruta, this.data
            , {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(res => {
                console.log(res);
                return res;

            }).catch(error => {
                console.log(error);
                return error;
            });
    }
    static new(ruta, params, data) {
        this.ruta = ruta;
        this.params = params;
        this.data = data;
    }
}

export default DatabaseManager;