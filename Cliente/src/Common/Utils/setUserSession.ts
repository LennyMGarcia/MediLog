import { create } from 'zustand'
import axios from 'axios';
import getBackendConnectionString from './getBackendString';

//State Management que se encarga del Inicio de Session de un usuario
//La Instancia del Usuario se almacena en el LocalStorage y se elimina cuando se cierra la session

const useUserStore = create((set: any, get: any) => ({
    user: {},
    casos: [],
    cirugias: [],
    consultas: [],
    familiares: [],
    transacciones: [],
    pacientes: [],
    pacientCases: [],
    paciente: [],
    loading: true,
    authUser: (user: any) => set(() => {
        localStorage.setItem('user', JSON.stringify(user));
        return { user: user }
    }),
    toggleLoading: (status: boolean) => set(() => {
        return { loading: status }
    }),
    getFamiliares: async (id: number) => {
        const result = axios.get(getBackendConnectionString(`pacientes/${id}`)).then((response) => {
            const data = response?.data?.casos_familiares
            if (response?.status === 200 || response?.status === 201) {
                set({ loading: false, familiares: data })
                return data;
            }
            return [];
        }).catch(error => {
            console.log(error);
            set({ loading: true })
            return [];
        })
        return result;
    },
    getPatientCases: async (id: number) => {
        const result = axios.get(getBackendConnectionString(`pacientes/${id}`)).then((response) => {
            const data = response?.data?.casos;
            if (response?.status === 200 || response?.status === 201) {
                set({ loading: false, pacientCases: data })
                return data;
            }
            return [];
        }).catch(error => {
            console.log(error);
            set({ loading: true })
            return [];
        })
        return result;
    },
    autopopulate: async () => {
        const query = JSON.parse(localStorage.getItem('user') || '{}');
        const id = query?.id;
        if (query?.tipo === "Paciente") {
            const result = await axios.get(getBackendConnectionString(`usuarios/${id}`)).then((response) => {
                const data = response?.data;
                if (response?.status === 200 || response?.status === 201) {
                    //    console.log(data);
                    return data;
                }
                set({ loading: true })
                return null;
            }).catch(error => {
                console.log(error);
                set({ loading: true })
                return null;

            })
            if (result) {
                set({ casos: result.casos, cirugias: result.cirugias, consultas: result.consultas, transacciones: result.transacciones, pacientes: result.pacientes })
                set({ loading: false })
                return result;
            }
            //  set({ casos: result.casos, cirugias: result.cirugias, consultas: result.consultas, transacciones: result.transacciones })
            set({ loading: true })
            return result;
        }
        const result = await axios.get(getBackendConnectionString(`usuarios/${id}`)).then((response) => {
            const data = response?.data;
            if (response?.status === 200 || response?.status === 201) {
                //   console.log(data);
                return data;
            }
            set({ loading: true })
            return null;
        }).catch(error => {
            console.log(error);
            set({ loading: true })
            return null;

        })
        if (result) {
            set({ casos: result.casos, cirugias: result.cirugias, consultas: result.consultas, transacciones: result.transacciones, pacientes: result.pacientes })
            set({ loading: false })
            return result;
        }
        // set({ casos: result.casos, cirugias: result.cirugias, consultas: result.consultas, transacciones: result.transacciones, pacientes: result.pacientes })
        set({ loading: true })
        return result;
    },
    authenticated: () => {
        const query = JSON.parse(localStorage.getItem('user') || '{}');
        const user = Object.keys(query);
        if (user.length !== 0) {
            return true;
        }
        return false;
    },
    updateUser: (product: any) => set(() => {
        const query = JSON.parse(localStorage.getItem('user') || '{}');
        query.plan = product;
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(query));
        return { user: query }

    }),
    getUser: () => {
        const query = JSON.parse(localStorage.getItem('user') || '{}');
        const user = query;
        return user;
    },

    getUserData: async (id: number, dataType: string) => {
        const query = JSON.parse(localStorage.getItem('user') || '{}');
        if (query?.tipo === "Paciente") {
            const result = await axios.get(getBackendConnectionString(`usuarios/${id}`)).then((response) => {
                const data = response?.data;
                if (response?.status === 200 || response?.status === 201) {
                    return data;
                }
                return null;
            }).catch(error => {
                console.log(error);
            })
            return result;
        }
        const result = await axios.get(getBackendConnectionString(`usuarios/${id}`)).then((response) => {
            const data = response?.data;
            if (response?.status === 200 || response?.status === 201) {
                return data;
            }
            return null;
        }).catch(error => {
            console.log(error);
        })
        console.log(result);

        return result;
    },

    logoutUser: () => set(() => {
        localStorage.removeItem('user');
        return { user: null }
    })
}));

export default useUserStore;