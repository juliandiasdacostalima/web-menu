module.exports = async function (context, req) {
    // Aquí puedes incrementar el contador, por ejemplo, guardándolo en un lugar de almacenamiento
    context.res = {
        status: 200,
        body: { success: true }
    };
};