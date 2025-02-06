import React, { useState, useEffect } from 'react';
import { listarPizzas, registrarPedido } from '../services/api';

const PedidoForm = () => {
  const [pizzas, setPizzas] = useState([]);
  const [tamanho, setTamanho] = useState('');
  const [pizzaSelecionada, setPizzaSelecionada] = useState('');
  const [preco, setPreco] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pizzasResponse = await listarPizzas();
        setPizzas(pizzasResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calcularPreco = () => {
      let precoBase = 0;
      const pizza = pizzas.find(p => p.nome === pizzaSelecionada);
      if (pizza) {
        precoBase += pizza.preco;
      }

      switch (tamanho) {
        case 'Pequena':
          precoBase *= 1;
          break;
        case 'Média':
          precoBase *= 1.5;
          break;
        case 'Grande':
          precoBase *= 2;
          break;
        default:
          precoBase = 0;
          break;
      }

      setPreco(precoBase);
    };

    calcularPreco();
  }, [pizzaSelecionada, tamanho, pizzas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pedido = { pizza: pizzaSelecionada, tamanho, preco };
    try {
      await registrarPedido(pedido);
      alert('Pedido registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar pedido:', error);
      alert('Erro ao registrar pedido!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Pedido</h2>
      <label>
        Pizza:
        <select value={pizzaSelecionada} onChange={(e) => setPizzaSelecionada(e.target.value)} required>
          <option value="">Selecione uma pizza</option>
          {pizzas.map((pizza) => (
            <option key={pizza.nome} value={pizza.nome}>{pizza.nome}</option>
          ))}
        </select>
      </label>
      <label>
        Tamanho:
        <select value={tamanho} onChange={(e) => setTamanho(e.target.value)} required>
          <option value="">Selecione o tamanho</option>
          <option key="pequena" value="Pequena">Pequena</option>
          <option key="media" value="Média">Média</option>
          <option key="grande" value="Grande">Grande</option>
        </select>
      </label>
      <p>Preço: R$ {preco.toFixed(2)}</p>
      <button type="submit">Registrar Pedido</button>
    </form>
  );
};

export default PedidoForm;
