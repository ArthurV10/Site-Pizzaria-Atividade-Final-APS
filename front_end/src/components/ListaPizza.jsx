import React, { useEffect, useState } from 'react';
import { listarPizzas } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Certifique-se de importar o CSS

const ListaPizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listarPizzas();
        const pizzasData = Array.isArray(response.data) ? response.data : [];
        const formattedPizzas = pizzasData.map(pizza => ({
          ...pizza,
          ingredientes: pizza.ingredientes.split(',').map(ing => ing.trim())
        }));
        setPizzas(formattedPizzas);
      } catch (error) {
        setError('Erro ao carregar a lista de pizzas');
      }
    };

    fetchData();
  }, []);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <h2>Cardápio</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        pizzas.length > 0 ? (
          <div className="pizzas-grid">
            {pizzas.map((pizza) => (
              <div key={pizza.id} className="pizza-block">
                <h3>{pizza.nome}</h3>
                <p><strong>Ingredientes:</strong> {pizza.ingredientes.join(', ')}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma pizza encontrada.</p>
        )
      )}
      <button type="button" className="secondary" onClick={handleBackToDashboard}>Retornar ao Dashboard</button>
    </div>
  );
};

export default ListaPizzas;
