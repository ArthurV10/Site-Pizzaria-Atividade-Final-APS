import React, { useEffect, useState } from 'react';
import { listarClientes } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await listarClientes();
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao listar clientes:', error);
        if (error.response && error.response.status === 401) {
          alert('Não autorizado. Por favor, faça login.');
          navigate('/login-atendente');
        } else {
          alert('Erro ao listar clientes!');
        }
      }
    };

    fetchClientes();
  }, [navigate]);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente, index) => (
          <li key={index}>{cliente.nome}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/dashboard')}>Retornar ao Dashboard</button>
    </div>
  );
};

export default ListaClientes;
