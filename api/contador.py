import azure.functions as func
import json
from azure.data.tables import TableServiceClient

CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=tu_cuenta;AccountKey=tu_llave;TableEndpoint=..."  # Reemplazar con tu conexión real
TABLE_NAME = "qrscans"

def main(req: func.HttpRequest) -> func.HttpResponse:
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
