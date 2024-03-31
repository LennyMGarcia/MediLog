const axios = require('axios');
const express = require('express');
const __isAuthUser = require('../Middlewares/__test__isAuthUser'); // Suponiendo que el middleware se encuentra en un archivo isAuthUser.js

const app = express();

const isAuthUser = require('../../Middlewares/isAuthUser');

describe('isAuthUser middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} }; //represent el request
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; //representa el res, el mockreturn es para hacer el status().json()
        next = jest.fn(); //Solo se simula lo creado y se adapta a ser validado
    });

    it('deberia llamar a next() si se proporciona un usuario en el cuerpo de la solicitud', () => {
        req.body.user = { id: 123 };
        isAuthUser(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('deberia devolver un codigo de estado 401 y un mensaje si no se proporciona un usuario en el cuerpo de la solicitud', () => {
        isAuthUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Accesso Denegado. PorFavor de Conectarse' });
    });
});

