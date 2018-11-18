const authModels = require('../models');

exports.verificarAcessoRota = function (idUsuario, rota, metodo) {
    return authModels.Usuario.findOne({
        where: {id_usuario: idUsuario},
        attributes: ['id_usuario', 'ds_usuario'],
        include: [{
            model: authModels.Perfil,
            attributes: ['id_perfil', 'no_profile'],
            where: {st_perfil: 1},
            include:[{
                model: authModels.Recurso,
                attributes: ['id_recurso', 'no_recurso', 'ds_url_recurso'],
                where: {ds_url_recurso: rota},
                include: [{
                    model: authModels.Metodo,
                    attributes: ['no_metodo'],
                    where: {no_metodo: metodo}
                }]
            }]
        }]
    }).then(function (perfis) {
        return perfis;
    })
};