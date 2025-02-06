import React, { useState } from 'react';
import { loginAtendente } from '../services/api';

const AtendenteLoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atendente = { email, senha };
    try {
      await loginAtendente(atendente);
      alert('Login realizado com sucesso!');
      setEmail('');  // Corrigindo para setEmail
      setSenha('');  // Mantendo setSenha
      setMensagemErro('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMensagemErro('Email ou senha incorretos.');  // Define a mensagem de erro vinda do backend
      } else {
        setMensagemErro('Erro ao realizar login.');  // Mensagem genérica para outros erros
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login de Atendente</h2>
      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>} {/* Exibe a mensagem de erro */}
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />  {/* Pedindo email */}
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
