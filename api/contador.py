import azure.functions as func
import json
import os
from azure.data.tables import TableServiceClient

# Obtener la cadena de conexión desde la variable de entorno
CONNECTION_STRING = os.getenv("STORAGE_CONNECTION_STRING")

TABLE_NAME = "qrCounter"

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        if not CONNECTION_STRING:
            return func.HttpResponse(json.dumps({"error": "No se encontró la cadena de conexión"}), status_code=500)

        client = TableServiceClient.from_connection_string(CONNECTION_STRING)
        table = client.get_table_client(TABLE_NAME)

        try:
            entity = table.get_entity(partition_key="qr", row_key="contador")
            count = entity["Count"] + 1
            entity["Count"] = count
            table.update_entity(entity)
        except:
            count = 1
            table.upsert_entity({"PartitionKey": "qr", "RowKey": "contador", "Count": count})

        return func.HttpResponse(json.dumps({"count": count}), mimetype="application/json")

    except Exception as e:
        return func.HttpResponse(json.dumps({"error": str(e)}), mimetype="application/json", status_code=500)
