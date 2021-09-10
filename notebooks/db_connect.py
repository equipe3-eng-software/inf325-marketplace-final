from pymongo import MongoClient

# Conectar a instância do MongoDB implantado na AWS
client = MongoClient('34.205.73.180', 27017)

# Criando uma nova referência para o banco de dados desejado
db = client.trabalho