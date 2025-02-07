// frontend/src/components/ListaPedidos.jsx
import React, { useState, useEffect } from 'react';
import { listarPedidos } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ListaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pedidosResponse = await listarPedidos();
        setPedidos(pedidosResponse.data);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <ul>
        {pedidos.map((pedido, index) => (
          <li key={index}>
            Pizza: {pedido.pizza}, Tamanho: {pedido.tamanho}, Preço: R$ {pedido.preco.toFixed(2)}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/dashboard')}>Retornar ao Dashboard</button>
    </div>
  );
};

export default ListaPedidos;
