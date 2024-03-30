const axios = require('axios');
const express = require('express');
const app = require('../Routes/__test__casos')
const { closeServer } = require('../Routes/__test__casos');
const PORT = 3002;


afterAll(() => {
    closeServer()
});

describe('Test de la API con Axios', () => {
    it('Debería retornar un caso específico cuando se hace una solicitud GET con un ID válido', async () => {
        const response = await axios.get(`http://localhost:${PORT}/__test__casos/1`);

        expect(response.status).toBe(200);
        expect(response.data.id).toBe("1");
        expect(response.data.descripcion).toBe('Caso de prueba');
        expect(response.data.paciente).toBe('Paciente de prueba');
    });

    it('Debería retornar un error 400 cuando se hace una solicitud GET con un ID inválido', async () => {
        try {
            const response = await axios.get(`http://localhost:${PORT}/__test__casos/abc`);
        
            expect(true).toBe(false);
        } catch (error) {
            expect(error.isAxiosError).toBe(true);
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("Numero de Identificacion Invalido. para campo de ' id '");
        }
    });
});