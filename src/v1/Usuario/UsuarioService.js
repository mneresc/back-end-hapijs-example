const modelsComum = require('../../../models/v1/comum');
const models = require('../../../lib/autenticacao/models');
const Boom = require('boom');
const Paginacao = require('../../../lib/util/Paginacao');
// var bcrypt = require('bcrypt');
const saltRounds = 10;
const contatoEmail = 1;
const contatoTelefone = 2;
/**
 *
 * @param Int page pagina pesquisada
 * @param Int perPage quantidade de registro por pagina
 * @returns Lista de usuarios
 */
function listarUsuarios(page, perPage, where) {
    var query = {
        include: [{
            model: models.Perfil,
            model: modelsComum.Pessoa,
        }],
        attributes: {exclude: ['dsSenha', 'dsScope']},
        limit: parseInt(perPage),
        offset: Paginacao.calcularOffset(page, perPage)
    };
    if (where) {
        query.where = where;
    }
    usuarios = models.Usuario.findAndCountAll(query)
        .then(function (usuarios) {
            return usuarios;
        });
    return usuarios;
};

function cadastrarUsuarioPessoaFisica(dados) {
    var dadosPessoa = {
        pessoa: {
            noPessoa: dados.noPessoa,
            Contato: {
                dsContato: dados.dsEmail,
                stContato: true,
                id_tipo_contato: contatoEmail
            }
        },
        usuario: {
            dsUsuario: dados.dsEmail,
            dsSenha: dados.dsSenha
        }
    };

    return modelsComum.sequelize.transaction({autocommit: false}, function (transacao) {
        // Cadastra pessoa
        return modelsComum
            .Pessoa
            .create(dadosPessoa.pessoa, {transaction: transacao})
            .then(function (Pessoa) {
                dadosPessoa.usuario.id_pessoa = Pessoa.idPessoa;
                //setando dados de pessoa
                dadosPessoa.pessoaFisica = {
                    id_pessoa: Pessoa.idPessoa
                };
                //salva pessoa fisica
                return modelsComum
                    .PessoaFisica
                    .create(dadosPessoa.pessoaFisica, {transaction: transacao}).then(
                        function () {
                            return models
                                .Usuario
                                .create(dadosPessoa.usuario, {transaction: transacao})
                                .then(function (usuario) {
                                    dadosPessoa.pessoa.Contato.id_pessoa = Pessoa.idPessoa;
                                    return criarOuAtualizarContato(dadosPessoa.pessoa.Contato, Pessoa.idPessoa, transacao)
                                        .then(function () {
                                            return usuario;
                                        });
                                });
                        }
                    );
            });

    }).then(function (result) {
        //retorno os dados do usuario adicionado de forma mais tratada
        return getUsuario(result.idUsuario);
    }).catch(function (err) {
        console.log('-------------');
        console.log(err);
        console.log('-------------');
    });
};

function getUsuario(idUsuario, addSenha) {
    var exclude = [];
    if (addSenha === undefined || addSenha === false) {
        exclude = ['dsSenha', 'dsScope']
    }

    var query = {
        include: [{
            model: modelsComum.Pessoa,
        }],
        where: {
            idUsuario: idUsuario
        },
        attributes: {
            exclude: exclude
        }
    };
    return models.Usuario.findOne(query)
        .then(function (usuarios) {
            return usuarios;
        });
}

function atulizarUsuario(dados, usuarioFind) {
    //formulando dados do payload
    var dadosPessoa = {
        pessoa: {
            noPessoa: dados.noPessoa ? dados.noPessoa : usuarioFind.Pessoa.noPessoa,
            Contato: {
                dsContato: dados.dsEmail,
                stContato: true,
                idTipoContato: contatoEmail
            }
        },
        usuario: {
            dsUsuario: dados.dsEmail !== undefined ? dados.dsEmail : usuarioFind.dsUsuario,
        }
    };
    return modelsComum.sequelize.transaction({autocommit: false}, function (transacao) {
        // Atualizando  pessoa
        return modelsComum
            .Pessoa
            .update(dadosPessoa.pessoa, {where: {idPessoa: usuarioFind.Pessoa.idPessoa}}, {transaction: transacao})
            .then(function () {
                //Atualizando Usuario
                return models
                    .Usuario
                    .update(dadosPessoa.usuario, {where: {idUsuario: usuarioFind.idUsuario}}, {transaction: transacao})
                    .then(function (usuario) {
                        //retorna os dados do usuario antigo para fazer a pesquisa de atualizacao
                        return usuarioFind;
                    });
            });
    }).then(function (result) {
        //retorno os dados do usuario adicionado de forma mais tratada
        return getUsuario(result.idUsuario);
    }).catch(function (err) {
        console.log('-------------');
        console.log(err);
        console.log('-------------');
    });
}

function criarOuAtualizarContato(dadosContato, idPessoa, transacao) {
    return modelsComum
        .Contato
        .findOne({where: {id_pessoa: idPessoa, id_tipo_contato: contatoEmail}})
        .then(function (obj) {
            if (obj) { // update
                return obj.update(dadosContato, {transaction: transacao});
            }
            return modelsComum.Contato.create(dadosContato, {transaction: transacao});
        });
}

module.exports = {
    listarUsuarios,
    cadastrarUsuarioPessoaFisica,
    getUsuario,
    atulizarUsuario
};


