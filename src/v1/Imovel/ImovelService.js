const models = require('../../../models/v1');

exports.listarImoveis = function () {
    return models.Imovel.findAll({
        include: [{
            model: models.TipoImovel
        }]
    })
        .then(function (imoveis) {
            return imoveis;
        });
    /*
     return models.TipoImovel.findAll({
     include: [{
     model: models.Imovel
     }]
     })
     .then(function (imoveis) {
     return imoveis;
     })
     */
};