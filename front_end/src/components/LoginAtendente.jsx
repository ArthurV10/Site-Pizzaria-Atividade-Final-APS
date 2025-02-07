// frontend/src/components/LoginAtendente.jsx
import React, { useState } from 'react';
import { loginAtendente } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AtendenteLoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atendente = { email, senha };
    try {
      await loginAtendente(atendente);
      alert('Login realizado com sucesso!');
      setEmail('');
      setSenha('');
      setMensagemErro('');
      navigate('/dashboard'); // Redireciona para o Dashboard
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMensagemErro('Email ou senha incorretos.');
      } else {
        setMensagemErro('Erro ao realizar login.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login de Atendente</h2>
      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Senha:
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default AtendenteLoginForm;
