module.exports = async function (context, req) {
    // Aquí incrementas el contador. En un caso real, el contador se guardaría en una base de datos.
    context.res = {
        status: 200,
        body: { success: true }  // Solo retornamos éxito por ahora
    };
};
