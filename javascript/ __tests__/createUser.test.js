const request = require('supertest');
const { app, resetUsers } = require('../app');

beforeEach(() => {
  resetUsers();
});

test('Deve criar um novo usuário com sucesso (201 Created)', async () => {
  const newUser = { name: 'Jeferson', email: 'jeferson@linuxtips.io' };
  const response = await request(app)
    .post('/users')
    .send(newUser);
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('id');
  expect(response.body.name).toBe(newUser.name);
  expect(response.body.email).toBe(newUser.email);
});