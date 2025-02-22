let count = 0; // Mantén el contador aquí también (si usas un lugar fijo o base de datos, deberás cambiar esto).

module.exports = async function (context, req) {
    count++; // Incrementa el valor del contador
    context.res = {
        status: 200,
        body: { success: true, count }  // Responde con el nuevo valor del contador
    };
};
