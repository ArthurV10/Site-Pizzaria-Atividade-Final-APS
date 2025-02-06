# backend/controllers/atendente.py
from flask import Blueprint, request, jsonify
from models.atendente import criar_atendente, autenticar_atendente
from database import get_db  # Importando a função get_db para acessar o banco de dados

atendentes_bp = Blueprint('atendentes', __name__)

# Obter a instância do banco de dados
db = get_db()

# Cadastro de atendente
@atendentes_bp.route('/atendentes', methods=['POST'])
def cadastrar_atendente():
    dados = request.json
    nome = dados.get("nome")
    usuario = dados.get("usuario")
    senha = dados.get("senha")
    
    if not nome or not usuario or not senha:
        return jsonify({"erro": "Todos os campos são obrigatórios"}), 400

    if db.atendente.find_one({"usuario": usuario}):
        return jsonify({"erro": "Usuário já existe"}), 400

    criar_atendente(nome, usuario, senha)
    return jsonify({"mensagem": "Atendente cadastrado com sucesso!"}), 201

# Login de atendente
@atendentes_bp.route('/atendentes/login', methods=['POST'])
def login_atendente():
    dados = request.json
    usuario = dados.get("usuario")
    senha = dados.get("senha")

    atendente = autenticar_atendente(usuario, senha)
    
    if not atendente:
        return jsonify({"erro": "Usuário ou senha incorretos"}), 401

    return jsonify({"mensagem": "Login bem-sucedido!"}), 200

# Listar todos os atendentes
@atendentes_bp.route('/atendentes', methods=['GET'])
def listar_atendentes():
    atendentes = list(db.atendente.find({}, {"_id": 0, "senha": 0}))
    return jsonify(atendentes), 200
