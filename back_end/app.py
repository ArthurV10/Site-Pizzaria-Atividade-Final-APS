import os
from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from pymongo import MongoClient
import json

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__)

# Configurar JWT
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

# Conectar ao MongoDB
client = MongoClient(os.getenv('MONGODB_URI'))
db = client["pizzaria"]

# Importar blueprints
from atendentes import atendente_bp
from auth import auth_bp

app.register_blueprint(atendente_bp)
app.register_blueprint(auth_bp)

# Tratamento global de erros
@app.errorhandler(Exception)
def handle_exception(e):
    response = e.get_response()
    response.data = json.dumps({
    "error": str(e),
    })

    response.content_type = "application/json"
    return response

if __name__ == '__main__':
    app.run(debug=True)
