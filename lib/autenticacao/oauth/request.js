/**
 * funcao que retorna a request no formato que o oauth trabalho
 * @param request request do hapi
 * @returns Request no formato como o auth entendi
 * @constructor
 */
function RequestFromHapi(request) {
    var requestOAuth = {
        query: request.query,
        body: request.payload,
        method: request.method.toUpperCase(),
        headers: request.headers,
    };

    return requestOAuth ;
}

/**
 * retorna o formato de requisicao como o Hapi entendi
 * @param request objeto de request
 * @returns {*}
 * @constructor
 */
function RequestToHapi(request){
    return request;
}


module.exports = {
    RequestFromHapi,
    RequestToHapi
};