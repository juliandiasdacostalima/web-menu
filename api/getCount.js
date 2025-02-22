module.exports = async function (context, req) {
    const count = 0;  // Este es un valor fijo por ahora. Puedes guardarlo en un lugar como una base de datos.
    context.res = {
        body: { count }  // Envía el valor del contador como respuesta
    };
};
