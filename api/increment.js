const fs = require('fs');
const path = './counter.json';  // Ruta al archivo donde se guarda el contador

module.exports = async function (context, req) {
    try {
        const data = fs.readFileSync(path, 'utf8');
        const json = JSON.parse(data);
        json.count += 1;  // Incrementa el contador

        fs.writeFileSync(path, JSON.stringify(json));  // Guarda el nuevo contador en el archivo

        context.res = {
            status: 200,
            body: { success: true }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: "No se pudo incrementar el contador" }
        };
    }
};
