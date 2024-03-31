const axios = require('axios');
const express = require('express');
const app = require('../Routes/__test__casos'); //ejemplo si quieres usar rutas de prueba, no estan bien elaboradas
const { closeServer } = require('../Routes/__test__casos');
const nock = require('nock');

const PORT = 3001;


afterAll(() => {
    closeServer()
});

describe('TEST DE CASOS', () => {

    describe('Get', () => {
        let response;

        beforeAll(async () => {
            response = await axios.get(`http://localhost:${PORT}/casos/9`);
        });

        it('Se espera un Ok o 200 como respuesta', async () => {
            expect(response.status).toBe(200);
        });
        it('el ID debe ser 1', async () => {
            expect(response.data.id).toBe(9);
        });
        it('Se espera que la descripcion sea Dolores cronicos', async () => {
            expect(response.data.descripcion).toBe('Dolores Cronicos');
        });
        it('Se espera que la descripcion sea Fulano Detal', async () => {
            expect(response.data.paciente).toBe('Fulano Detal');
        });
        it('Se espera que el estado sea Activo', async () => {
            expect(response.data.estado).toBe('Activo');
        });
        it('Se espera que el ID del paciente sea 1', async () => {
            expect(response.data.pacientes_id).toBe(1);
        });
        it('Se espera que el ID del especialista sea 1', async () => {
            expect(response.data.especialistas_id).toBe("1");
        });
        it('Se espera que la categoria sea Dialisis', async () => {
            expect(response.data.categoria).toBe('Dialisis');
        });
        it('Se espera que la el seguimiento sea Citas en 3 meses', async () => {
            expect(response.data.seguimiento).toBe('Citas en 3 meses');
        });
        it('Debería retornar un error 400 cuando se hace una solicitud GET con un ID inválido', async () => {
            try {
                response = await axios.get(`http://localhost:${PORT}/casos/abc`);

                expect(true).toBe(false);
            } catch (error) {
                expect(error.isAxiosError).toBe(true);
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });
    describe('POST', () => {
        it('Debería agregar un nuevo caso', async () => {
            nock(`http://localhost:${PORT}`)
                .post('/casos')
                .reply(201, {
                    id: 1,
                    descripcion: 'Dolores cronicos',
                    paciente: 'Fulano Detal',
                    pacientes_id: 1,
                    especialistas_id: "1",
                    estado: 'Activo',
                    categoria: 'Dialisis',
                    seguimiento: 'Cita en 3 meses',
                });
    
            const response = await axios.post(`http://localhost:${PORT}/casos`, {
                descripcion: 'Dolores cronicos',
                paciente: 'Fulano Detal',
                pacientes_id: 1,
                especialistas_id: "1",
                estado: 'Activo',
                categoria: 'Dialisis',
                seguimiento: 'Cita en 3 meses',
            });
    
            expect(response.status).toBe(201);
            expect(response.data.id).toBe(1);
            expect(response.data.descripcion).toBe('Dolores cronicos');
        });
    });
    describe("PUT", () => {
        afterEach(() => {
            // Limpiar todos los interceptores de Nock despues  de cada prueba
            nock.cleanAll();
        });
    
        it("Espera recibir una solicitud 200 con PUT", async () => {
            nock(`http://localhost:${PORT}`)
                .put('/casos/9')
                .reply(200);
    
            const response = await axios.put(`http://localhost:${PORT}/casos/9`, {
                id:9,
                descripcion: 'Caso de prueba',
                paciente: 'Paciente de prueba',
                pacientes_id: 1,
                especialistas_id: "1",
                estado: 'Activo',
                categoria: 'Categoria de prueba',
                seguimiento: 'Seguimiento de prueba',
            });

            expect(response.status).toBe(200);
        });
    
        it("Debería retornar un error 400 cuando se hace una solicitud PUT con un ID inválido", async () => {

            nock(`http://localhost:${PORT}`)
                .put('/casos/abc')
                .reply(400, { message: "Numero de Identificacion Invalido. para campo de ' id '" });
    
            try {
                await axios.put(`http://localhost:${PORT}/casos/abc`, {
                    id:"abc",
                    descripcion: 'Caso de prueba',
                    paciente: 'Paciente de prueba',
                    pacientes_id: 1,
                    especialistas_id: 2,
                    estado: 'Activo',
                    categoria: 'Categoria de prueba',
                    seguimiento: 'Seguimiento de prueba',
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
                .delete('/casos/abc')
                .reply(400, { message: "Numero de Identificacion Invalido. para campo de ' id '" });
    
            try {
                await axios.delete(`http://localhost:${PORT}/casos/abc`);
                
                expect(true).toBe(false);
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });

    
});