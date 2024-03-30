const axios = require('axios');
const express = require('express');
const __isLoggedIn = require('../Middlewares/__test__isLoggedIn'); // Suponiendo que el middleware se encuentra en un archivo isAuthUser.js

const app = express();

describe('isAuthUser middleware', () => {
    it('Debe retornar 401 si no esta logueado', async () => {
        expect(__isLoggedIn(1)).toBe("307")
    });

    it('Deberia pasar si el usuario esta autenticado', async () => {
        expect(__isLoggedIn(3)).toBe("200")
    });
});