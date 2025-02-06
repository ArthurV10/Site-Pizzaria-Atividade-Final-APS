# backend/controllers/pizza.py
from flask import Blueprint, request, jsonify
from models.pizza import criar_pizza, buscar_pizza_por_sabor, listar_pizzas
from database import get_db

pizzas_bp = Blueprint('pizzas', __name__)

# Registro de pizza
@pizzas_bp.route('/pizzas', methods=['POST'])
def registrar_pizza():
    dados = request.json
    sabor = dados.get("sabor")
    preco = dados.get("preco")
    
    if not sabor or not preco:
        return jsonify({"erro": "Todos os campos são obrigatórios"}), 400

    criar_pizza(sabor, preco)
    return jsonify({"mensagem": "Pizza registrada com sucesso!"}), 201

# Buscar pizza por sabor
@pizzas_bp.route('/pizzas/<sabor>', methods=['GET'])
def obter_pizza(sabor):
    pizza = buscar_pizza_por_sabor(sabor)
    
    if not pizza:
        return jsonify({"erro": "Pizza não encontrada"}), 404

    return jsonify(pizza), 200

# Listar todas as pizzas
@pizzas_bp.route('/pizzas', methods=['GET'])
def listar_todas_pizzas():
    pizzas = listar_pizzas()
    return jsonify(pizzas), 200
