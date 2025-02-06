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
import LoginAtendente from './components/LoginAtendente'; // Adicionando a importação do componente de login

function meLevePraEsseCaminho(path)  {
  window.location.href = path;
}

const Home = () => (
  <div>
    <h2>Bem-vindo ao Sistema de Pizzaria</h2>
    <p>Escolha uma das opções acima para começar.</p>
    
  </div>
);

function App() {
  return (
    <Router>
      <div>
        <h1>Sistema de Pizzaria</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-atendente" element={<LoginAtendente />} /> {/* Adicionando a rota para login */}
          <Route path="/cadastro-atendente" element={<AtendenteForm />} />
          <Route path="/cadastro-cliente" element={<ClienteForm />} />
          <Route path="/registro-pedido" element={<PedidoForm />} />
          <Route path="/cadastro-pizza" element={<PizzaForm />} />
          <Route path="/atendentes" element={<ListaAtendentes />} />
          <Route path="/pedidos" element={<ListaPedidos />} />
          <Route path="/pizzas" element={<ListaPizzas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
