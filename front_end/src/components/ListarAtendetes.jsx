// src/components/AtendenteList.jsx
import React, { useState, useEffect } from 'react';
import { listarAtendentes } from '../services/api';

const AtendenteList = () => {
  const [atendentes, setAtendentes] = useState([]);
  const [mensagemErro, setMensagemErro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listarAtendentes();
        if (Array.isArray(response.data) && response.data.length === 0) {
          setMensagemErro('Nenhum atendente cadastrado.');
        } else if (Array.isArray(response.data)) {
          setAtendentes(response.data);
          setMensagemErro('');
        } else {
          setMensagemErro('Erro inesperado ao carregar a lista de atendentes.');
        }
      } catch (error) {
        setMensagemErro('Erro ao carregar a lista de atendentes.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Lista de Atendentes</h2>
      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
      <ul>
        {Array.isArray(atendentes) && atendentes.map((atendente) => (
          <li key={atendente.email}>{atendente.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default AtendenteList;
