import { create } from 'zustand'

//State Management que se encarga del Inicio de Session de un usuario
//La Instancia del Usuario se almacena en el LocalStorage y se elimina cuando se cierra la session

const useUserStore = create((set: any) => ({
    user: null,
    authUser: (user: any) => set(() => {
        localStorage.setItem('user', JSON.stringify(user));
        return { user: user }
    }),
    getUser: () => {
        const query = JSON.parse(localStorage.getItem('user') || '{}');
        const user = query;
        return user;
    },
    authenticated: () => {
        const query = JSON.parse(localStorage.getItem('user') || '{}');
        const user = Object.keys(query);
        if (user.length !== 0) {
            return true;
        }
        return false;
    },
    logoutUser: () => set(() => {
        localStorage.removeItem('user');
        window.location.href = '/';
        return { user: null }
    })
}));

export default useUserStore;