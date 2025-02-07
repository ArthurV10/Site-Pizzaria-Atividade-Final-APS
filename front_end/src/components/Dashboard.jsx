import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Certifique-se de importar o CSS

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Menu Pizzaria</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/pedidos')}>Pedidos</button>
        <button onClick={() => navigate('/pizzas')}>Cardápio</button>
        <button onClick={() => navigate('/atendentes')}>Atendentes</button>
        <button onClick={() => navigate('/cadastro-cliente')}>Cadastrar Cliente</button>
        <button onClick={() => navigate('/cadastro-pizza')}>Cadastrar Pizza</button>
        <button onClick={() => navigate('/registro-pedido')}>Registrar Pedido</button>
      </div>
    </div>
  );
};

export default Dashboard;
