const axios = require('axios');
const express = require('express');
const app = require('../Routes/__test__casos')
const { closeServer } = require('../Routes/__test__casos');
const PORT = 3002;


afterAll(() => {
    closeServer()
});

describe('TEST DE CASOS', () => {

    describe('Get', () => {
        let response;

        beforeAll(async () => {
            response = await axios.get(`http://localhost:${PORT}/__test__casos/1`);
        });



        it('Se espera un Ok o 200 como respuesta', async () => {
            expect(response.status).toBe(200);
        });
        it('el ID debe ser 1', async () => {
            expect(response.data.id).toBe("1");
        });
        it('Se espera que la descripcion sea Caso de Prueba', async () => {
            expect(response.data.descripcion).toBe('Caso de prueba');
        });
        it('Se espera que la descripcion sea paciente de prueba', async () => {
            expect(response.data.paciente).toBe('Paciente de prueba');
        });
        it('Se espera que el estado sea Activo', async () => {
            expect(response.data.estado).toBe('Activo');
        });
        it('Se espera que el ID del paciente sea 1', async () => {
            expect(response.data.pacientes_id).toBe(1);
        });
        it('Se espera que el ID del especialista sea 2', async () => {
            expect(response.data.especialistas_id).toBe(2);
        });
        it('Se espera que la categoria sea Categoria de prueba', async () => {
            expect(response.data.categoria).toBe('Categoria de prueba');
        });
        it('Se espera que la el seguimiento sea Seguimiento de prueba', async () => {
            expect(response.data.seguimiento).toBe('Seguimiento de prueba');
        });
        it('Debería retornar un error 400 cuando se hace una solicitud GET con un ID inválido', async () => {
            try {
                response = await axios.get(`http://localhost:${PORT}/__test__casos/abc`);

                expect(true).toBe(false);
            } catch (error) {
                expect(error.isAxiosError).toBe(true);
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });
    describe("POST", () => {
        let response;

        beforeAll(async () => {
            try {
                response = await axios.post(`http://localhost:${PORT}/__test__casos`, {
                    descripcion: 'Caso de prueba',
                    paciente: 'Paciente de prueba',
                    pacientes_id: 1,
                    especialistas_id: 2,
                    estado: 'Activo',
                    categoria: 'Categoria de prueba',
                    seguimiento: 'Seguimiento de prueba',
                }, { timeout: 5000 });
            } catch (error) {
                console.error("Error al realizar la solicitud POST:", error);
                throw error;
            }
        });

        it("Espera recibir una solicitud 201 con POST", async () => {
            expect(response.status).toBe(201);
        });
    });
    describe("PUT", () => {

        let response;

        it("Espera recibir una solicitud 200 con PUT", async () => {
            try {
                response = await axios.put(`http://localhost:${PORT}/__test__casos/1`, {
                    id:1,
                    descripcion: 'Caso de prueba',
                    paciente: 'Paciente de prueba',
                    pacientes_id: 1,
                    especialistas_id: 2,
                    estado: 'Activo',
                    categoria: 'Categoria de prueba',
                    seguimiento: 'Seguimiento de prueba',
                }, { timeout: 5000 });

                expect(response.status).toBe(200);

            } catch (error) {
                console.error("Error al realizar la solicitud POST:", error);
                throw error;
            }
        });

        it("Debería retornar un error 400 cuando se hace una solicitud PUT con un ID inválida", async () => {
            try {
                response = await axios.put(`http://localhost:${PORT}/__test__casos/abc`, {
                    id:"abc",
                    descripcion: 'Caso de prueba',
                    paciente: 'Paciente de prueba',
                    pacientes_id: 1,
                    especialistas_id: 2,
                    estado: 'Activo',
                    categoria: 'Categoria de prueba',
                    seguimiento: 'Seguimiento de prueba',
                }, { timeout: 5000 });

                expect(true).toBe(false);

            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }

        });
    });

    describe("DELETE", () => {

        let response;

        it("Espera recibir una solicitud 200 con DELETE", async () => {
            try {
                response = await axios.delete(`http://localhost:${PORT}/__test__casos/1`, {
                    id:1,
                    descripcion: 'Caso de prueba',
                    paciente: 'Paciente de prueba',
                    pacientes_id: 1,
                    especialistas_id: 2,
                    estado: 'Activo',
                    categoria: 'Categoria de prueba',
                    seguimiento: 'Seguimiento de prueba',
                }, { timeout: 5000 });

                expect(response.status).toBe(200);

            } catch (error) {
                console.error("Error al realizar la solicitud POST:", error);
                throw error;
            }
        });

        it("Debería retornar un error 400 cuando se hace una solicitud DELETE con un ID inválida", async () => {
            try {
                response = await axios.delete(`http://localhost:${PORT}/__test__casos/abc`, {
                    id:"abc",
                    descripcion: 'Caso de prueba',
                    paciente: 'Paciente de prueba',
                    pacientes_id: 1,
                    especialistas_id: 2,
                    estado: 'Activo',
                    categoria: 'Categoria de prueba',
                    seguimiento: 'Seguimiento de prueba',
                }, { timeout: 5000 });

                expect(true).toBe(false);

            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }

        });
    });
});