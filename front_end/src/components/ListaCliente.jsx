// frontend/src/components/ListaClientes.jsx
import React, { useEffect, useState } from 'react';
import { listarClientes } from '../services/api';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await listarClientes();
        setClientes(response.data);
      } catch (error) {
        alert('Erro ao listar clientes!');
      }
    };

    fetchClientes();
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente, index) => (
          <li key={index}>{cliente.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaClientes;
