const request = require('supertest');
const { app, resetUsers } = require('../app');

beforeEach(() => {
  resetUsers();
});

test('Deve obter um usuário existente pelo ID (200 OK)', async () => {
  // Cria um usuário primeiro
  const newUser = { name: 'Gomex', email: 'gomex@linuxtips.io' };
  const createRes = await request(app).post('/users').send(newUser);
  expect(createRes.status).toBe(201);
  const createdId = createRes.body.id;

  // Buscar o usuário pelo ID
  const getRes = await request(app).get(`/users/${createdId}`);
  expect(getRes.status).toBe(200);
  expect(getRes.body).toHaveProperty('id', createdId);
  expect(getRes.body.name).toBe(newUser.name);
  expect(getRes.body.email).toBe(newUser.email);
});