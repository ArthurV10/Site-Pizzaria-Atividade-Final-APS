// frontend/src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/pedidos')}>Listar Pedidos</button>
      <button onClick={() => navigate('/pizzas')}>Listar Pizzas</button>
      <button onClick={() => navigate('/atendentes')}>Listar Atendentes</button>
      <button onClick={() => navigate('/cadastro-cliente')}>Cadastrar Cliente</button>
      <button onClick={() => navigate('/cadastro-pizza')}>Cadastrar Pizza</button>
      <button onClick={() => navigate('/registro-pedido')}>Registrar Pedido</button>
    </div>
  );
};

export default Dashboard;
