/**
 * Created by marcelo.cabral on 12/06/2017.
 */
const UsuarioService = require('./UsuarioService');
const Joi = require('joi');
const Boom = require('boom');
module.exports = [
    {
        method: 'GET',
        path: '/api/usuario',
        config: {
            handler: function (request, reply) {
                console.log(request);
                UsuarioService.listarUsuarios(request.query.page, request.query.per_page)
                    .then(function (usuarios) {
                        if (!usuarios) {
                            return reply(Boom.notFound());
                        }
                        reply.bissle(
                            {result: usuarios.rows},
                            {
                                total: usuarios.count,
                                page: request.query.page,
                                perPage: request.query.per_page
                            }
                        );
                    });
            },
            id: "usuario-get",
            description: 'Lista os usuarios',
            notes: 'Lista dos usuarios cadastrados no banco de dados',
            tags: ['usuario']
        }
    },
    {
        method: 'GET',
        path: '/api/usuario/{idUsuario}',
        config: {
            handler: function (request, reply) {
                UsuarioService.getUsuario(request.params.idUsuario)
                    .then(function (usuario) {
                        if (!usuario) {
                            return reply(Boom.notFound());
                        }
                        reply(usuario);
                    });
            },
            id: "usuario-get-id",
            description: 'Lista informacao de um usuario',
            notes: 'Lista dos usuarios cadastrados no banco de dados',
            tags: ['usuario']
        }
    },
    {
        method: 'POST',
        path: '/api/usuario',
        config: {
            handler: function (request, reply) {
                UsuarioService.cadastrarUsuarioPessoaFisica(request.payload)
                    .then(function (usuario) {
                        reply(usuario);
                    })
                    .catch(function (err) {
                        reply(Boom.badRequest());
                    });

            },
            validate: {
                payload: {
                    noPessoa: Joi.string().required(),
                    dsEmail: Joi.string().email().required(),
                    dsSenha: Joi.string().min(5).required(),
                }
            },
            id: "usuario-post",
            description: 'Cadastro de usuario',
            notes: 'Cadastra os dados do usuario',
            tags: ['usuario']
        }
    },
    {
        method: 'PATCH',
        path: '/api/usuario/{idUsuario}',
        config: {
            handler: function (request, reply) {
                UsuarioService.getUsuario(request.params.idUsuario)
                    .then(function (usuario) {
                        if (!usuario) {
                            return reply(Boom.notFound());
                        }
                        return UsuarioService.atulizarUsuario(request.payload, usuario, request.params.idUsuario)
                            .then(function (usuario) {
                                return reply(usuario);
                            })
                            .catch(function (err) {
                                return reply(Boom.badRequest());
                            });
                    })
                    .catch(function (err) {
                        reply(Boom.badRequest());
                    });


            },
            validate: {
                payload: {
                    noPessoa: Joi.string(),
                    dsEmail: Joi.string().email(),
                }
            },
            id: "usuario-patch-id",
            description: 'Atualiza os dados de pessoa e usuario',
            notes: 'Atualizacao do usuario',
            tags: ['usuario']
        }
    },
];