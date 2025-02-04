from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Conectar ao MongoDB
client = MongoClient(os.getenv("MONGODB_URI"))

# Selecionar o banco de dados
db = client["pizzaria"]

# Selecionar as coleções
clientes_collection = db["clientes"]
pedidos_collection = db["pedidos"]
