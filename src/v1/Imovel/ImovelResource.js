const ImovelService = require('./ImovelService');

module.exports = [
    {
        method: 'GET',
        path: '/api/imovel',
        handler: function (request, reply) {
            ImovelService.listarImoveis()
                .then(function (imoveis) {
                    reply(imoveis);
                });
        }
    }
];