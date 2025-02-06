# backend/models/tamanho.py
from database import get_db

def criar_tamanho(nome, preco):
    db = get_db()
    db.tamanho.insert_one({"nome": nome, "preco": preco})

def listar_tamanhos():
    db = get_db()
    return list(db.tamanho.find({}))
