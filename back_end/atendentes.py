from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from database import clientes_collection, pedidos_collection
from auth import is_atendente
from bson import ObjectId  # Para conversão de ObjectId para string

# Criando o Blueprint para as rotas do atendente
atendente_bp = Blueprint('atendente', __name__)

# Rota para cadastrar cliente
@atendente_bp.route('/clientes', methods=['POST'])
def cadastrar_cliente():
    # if not is_atendente():
    #     return jsonify({"erro": "Acesso negado. Apenas atendentes podem cadastrar clientes."}), 403

    dados = request.json
    if not all(k in dados for k in ["nome", "telefone", "endereco", "bairro"]):
        return jsonify({"erro": "Todos os campos são obrigatórios!"}), 400

    cliente = {
        "nome": dados["nome"],
        "telefone": dados["telefone"],
        "endereco": dados["endereco"],
        "bairro": dados["bairro"]
    }
    resultado = clientes_collection.insert_one(cliente)

    return jsonify({
        "mensagem": "Cliente cadastrado com sucesso!",
        "cliente_id": str(resultado.inserted_id)  # Retorna o ID do novo cliente
    }), 201

# Rota para cadastrar pedido
@atendente_bp.route('/pedidos', methods=['POST'])
@jwt_required()
def cadastrar_pedido():
    if not is_atendente():
        return jsonify({"erro": "Acesso negado. Apenas atendentes podem cadastrar pedidos."}), 403

    dados = request.json
    if not all(k in dados for k in ["cliente_id", "sabor", "tamanho"]):
        return jsonify({"erro": "Todos os campos são obrigatórios!"}), 400

    # Verificar se cliente existe
    cliente = clientes_collection.find_one({"_id": ObjectId(dados["cliente_id"])})
    if not cliente:
        return jsonify({"erro": "Cliente não encontrado!"}), 404

    # Definição de preços
    precos = {
        "calabresa": {"media": 20.00, "grande": 30.00},
        "mussarela": {"media": 22.00, "grande": 32.00}
    }

    preco = precos.get(dados["sabor"], {}).get(dados["tamanho"], None)
    if preco is None:
        return jsonify({"erro": "Sabor ou tamanho inválidos!"}), 400

    pedido = {
        "cliente_id": ObjectId(dados["cliente_id"]),
        "sabor": dados["sabor"],
        "tamanho": dados["tamanho"],
        "preco": preco,
        "status": "pendente"
    }
    resultado = pedidos_collection.insert_one(pedido)

    return jsonify({
        "mensagem": "Pedido cadastrado!",
        "pedido_id": str(resultado.inserted_id),  # Retorna o ID do pedido
        "preco": preco
    }), 201

# Rota para obter pedidos
@atendente_bp.route('/pedidos', methods=['GET'])
@jwt_required()
def obter_pedidos():
    if not is_atendente():
        return jsonify({"erro": "Acesso negado. Apenas atendentes podem visualizar pedidos."}), 403

    pedidos = pedidos_collection.find()
    pedidos_list = [
        {
            "_id": str(pedido["_id"]),
            "cliente_id": str(pedido["cliente_id"]),
            "sabor": pedido["sabor"],
            "tamanho": pedido["tamanho"],
            "preco": pedido["preco"],
            "status": pedido["status"]
        }
        for pedido in pedidos
    ]

    return jsonify(pedidos_list), 200
