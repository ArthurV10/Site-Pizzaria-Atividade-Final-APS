import React, { useState } from 'react';
import { loginAtendente } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Importar o CSS para estilizar o botão

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

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
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
        <div className="button-container">
          <button type="submit">Login</button>
          <button type="button" className="secondary" onClick={handleBackToHome}>Retornar ao Home</button>
        </div>
      </form>
    </div>
  );
};

export default AtendenteLoginForm;
