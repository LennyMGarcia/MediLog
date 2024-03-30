const axios = require('axios');
const express = require('express');
const __isAuthUser = require('../Middlewares/__test__isAuthUser'); // Suponiendo que el middleware se encuentra en un archivo isAuthUser.js

const app = express();

describe('isAuthUser middleware', () => {
    it('Debe retornar 401 si no esta logueado', async () => {
        expect(__isAuthUser(2)).toBe("401")
    });

    it('Deberia pasar si el usuario esta logueado', async () => {
        expect(__isAuthUser(1)).toBe("200")
    });
});
