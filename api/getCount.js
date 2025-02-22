module.exports = async function (context, req) {
    // Aquí es donde obtienes el valor actual del contador, que puede estar en una base de datos o en una variable
    const count = 0;  // Este es un valor fijo por ahora. En un caso real, este valor sería dinámico y guardado en una base de datos.
    context.res = {
        body: { count }  // Envía el valor del contador como respuesta
    };
};
