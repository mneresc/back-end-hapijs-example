/* 
 * Helper responsavel por abstrair logica da paginacao
 */

function calcularOffset(page, perPage) {
    //Regra: se a pagina for 1 o Offset é 0 se nao 
    // eh numero da pagina - 1 * quantidade por pagina depois do calculo subtrai 1
    var offset = 0;
    if (page != 1) {
        offset = ((page - 1) * perPage) - 1;
    }
    return offset;
}


module.exports = {
    calcularOffset
};