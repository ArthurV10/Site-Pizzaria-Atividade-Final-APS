import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Certifique-se de importar o CSS

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login-atendente');
  };

  const handleCadastro = () => {
    navigate('/cadastro-atendente');
  };

  return (
    <div className="home-container">
      <h2>Bem-vindo ao Sistema de Pizzaria</h2>
      <div className="button-container">
        <button onClick={handleLogin}>Login de Atendente</button>
        <button onClick={handleCadastro}>Cadastro de Atendente</button>
      </div>
    </div>
  );
};

export default HomePage;
