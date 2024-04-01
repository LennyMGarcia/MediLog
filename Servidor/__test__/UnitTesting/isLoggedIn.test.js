const axios = require('axios');
const express = require('express');
const isLoggedIn = require('../../Middlewares/isLoggedIn');

describe('isLoggedIn middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });

    it('deberia llamar a next() si no hay un usuario en el cuerpo de la solicitud', () => {
        isLoggedIn(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('deberia devolver un código de estado 307 y un mensaje de redireccion si hay un usuario en el cuerpo de la solicitud', () => {
        req.body.user = { id: 123 };
        isLoggedIn(req, res, next);
        expect(res.status).toHaveBeenCalledWith(307);
        expect(res.json).toHaveBeenCalledWith({ message: 'Accesso Denegado.', redirectTo: '/' });
    });
});
