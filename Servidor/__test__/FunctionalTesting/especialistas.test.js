const axios = require('axios');
const express = require('express');
const app = require('../Routes/__test__route'); //ejemplo si quieres usar rutas de prueba, no estan bien elaboradas
const { closeServer } = require('../Routes/__test__route');
const nock = require('nock');

const PORT = 3001;


afterAll(() => {
    closeServer()
});

describe('TEST DE ESPECIALISTAS', () => {

    describe('Get', () => {
        let response;

        beforeAll(async () => {
            response = await axios.get(`http://localhost:${PORT}/especialistas/1`);
        });

        it('Se espera un Ok o 200 como respuesta', async () => {
            expect(response.status).toBe(200);
        });
        it('el ID debe ser 1', async () => {
            expect(response.data.id).toBe(1);
        });
        it('Se espera que el nombre sea Fulano', async () => {
            expect(response.data.nombre).toBe('Fulano');
        });
        it('Se espera que el apellido sea Detalie', async () => {
            expect(response.data.apellido).toBe('Detalie');
        });
        it('Se espera que el sexo sea F', async () => {
            expect(response.data.sexo).toBe("F");
        });
        it('Se espera que el correo sea testtes11t@gmail.com', async () => {
            expect(response.data.correo).toBe("testtes11t@gmail.com");
        });
        it('Se espera que la direccion sea Santo Domingo, RD', async () => {
            expect(response.data.direccion).toBe('Santo Domingo, RD');
        });

        it('Se espera que el telefono', async () => {
            expect(response.data.telefono).toBe('8523697412');
        });
        it('Se espera que el especialidad sea Psicologo', async () => {
            expect(response.data.especialidad).toBe('Psicologo');
        });
        it('Se espera que el metodo de pago sea Tarjeta de Credito', async () => {
            expect(response.data.metodo_pago).toBe("Tarjeta de Credito");
        });
        it('Se espera que la descripcion sea Basico', async () => {
            expect(response.data.descripcion).toBe("Basico");
        });
        it('Se espera que el precio sea 0', async () => {
            expect(response.data.precio).toBe(0);
        });
        it('Debería retornar un error 400 cuando se hace una solicitud GET con un ID inválido', async () => {
            try {
                response = await axios.get(`http://localhost:${PORT}/especialistas/abc`);

                expect(true).toBe(false);
            } catch (error) {
                expect(error.isAxiosError).toBe(true);
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });
    describe('POST', () => {
        it('Deberia agregar un nuevo especialista', async () => {
            nock(`http://localhost:${PORT}`)
                .post('/especialistas')
                .reply(201, {
                    id: 2,
                    tipo: 'Especialista',
                    nombre: 'fulano',
                    apellido: 'Detal',
                    fecha_nacimiento: '2003-04-04T04:00:00.000Z',
                    sexo: 'M',
                    correo: 'fulano@gmail.com',
                    direccion:  'ninguna',
                    telefono: '8096357888',
                    especialidad: 'Psicologo',
                    metodo_pago: 'Tarjeta de Crédito',
                    datos_financieros:  null,
                    cvv: null,
                    fecha_expiracion:  '03-03-2030',
                    descripcion:  'Basico',
                    categoria:  'Paciente',
                    precio:  0
                });

            const response = await axios.post(`http://localhost:${PORT}/especialistas`, {
                id: 2,
                tipo: 'Especialista',
                nombre: 'fulano',
                apellido: 'Detal',
                fecha_nacimiento: '2003-04-04T04:00:00.000Z',
                sexo: 'M',
                correo: 'fulano@gmail.com',
                direccion:  'ninguna',
                telefono: '8096357888',
                especialidad: 'Psicologo',
                metodo_pago: 'Tarjeta de Crédito',
                datos_financieros:  null,
                cvv: null,
                fecha_expiracion:  '03-03-2030',
                descripcion:  'Basico',
                categoria:  'Paciente',
                precio:  0
            });

            expect(response.status).toBe(201);
            expect(response.data.id).toBe(2);
            expect(response.data.categoria).toBe('Paciente');
        });
    });
    describe("PUT", () => {
        afterEach(() => {
            // Limpiar todos los interceptores de Nock despues  de cada prueba
            nock.cleanAll();
        });

        it("Espera recibir una solicitud 200 con PUT", async () => {
            nock(`http://localhost:${PORT}`)
                .put('/especialistas/1')
                .reply(201);

            const response = await axios.put(`http://localhost:${PORT}/especialistas/1`, {
                id: 1,
                tipo: 'Especialista',
                nombre: 'fulano',
                apellido: 'Detal',
                fecha_nacimiento: '2003-04-04T04:00:00.000Z',
                sexo: 'M',
                correo: 'fulano@gmail.com',
                direccion:  'ninguna',
                telefono: '8096357888',
                especialidad: 'Psicologo',
                metodo_pago: 'Tarjeta de Crédito',
                datos_financieros:  null,
                cvv: null,
                fecha_expiracion:  '03-03-2030',
                descripcion:  'Basico',
                categoria:  'Paciente',
                precio:  0
            });

            expect(response.status).toBe(201);
        });

        it("Debería retornar un error 400 cuando se hace una solicitud PUT con un ID inválido", async () => {

            nock(`http://localhost:${PORT}`)
                .put('/especialistas/abc')
                .reply(400, { message: "Numero de Identificacion Invalido. para campo de ' id '" });

            try {
                await axios.put(`http://localhost:${PORT}/especialistas/abc`, {
                    id: "abc",
                    tipo: 'Especialista',
                    nombre: 'fulano',
                    apellido: 'Detal',
                    fecha_nacimiento: '2003-04-04T04:00:00.000Z',
                    sexo: 'M',
                    correo: 'fulano@gmail.com',
                    direccion:  'ninguna',
                    telefono: '8096357888',
                    especialidad: 'Psicologo',
                    metodo_pago: 'Tarjeta de Crédito',
                    datos_financieros:  null,
                    cvv: null,
                    fecha_expiracion:  '03-03-2030',
                    descripcion:  'Basico',
                    categoria:  'Paciente',
                    precio:  0
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
                .delete('/especialistas/1')
                .reply(200);
    
            const response = await axios.delete(`http://localhost:${PORT}/especialistas/1`);

            expect(response.status).toBe(200);
        });
    
        it("Debería retornar un error 400 cuando se hace una solicitud DELETE con un ID inválido", async () => {

            nock(`http://localhost:${PORT}`)
                .delete('/especialistas/abc')
                .reply(400, { message: "Numero de Identificacion Invalido. para campo de ' id '" });
    
            try {
                await axios.delete(`http://localhost:${PORT}/especialistas/abc`);
                
                expect(true).toBe(false);
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
            }
        });
    });
});