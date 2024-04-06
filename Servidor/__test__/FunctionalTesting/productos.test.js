const axios = require('axios');
const express = require('express');
const app = require('../Routes/__test__route'); //ejemplo si quieres usar rutas de prueba, no estan bien elaboradas
const { closeServer } = require('../Routes/__test__route');
const nock = require('nock');

const PORT = 3001;


afterAll(() => {
    closeServer()
});

describe('TEST DE PRODUCTOS', () => {

    describe('Get', () => {
        let response;

        beforeAll(async () => {
            response = await axios.get(`http://localhost:${PORT}/productos/1`);
        });

        it('Se espera un Ok o 200 como respuesta', async () => {
            expect(response?.status).toBe(200);
        });
        it('el ID debe ser 1', async () => {
            expect(response?.data.id).toBe(1);
        });
        it('Se espera que el numbre sea Basico', async () => {
            expect(response?.data.nombre).toBe('Basico');
        });
        it('Se espera que la categoria sea Paciente', async () => {
            expect(response?.data.categoria).toBe('Paciente');
        });
        it('Se espera que el precio sea 0', async () => {
            expect(response?.data.precio).toBe(0);
        });


        it('Debería retornar un error 400 cuando se hace una solicitud GET con un ID inválido', async () => {
            try {
                response = await axios.get(`http://localhost:${PORT}/productos/abc`);

                expect(true).toBe(false);
            } catch (error) {
                expect(error.isAxiosError).toBe(true);
                expect(error.response?.status).toBe(400);
                expect(error.response?.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });
    describe('POST', () => {
        it('Debería agregar un nuevo producto', async () => {
            nock(`http://localhost:${PORT}`)
                .post('/productos')
                .reply(201, {
                    id: 2,
                    nombre: 'Basico',
                    paciente: 'Fulano Detal',
                    precio: 0,
                    categoria: 'Paciente',

                });

            const response = await axios.post(`http://localhost:${PORT}/productos`, {
                id: 2,
                nombre: 'Basico',
                paciente: 'Fulano Detal',
                precio: 0,
                categoria: 'Paciente',
            });

            expect(response?.status).toBe(201);
            expect(response?.data.id).toBe(2);
            expect(response?.data.precio).toBe(0);
        });
    });
    describe("PUT", () => {
        afterEach(() => {
            // Limpiar todos los interceptores de Nock despues  de cada prueba
            nock.cleanAll();
        });

        it("Espera recibir una solicitud 201 con PUT", async () => {
            nock(`http://localhost:${PORT}`)
                .put('/productos/1')
                .reply(201);

            const response = await axios.put(`http://localhost:${PORT}/productos/1`, {
                id: 1,
                nombre: 'Basico',
                paciente: 'Fulano Detal',
                precio: 0,
                categoria: 'Paciente',
            });

            expect(response?.status).toBe(201);
        });

        it("Debería retornar un error 400 cuando se hace una solicitud PUT con un ID inválido", async () => {

            nock(`http://localhost:${PORT}`)
                .put('/productos/abc')
                .reply(400, { message: "Numero de Identificacion Invalido. para campo de ' id '" });

            try {
                await axios.put(`http://localhost:${PORT}/productos/abc`, {
                    id: "abc",
                    nombre: 'Basico',
                    paciente: 'Fulano Detal',
                    precio: 0,
                    categoria: 'Paciente',
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
                .delete('/productos/9')
                .reply(200);

            const response = await axios.delete(`http://localhost:${PORT}/productos/9`);

            expect(response?.status).toBe(200);
        });

        it("Debería retornar un error 400 cuando se hace una solicitud DELETE con un ID inválido", async () => {

            nock(`http://localhost:${PORT}`)
                .delete('/productos/abc')
                .reply(400, { message: "Numero de Identificacion Invalido. para campo de ' id '" });

            try {
                await axios.delete(`http://localhost:${PORT}/productos/abc`);

                expect(true).toBe(false);
            } catch (error) {
                expect(error.response?.status).toBe(400);
                expect(error.response?.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });


});