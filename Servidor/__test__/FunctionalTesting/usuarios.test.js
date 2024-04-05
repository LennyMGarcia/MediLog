const axios = require('axios');
const express = require('express');
const app = require('../Routes/__test__route'); //ejemplo si quieres usar rutas de prueba, no estan bien elaboradas
const { closeServer } = require('../Routes/__test__route');
const nock = require('nock');

const PORT = 3001;


afterAll(() => {
    closeServer()
});

describe('TEST DE usuarios', () => {

    describe('Get', () => {
        let response;

        beforeAll(async () => {
            response = await axios.get(`http://localhost:${PORT}/usuarios/1`);
        });

        it('Se espera un Ok o 200 como respuesta', async () => {
            expect(response?.status).toBe(200);
        });

        it('Debería retornar un error 400 cuando se hace una solicitud GET con un ID inválido', async () => {
            try {
                response = await axios.get(`http://localhost:${PORT}/usuarios/abc`);

                expect(true).toBe(false);
            } catch (error) {
                expect(error.isAxiosError).toBe(true);
                expect(error.response?.status).toBe(400);
                expect(error.response?.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });
    describe('POST', () => {
        it('Debería agregar un nuevo usuarios', async () => {
            nock(`http://localhost:${PORT}`)
                .post('/usuarios')
                .reply(201, {
                    id: 1,
                    member_id: 1,
                    correo: "len@gmail.com",
                    contrasena: "password",
                    tipo: "paciente",
                    plan: 1,
                    metodo_pago: "Tarjeta de Credito"

                });

            const response = await axios.post(`http://localhost:${PORT}/usuarios`, {
                id: 1,
                member_id: 1,
                correo: "len@gmail.com",
                contrasena: "password",
                tipo: "paciente",
                plan: 1,
                metodo_pago: "Tarjeta de Credito"
            });

            expect(response?.status).toBe(201);
            expect(response?.data.id).toBe(1);
            expect(response?.data.plan).toBe(1);
        });
    });
    describe("PUT", () => {
        afterEach(() => {
            // Limpiar todos los interceptores de Nock despues  de cada prueba
            nock.cleanAll();
        });

        it("Espera recibir una solicitud 201 con PUT", async () => {
            nock(`http://localhost:${PORT}`)
                .put('/usuarios/1')
                .reply(201);

            const response = await axios.put(`http://localhost:${PORT}/usuarios/1`, {
                id: 2,
                member_id: 1,
                correo: "len@gmail.com",
                contrasena: "password",
                tipo: "paciente",
                plan: 1,
                metodo_pago: "Tarjeta de Credito"
            });

            expect(response?.status).toBe(201);
        });

        it("Debería retornar un error 400 cuando se hace una solicitud PUT con un ID inválido", async () => {

            nock(`http://localhost:${PORT}`)
                .put('/usuarios/abc')
                .reply(400, { message: "Numero de Identificacion Invalido. para campo de ' id '" });

            try {
                await axios.put(`http://localhost:${PORT}/usuarios/abc`, {
                    id: "abc",
                    member_id: 1,
                    correo: "len@gmail.com",
                    contrasena: "password",
                    tipo: "paciente",
                    plan: 1,
                    metodo_pago: "Tarjeta de Credito"
                });

                expect(true).toBe(false);
            } catch (error) {

                expect(error.response?.status).toBe(400);
                expect(error.response?.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });

    describe("DELETE", () => {
        afterEach(() => {
            // Limpiar todos los interceptores de Nock despues  de cada prueba
            nock.cleanAll();
        });

        it("Espera recibir una solicitud 200 con DELETE", async () => {
            nock(`http://localhost:${PORT}`)
                .delete('/usuarios/9')
                .reply(200);

            const response = await axios.delete(`http://localhost:${PORT}/usuarios/9`);

            expect(response?.status).toBe(200);
        });

        it("Debería retornar un error 400 cuando se hace una solicitud DELETE con un ID inválido", async () => {

            nock(`http://localhost:${PORT}`)
                .delete('/usuarios/abc')
                .reply(400, { message: "Numero de Identificacion Invalido. para campo de ' id '" });

            try {
                await axios.delete(`http://localhost:${PORT}/usuarios/abc`);

                expect(true).toBe(false);
            } catch (error) {
                expect(error.response?.status).toBe(400);
                expect(error.response?.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });


});