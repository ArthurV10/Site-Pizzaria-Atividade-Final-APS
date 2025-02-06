from database import get_db

def criar_atendente(nome, email, senha):
    db = get_db()
    if db.atendente.find_one({"email": email}):
        return False  # Atendente já existe
    db.atendente.insert_one({"nome": nome, "email": email, "senha": senha})
    return True

def buscar_atendente_por_email_e_senha(email, senha):  # Usando 'email' em vez de 'nome'
    db = get_db()
    return db.atendente.find_one({"email": email, "senha": senha})  # Usando 'email' em vez de 'nome'

def listar_atendentes():
    db = get_db()
    atendentes = list(db.atendente.find({}, {"_id": 0, "senha": 0}))  # Excluindo "_id" e "senha"
    return atendentes
