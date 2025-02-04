// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroCliente from './components/CadastroCliente';
import LoginAtendente from './components/LoginAtendente';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Pizzaria - Sistema de Atendimento</h1>
        <Routes>
          <Route path="/cadastro" element={<CadastroCliente />} />
          <Route path="/login" element={<LoginAtendente />} />
          <Route path="/" exact>
            <h2>Bem-vindo ao sistema de pizzaria!</h2>
            <a href="/cadastro">Cadastrar Cliente</a>
            <br />
            <a href="/login">Login do Atendente</a>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
