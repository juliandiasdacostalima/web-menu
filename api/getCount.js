const fs = require('fs');
const path = './counter.json';  // Ruta al archivo donde se guarda el contador

module.exports = async function (context, req) {
    try {
        const data = fs.readFileSync(path, 'utf8');
        const counter = JSON.parse(data).count;
        context.res = {
            body: { count: counter }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: "No se pudo leer el contador" }
        };
    }
};
