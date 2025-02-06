from flask import Blueprint, request, jsonify
from models.pizza import criar_pizza,listar_pizzas

pizza_bp = Blueprint('pizzas', __name__)

@pizza_bp.route('/', methods=['POST'])
def cadastrar():
    data = request.json
    # Verifica se todos os campos necessários estão presentes
    if not data or not all(key in data for key in ('nome', 'ingredientes', 'preco')):
        return jsonify({"erro": "Todos os campos são obrigatórios."}), 400

    sucesso = criar_pizza(data['nome'], data['ingredientes'], data['preco'])
    if not sucesso:
        return jsonify({"erro": "Pizza já existe."}), 400

    return jsonify({"mensagem": "Pizza cadastrada com sucesso!"})

@pizza_bp.route('/', methods=['GET'])
def listar():
    pizzas = listar_pizzas()
    if not pizzas:
        return jsonify({"mensagem": "Nenhuma pizza cadastrada."})
    return jsonify(pizzas)

