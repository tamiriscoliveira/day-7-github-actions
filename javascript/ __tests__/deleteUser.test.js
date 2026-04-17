const request = require('supertest');
const { app, resetUsers } = require('../app');

beforeEach(() => {
  resetUsers();
});

test('Deve deletar um usuário existente (204 No Content) e retornar 404 ao buscar em seguida', async () => {
  // Cria um usuário
  const newUser = { name: 'Fabio', email: 'fabio@linuxtips.io' };
  const createRes = await request(app).post('/users').send(newUser);
  expect(createRes.status).toBe(201);
  const userId = createRes.body.id;

  // Deleta o usuário
  const deleteRes = await request(app).delete(`/users/${userId}`);
  expect(deleteRes.status).toBe(204);

  // Tenta buscar o usuário deletado
  const getRes = await request(app).get(`/users/${userId}`);
  expect(getRes.status).toBe(404);
  expect(getRes.body).toHaveProperty('error');
});