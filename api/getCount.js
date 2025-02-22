let count = 0;

module.exports = async function (context, req) {
    context.res = { body: { count } };
};
