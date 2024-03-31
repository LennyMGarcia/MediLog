const axios = require('axios');
const express = require('express');
const app = require('../Routes/__test__casos'); //ejemplo si quieres usar rutas de prueba, no estan bien elaboradas
const { closeServer } = require('../Routes/__test__casos');
const nock = require('nock');

const PORT = 3001;


afterAll(() => {
    closeServer()
});

describe('TEST DE CIRUGIAS', () => {

    describe('Get', () => {
        let response;

        beforeAll(async () => {
            response = await axios.get(`http://localhost:${PORT}/cirugias/1`);
        });

        it('Se espera un Ok o 200 como respuesta', async () => {
            expect(response.status).toBe(200);
        });
        it('el ID debe ser 9', async () => {
            expect(response.data.id).toBe(1);
        });
        it('Se espera que la observaciones sea Se Detecto una anomalia causada por otras condiciones medicas', async () => {
            expect(response.data.observaciones).toBe('Se Detecto una anomalia causada por otras condiciones medicas');
        });
        it('Se espera que el paciente sea Fulano Detal', async () => {
            expect(response.data.paciente).toBe('Fulano Detal');
        });
        it('Se espera que el resultado sea Exito', async () => {
            expect(response.data.resultado).toBe('Exito');
        });
        it('Se espera que el ID del paciente sea 1', async () => {
            expect(response.data.pacientes_id).toBe(1);
        });
        it('Se espera que el ID del especialista sea 60', async () => {
            expect(response.data.especialistas_id).toBe(60);
        });
        it('Se espera que la categoria sea Estetica', async () => {
            expect(response.data.categoria).toBe('Estetica');
        });
        it('Se espera que la el motivo sea Cirugia estetica', async () => {
            expect(response.data.motivo).toBe('Cirugia Estetica');
        });
        it('Debería retornar un error 400 cuando se hace una solicitud GET con un ID inválido', async () => {
            try {
                response = await axios.get(`http://localhost:${PORT}/cirugias/abc`);

                expect(true).toBe(false);
            } catch (error) {
                expect(error.isAxiosError).toBe(true);
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe("Numero de Identificacion Invalido.");
            }
        });
    });
    describe('POST', () => {
        it('Debería agregar un nuevo caso', async () => {
            nock(`http://localhost:${PORT}`)
                .post('/cirugias')
                .reply(201, {
                    id: 2,
                    motivo: 'Cirugia estetica',
                    paciente: 'Fulano Detal',
                    pacientes_id: 1,
                    especialistas_id: 60,
                    resultado: 'Exito',
                    categoria: 'Estetica',
                });

            const response = await axios.post(`http://localhost:${PORT}/cirugias`, {
                id: 2,
                motivo: 'Cirugia estetica',
                paciente: 'Fulano Detal',
                pacientes_id: 1,
                especialistas_id: 60,
                resultado: 'Exito',
                categoria: 'Estetica',
            });

            expect(response.status).toBe(201);
            expect(response.data.id).toBe(2);
            expect(response.data.motivo).toBe('Cirugia estetica');
        });
    });
    describe("PUT", () => {
        afterEach(() => {
            // Limpiar todos los interceptores de Nock despues  de cada prueba
            nock.cleanAll();
        });

        it("Espera recibir una solicitud 200 con PUT", async () => {
            nock(`http://localhost:${PORT}`)
                .put('/cirugias/1')
                .reply(200);

            const response = await axios.put(`http://localhost:${PORT}/cirugias/1`, {
                id: 1,
                motivo: 'Cirugia estetica',
                paciente: 'Fulano Detal',
                pacientes_id: 1,
                especialistas_id: 60,
                resultado: 'Exito',
                categoria: 'Estetica',
            });

            expect(response.status).toBe(200);
        });

        it("Debería retornar un error 400 cuando se hace una solicitud PUT con un ID inválido", async () => {

            nock(`http://localhost:${PORT}`)
                .put('/cirugias/abc')
                .reply(400, { message: "Numero de Identificacion Invalido. para campo de ' id '" });

            try {
                await axios.put(`http://localhost:${PORT}/cirugias/abc`, {
                    id: "abc",
                    motivo: 'Cirugia estetica',
                    paciente: 'Fulano Detal',
                    pacientes_id: 1,
                    especialistas_id: 60,
                    resultado: 'Exito',
                    categoria: 'Estetica',
                });

                expect(true).toBe(false);
            } catch (error) {

                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
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
                .delete('/casos/9')
                .reply(200);
    
            const response = await axios.delete(`http://localhost:${PORT}/casos/9`);

            expect(response.status).toBe(200);
        });
    
        it("Debería retornar un error 400 cuando se hace una solicitud DELETE con un ID inválido", async () => {

            nock(`http://localhost:${PORT}`)
                .delete('/cirugias/abc')
                .reply(400, { message: "Numero de Identificacion Invalido. para campo de ' id '" });
    
            try {
                await axios.delete(`http://localhost:${PORT}/cirugias/abc`);
                
                expect(true).toBe(false);
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });
});