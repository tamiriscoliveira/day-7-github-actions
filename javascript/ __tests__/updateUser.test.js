const request = require('supertest');
const { app, resetUsers } = require('../app');

beforeEach(() => {
  resetUsers();
});

test('Deve atualizar os dados de um usuário existente (200 OK)', async () => {
  // Cria um usuário inicialmente
  const originalUser = { name: 'Posuidao', email: 'posuidao@linuxtips.io' };
  const createRes = await request(app).post('/users').send(originalUser);
  expect(createRes.status).toBe(201);
  const userId = createRes.body.id;

  // Atualiza o usuário
  const updatedData = { name: 'P0ssuidao', email: 'p0ssuidao@linuxtips.io' };
  const updateRes = await request(app).put(`/users/${userId}`).send(updatedData);
  expect(updateRes.status).toBe(200);
  expect(updateRes.body).toHaveProperty('id', userId);
  expect(updateRes.body.name).toBe(updatedData.name);
  expect(updateRes.body.email).toBe(updatedData.email);
});