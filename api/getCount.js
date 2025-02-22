let count = 0; // Este es un valor fijo por ahora. Se puede cambiar o guardar en otro lugar más adelante.

module.exports = async function (context, req) {
    context.res = {
        status: 200,
        body: { count }  // Envía el valor actual del contador
    };
};
