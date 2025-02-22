const { TableClient } = require("@azure/data-tables");

const tableName = "QRCounter";
const connectionString = process.env.AzureWebJobsStorage;

module.exports = async function (context, req) {
    const tableClient = TableClient.fromConnectionString(connectionString, tableName);
    const partitionKey = "qr";
    const rowKey = "counter";

    try {
        let entity = await tableClient.getEntity(partitionKey, rowKey);
        entity.count += 1;
        await tableClient.updateEntity(entity);
    } catch (error) {
        await tableClient.createEntity({ partitionKey, rowKey, count: 1 });
    }

    context.res = { status: 200, body: { success: true } };
};
