from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
import datetime
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from flask_jwt_extended import get_jwt_identity

# Carregar variáveis de ambiente
load_dotenv()

# Conectar ao MongoDB
client = MongoClient(os.getenv('MONGODB_URI'))
db = client["pizzaria"]

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    
    # Verificar se o usuário já existe
    existing_user = db.users.find_one({"username": data['username']})
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    # Garantir que role seja atribuído ao usuário
    role = data.get('role', 'atendente')  # Default para 'atendente'

    user = {
        "username": data['username'],
        "password": hashed_password,
        "role": role
    }
    db.users.insert_one(user)
    return jsonify({"message": "User registered successfully!"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = db.users.find_one({"username": data['username']})
    if user and check_password_hash(user['password'], data['password']):
        # Criar o token com a role incluída
        access_token = create_access_token(identity=user['username'], 
                                           additional_claims={"role": user['role']}, 
                                           expires_delta=datetime.timedelta(days=1))
        return jsonify(access_token=access_token, username=data["username"]), 200
    return jsonify({"error": "Invalid username or password"}), 401

def is_atendente():
    claims = get_jwt_identity()
    return claims.get("role") == "atendente"
