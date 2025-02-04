from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Conectar ao MongoDB
client = MongoClient(os.getenv('MONGODB_URI'))
db = client["pizzaria"]
clientes_collection = db["clientes"]
pedidos_collection = db["pedidos"]

# Criando o Blueprint para as ações do atendente
atendente_bp = Blueprint('atendente', __name__)

# Verificar se o usuário tem permissão de atendente
def is_atendente():
    claims = get_jwt_identity()
    role = claims.get("role")
    if role != "atendente":
        return False
    return True

@atendente_bp.route('/clientes', methods=['POST'])
@jwt_required()
def cadastrar_cliente():
    if not is_atendente():
        return jsonify({"erro": "Acesso negado. Apenas atendentes podem cadastrar clientes."}), 403

    dados = request.json
    if not dados.get("nome") or not dados.get("telefone") or not dados.get("endereco"):
        return jsonify({"erro": "Todos os campos são obrigatórios!"}), 400

    cliente = {
        "nome": dados["nome"],
        "telefone": dados["telefone"],
        "endereco": dados["endereco"]
    }
    clientes_collection.insert_one(cliente)
    return jsonify({"mensagem": "Cliente cadastrado com sucesso!"}), 201

@atendente_bp.route('/clientes', methods=['GET'])
@jwt_required()
def obter_clientes():
    if not is_atendente():
        return jsonify({"erro": "Acesso negado. Apenas atendentes podem visualizar clientes."}), 403
    
    clientes = clientes_collection.find()
    clientes_list = []
    for cliente in clientes:
        cliente["_id"] = str(cliente["_id"])
        clientes_list.append(cliente)
    return jsonify(clientes_list)

@atendente_bp.route('/pedidos', methods=['POST'])
@jwt_required()
def cadastrar_pedido():
    if not is_atendente():
        return jsonify({"erro": "Acesso negado. Apenas atendentes podem cadastrar pedidos."}), 403
    
    dados = request.json
    if not dados.get("cliente_id") or not dados.get("itens") or not dados.get("total"):
        return jsonify({"erro": "Todos os campos são obrigatórios!"}), 400

    pedido = {
        "cliente_id": dados["cliente_id"],
        "itens": dados["itens"],
        "total": dados["total"],
        "status": "pendente"
    }
    pedidos_collection.insert_one(pedido)
    return jsonify({"mensagem": "Pedido realizado com sucesso!"}), 201

@atendente_bp.route('/pedidos', methods=['GET'])
@jwt_required()
def obter_pedidos():
    if not is_atendente():
        return jsonify({"erro": "Acesso negado. Apenas atendentes podem visualizar pedidos."}), 403

    pedidos = pedidos_collection.find()
    pedidos_list = []
    for pedido in pedidos:
        pedido["_id"] = str(pedido["_id"])
        pedidos_list.append(pedido)
    return jsonify(pedidos_list)

@atendente_bp.route('/pedidos/<pedido_id>', methods=['PUT'])
@jwt_required()
def alterar_status_pedido(pedido_id):
    if not is_atendente():
        return jsonify({"erro": "Acesso negado. Apenas atendentes podem alterar o status do pedido."}), 403

    dados = request.json
    novo_status = dados.get("status")
    if novo_status not in ["pendente", "em andamento", "entregue"]:
        return jsonify({"erro": "Status inválido!"}), 400

    pedido = pedidos_collection.find_one({"_id": pedido_id})
    if not pedido:
        return jsonify({"erro": "Pedido não encontrado!"}), 404

    pedidos_collection.update_one({"_id": pedido["_id"]}, {"$set": {"status": novo_status}})
    return jsonify({"mensagem": "Status do pedido atualizado com sucesso!"})

@atendente_bp.route('/pedidos/<pedido_id>', methods=['DELETE'])
@jwt_required()
def excluir_pedido(pedido_id):
    if not is_atendente():
        return jsonify({"erro": "Acesso negado. Apenas atendentes podem excluir pedidos."}), 403

    pedido = pedidos_collection.find_one({"_id": pedido_id})
    if not pedido:
        return jsonify({"erro": "Pedido não encontrado!"}), 404

    pedidos_collection.delete_one({"_id": pedido["_id"]})
    return jsonify({"mensagem": "Pedido excluído com sucesso!"})

@atendente_bp.route('/pedidos/cliente/<cliente_id>', methods=['GET'])
@jwt_required()
def obter_pedidos_cliente(cliente_id):
    if not is_atendente():
        return jsonify({"erro": "Acesso negado. Apenas atendentes podem visualizar pedidos de clientes."}), 403

    pedidos = pedidos_collection.find({"cliente_id": cliente_id})
    pedidos_list = []
    for pedido in pedidos:
        pedido["_id"] = str(pedido["_id"])
        pedidos_list.append(pedido)
    return jsonify(pedidos_list)
