const express = require('express');
const app = express();
app.use(express.json());

// "Banco de dados" em memória
let users = [];
let nextId = 1;

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  // (Regra opcional: garantir email único)
  const emailExists = users.some(u => u.email === email);
  if (emailExists) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  // Cria usuário e adiciona ao array
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  return res.status(201).json(newUser);
});

// Rota para obter detalhes de um usuário por ID
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json(user);
});

// Rota para atualizar um usuário por ID
app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  // (Regra opcional: evitar email duplicado ao atualizar)
  const emailExists = users.some(u => u.email === email && u.id !== id);
  if (emailExists) {
    return res.status(400).json({ error: 'Email already registered by another user' });
  }
  // Atualiza e retorna o usuário
  user.name = name;
  user.email = email;
  return res.json(user);
});

// Rota para deletar um usuário por ID
app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  // Remove o usuário do array
  users.splice(index, 1);
  return res.status(204).send(); // 204 No Content
});

// Exporta o app para poder ser usado nos testes
module.exports = { app, users, resetUsers: () => { users = []; nextId = 1; } };