const axios = require('axios');
const express = require('express');
const app = require('../Routes/__test__casos'); //ejemplo si quieres usar rutas de prueba, no estan bien elaboradas
const { closeServer } = require('../Routes/__test__casos');
const nock = require('nock');

const PORT = 3001;


afterAll(() => {
    closeServer()
});

describe('TEST DE INICIO', () => {

    describe('LOGIN', () => {
        describe('POST', () => {
            it('Debería mandar codigo 200 si se ha logueado correctamente', async () => {
                nock(`http://localhost:${PORT}`)
                    .post('/login', {
                        username: "lenny27@gmail.com",
                        password: "password"
                    })
                    .reply(200, { user: "lenny27@gmail.com", 'message': 'Conectado Exitosamente.' });

                const response = await axios.post(`http://localhost:${PORT}/login`, {
                    username: "lenny27@gmail.com",
                    password: "password",
                });

                expect(response.status).toBe(200);
            });

            it('Debería mandar codigo 404 si no hay coincidencias', async () => {
                nock(`http://localhost:${PORT}`)
                    .post('/login', {
                        username: "kkposting@gil.com",
                        password: "password"
                    })
                    .reply(404, { 'message': 'Usuario No Existe.' });

                try {
                    const response = await axios.post(`http://localhost:${PORT}/login`, {
                        username: "kkposting@gil.com",
                        password: "password",
                    });

                    throw new Error('La solicitud debería haber fallado con un código de estado 404');
                } catch (error) {

                    expect(error.isAxiosError).toBe(true);
                    expect(error.response.status).toBe(404);
                }
            });

            it('Debería mandar codigo 400 si hay un error en la solicitud', async () => {
                nock(`http://localhost:${PORT}`)
                    .post('/login', {
                        username: 0,
                        password: 0,
                    })
                    .reply(400, { 'message': `error - Por Favor, Verificar los datos introducidos.` });

                try {
                    const response = await axios.post(`http://localhost:${PORT}/login`, {
                        username: 0,
                        password: 0,
                    });

                    throw new Error('La solicitud debería haber fallado con un código de estado 400');
                } catch (error) {

                    expect(error.isAxiosError).toBe(true);
                    expect(error.response.status).toBe(400);
                }
            });

        });
    });

    describe('REGISTER', () => {
        describe('POST', () => {
            it('Debería mandar codigo 201 si se ha registrado correctamente', async () => {
                nock(`http://localhost:${PORT}`)
                    .post('/register', {
                        username: "lenny27@gmail.com",
                        password: "password",
                        tipo: "Paciente",
                        plan: 1,
                        cvv: null,
                        metodo_pago: "Tarjeta de credito",
                        datos_financieros: null,
                        fecha_expiracion: null,
                        fecha: "2024-03-23 17:45:23",
                    })
                    .reply(201, { user: "lenny27@gmail.com", 'message': 'Operacion Exitosa.' });

                const response = await axios.post(`http://localhost:${PORT}/register`, {
                    username: "lenny27@gmail.com",
                    password: "password",
                    tipo: "Paciente",
                    plan: 1,
                    cvv: null,
                    metodo_pago: "Tarjeta de credito",
                    datos_financieros: null,
                    fecha_expiracion: null,
                    fecha: "2024-03-23 17:45:23",
                });

                expect(response.status).toBe(201);
            });


            it('Debería mandar codigo 400 si hay un error en la solicitud', async () => {
                nock(`http://localhost:${PORT}`)
                    .post('/register', {
                        username: 0,
                        password: 0,
                        tipo: "Paciente",
                        plan: 0,
                        cvv: null,
                        metodo_pago: "Tarjeta de credito",
                        datos_financieros: null,
                        fecha_expiracion: null,
                        fecha: "2024-03-23 17:45:23",
                    })
                    .reply(400, { 'message': `error - Por Favor, Verificar los datos introducidos.` });

                try {
                    const response = await axios.post(`http://localhost:${PORT}/register`, {
                        username:0,
                        password: 0,
                        tipo: "Paciente",
                        plan: 0,
                        cvv: null,
                        metodo_pago: "Tarjeta de credito",
                        datos_financieros: null,
                        fecha_expiracion: null,
                        fecha: "2024-03-23 17:45:23",
                    });

                    throw new Error('La solicitud debería haber fallado con un código de estado 400');
                } catch (error) {

                    expect(error.isAxiosError).toBe(true);
                    expect(error.response.status).toBe(400);
                }
            });

        });
    });


});

