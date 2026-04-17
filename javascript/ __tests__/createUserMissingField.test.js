const request = require('supertest');
const { app, resetUsers } = require('../app');

beforeEach(() => {
  resetUsers();
});

test('Deve retornar erro 400 se nome ou email não for fornecido', async () => {
  const incompleteUser = { name: 'Bernardo' };
  const response = await request(app)
    .post('/users')
    .send(incompleteUser);
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty('error');
  expect(response.body.error).toMatch(/required/);
});