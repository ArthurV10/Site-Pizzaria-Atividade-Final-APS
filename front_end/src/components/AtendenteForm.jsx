import React, { useState } from 'react';
import { cadastrarAtendente } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AtendenteForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atendente = { nome, email, senha };
    try {
      await cadastrarAtendente(atendente);
      alert('Atendente cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
      setMensagemErro('');
      navigate('/dashboard'); // Redireciona para o Dashboard após cadastro
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMensagemErro(error.response.data.erro);
      } else {
        setMensagemErro('Erro ao cadastrar atendente.');
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Atendente</h2>
        {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>
        <div className="button-container">
          <button type="submit">Cadastrar</button>
          <button type="button" className="secondary" onClick={handleBackToHome}>Retornar ao Home</button>
        </div>
      </form>
    </div>
  );
};

export default AtendenteForm;
