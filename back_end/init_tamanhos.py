# backend/init_tamanhos.py
from database import get_db

def adicionar_tamanhos_iniciais():
    db = get_db()
    tamanho = [
        {"nome": "Média", "preco": 20.0},
        {"nome": "Grande", "preco": 30.0},
        {"nome": "Gigante", "preco": 40.0}
    ]

    # Verificar se a coleção está vazia antes de adicionar
    if db.tamanho.count_documents({}) == 0:
        db.tamanho.insert_many(tamanho)
        print("Tamanhos iniciais adicionados com sucesso!")
    else:
        print("Tamanhos já existem no banco de dados.")

if __name__ == '__main__':
    adicionar_tamanhos_iniciais()
