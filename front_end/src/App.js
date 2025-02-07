// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AtendenteForm from './components/AtendenteForm';
import ClienteForm from './components/ClienteForm';
import PedidoForm from './components/PedidoForm';
import PizzaForm from './components/PizzaForm';
import ListaAtendentes from './components/ListarAtendetes';
import ListaPedidos from './components/ListaPedidos';
import ListaPizzas from './components/ListaPizza';
import LoginAtendente from './components/LoginAtendente';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <h1>Pizzaria A.K</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login-atendente" element={<LoginAtendente />} />
          <Route path="/cadastro-atendente" element={<AtendenteForm />} />
          <Route path="/cadastro-cliente" element={<ClienteForm />} />
          <Route path="/registro-pedido" element={<PedidoForm />} />
          <Route path="/cadastro-pizza" element={<PizzaForm />} />
          <Route path="/atendentes" element={<ListaAtendentes />} />
          <Route path="/pedidos" element={<ListaPedidos />} />
          <Route path="/pizzas" element={<ListaPizzas />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
