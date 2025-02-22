const { TableClient } = require("@azure/data-tables");

const tableName = "QRCounter";
const connectionString = process.env.AzureWebJobsStorage;

module.exports = async function (context, req) {
    const tableClient = TableClient.fromConnectionString(connectionString, tableName);
    const partitionKey = "qr";
    const rowKey = "counter";

    try {
        const entity = await tableClient.getEntity(partitionKey, rowKey);
        context.res = { body: { count: entity.count } };
    } catch (error) {
        context.res = { body: { count: 0 } };  // Si no existe, empieza en 0
    }
};
