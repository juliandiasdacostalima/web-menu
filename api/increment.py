import azure.functions as func
import json
from azure.data.tables import TableServiceClient
import os

# Configuración de la conexión a Azure Table Storage
connection_string = os.getenv("AzureWebJobsStorage")
table_service = TableServiceClient.from_connection_string(conn_str=connection_string)
table_name = "qrCounter"
table_client = table_service.get_table_client(table_name)

# Verifica si la tabla existe, si no, la crea
try:
    table_client.create_table()
except:
    pass

def main(req: func.HttpRequest) -> func.HttpResponse:
    entity = table_client.get_entity(partition_key="counter", row_key="1")
    
    # Incrementar contador
    entity["Count"] += 1
    table_client.update_entity(entity)

    return func.HttpResponse(json.dumps({"count": entity["Count"]}), mimetype="application/json")
