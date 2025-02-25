import azure.functions as func
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(json.dumps({"message": "Funciona correctamente"}), mimetype="application/json")
