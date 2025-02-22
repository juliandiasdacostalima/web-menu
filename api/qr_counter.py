import logging
import azure.functions as func
from azure.data.tables import TableServiceClient, TableEntity
import os

# Configuración de Azure Table Storage
STORAGE_CONNECTION_STRING = os.getenv("AzureWebJobsStorage")
TABLE_NAME = "QRScans"
PARTITION_KEY = "counter"
ROW_KEY = "scans"

def get_table_client():
    service_client = TableServiceClient.from_connection_string(STORAGE_CONNECTION_STRING)
    table_client = service_client.get_table_client(TABLE_NAME)
    return table_client

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Processing QR scan count request.")
    
    table_client = get_table_client()
    
    try:
        entity = table_client.get_entity(PARTITION_KEY, ROW_KEY)
        count = entity["count"]
    except:
        count = 0
        entity = TableEntity(partition_key=PARTITION_KEY, row_key=ROW_KEY, count=count)
        table_client.upsert_entity(entity)
    
    if req.method == "POST":
        count += 1
        entity["count"] = count
        table_client.update_entity(entity)
    
    return func.HttpResponse(str(count), status_code=200)
