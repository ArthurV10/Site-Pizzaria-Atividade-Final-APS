# backend/database.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente do .env
load_dotenv()

def init_db():
    global db
    client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
    db = client['pizzaria']

def get_db():
    return db
