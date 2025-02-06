// frontend/src/components/ListaPizzas.jsx
import React, { useEffect, useState } from 'react';
import { listarPizzas } from '../services/api';

const ListaPizzas = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await listarPizzas();
        setPizzas(response.data);
      } catch (error) {
        alert('Erro ao listar pizzas!');
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div>
      <h2>Lista de Pizzas</h2>
      <ul>
        {pizzas.map((pizza, index) => (
          <li key={index}>{`${pizza.nome}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPizzas;
