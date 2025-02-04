// src/components/LoginAtendente.js
import React, { useState } from 'react';
import api from '../api';

const LoginAtendente = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username: email, password: senha });
      setMensagem(`Bem-vindo, ${response.data.username}!`);
      localStorage.setItem('token', response.data.access_token); // Salvar token no localStorage
    } catch (error) {
      setMensagem('Erro ao fazer login');
    }
  };

  return (
    <div>
      <h1>Login de Atendente</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default LoginAtendente;
