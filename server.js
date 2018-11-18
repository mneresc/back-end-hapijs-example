'use strict';

const Hapi = require('hapi');
const halacious = require('halacious');

//Models
const models = require('./models/v1');
const modelsComuns = require('./models/v1/comum');
const imovelResource = require('./src/v1/Imovel/ImovelResource');
let usuarioResource = require('./src/v1/Usuario/UsuarioResource');

//Documentacao de API
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');


//OAuth imports
var oauthServer = require('oauth2-server');
const requestOAuth = require('./lib/autenticacao/oauth/request');
var Request = oauthServer.Request;
var Response = oauthServer.Response;
const Boom = require('boom');

const server = new Hapi.Server();
server.connection({port: 3008, host: 'localhost'});

const ImovelService = require('./src/v1/Imovel/ImovelService');

server.register(require('vision'), function (err) {
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        layout: 'full',
        layoutPath: `${__dirname}/views/layout`,
        path: './views'
    })
});

const aclService = require('./lib/autenticacao/services/aclService');

//OAUTH --------------------------------------------------
var oauth = new oauthServer({
    model: require('./lib/autenticacao/oauth/model')
});

server.auth.scheme('custom', function (server, options) {

    return {
        authenticate: function (request, reply) {

            var req = new Request(requestOAuth.RequestFromHapi(request));
            var res = new Response(reply);

            oauth.authenticate(req, res, options)
                .then(function (token) {
                    aclService.verificarAcessoRota(token.user.id, request.path, request.method)
                        .then(function (acessoUsuario) {
                            if (acessoUsuario && acessoUsuario.id == token.User.id) {
                                return reply.continue({credentials: {token: token.accessToken}});
                            }
                            return reply(Boom.forbidden());
                        });

                })
                .catch(function (err) {
                    return reply(Boom.unauthorized(err));
                });
        }
    };
});
// server.auth.strategy('default', 'custom');
// server.auth.default('default');

server.route([
    {
        method: 'POST',
        path: '/oauth/token',
        config: {
            auth: false
        },
        handler: function (request, reply) {
            var req = new Request(requestOAuth.RequestFromHapi(request));
            var res = new Response(reply);

            oauth.token(req, res)
                .then(function (token) {
                    return reply(token);
                });
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            ImovelService.listarImoveis()
                .then(function (imoveis) {
                    reply.view('index', {imoveis: imoveis})
                });
        }
    }
]);
//OAUTH ------------------------------------------------------


//ACL-------------------
var Acl = require('./lib/autenticacao/acl');

//---------------------------


//Rotas---------------------------------------

server.route([
    {
        method: 'GET',
        path: '/teste',
        handler: function (request, reply) {
            return reply({teste: 'teste'});
        }

    }
]);


// Registrando a paginacao

let swaggerOptions = {
    documentationPage: true,
    swaggerUIPath: '/ui/',
    basePath: '/api/',
    pathPrefixSize: 2,
    paths: ['/api/usuario'],
    info: {
        'title': 'Open Imóveis API',
        'version': Pack.version,
    },
    jsonEditor: true,
    validatorUrl: null
};

var plugins = [
    {
        register: require('hapi-locale'),
        options: {
            locales: ['pt_BR']
        }
    },
    {register: require('joi18n')},
    {register: require('akaya')},
    {register: require('Inert')},
    {register: require('Vision')},
    {
        register: HapiSwagger,
        options: swaggerOptions
    },
    {
        register: require('bissle'),
        options: {
            absolute: true,
            paramNames: {
                perPage: 'per_page',
                page: 'page'
            }
        }
    }
];

var promises = [
    Acl.initAclModels(),
    modelsComuns.sequelize.sync(),
    models.sequelize.sync(),
];


server.register(plugins, function (err) {
    //ROTAS----------------------------------------
    server.route(usuarioResource);
    return Promise
        .all(promises)
        .then(function (data) {
            server.start(function (err) {
                if (err) {
                    throw err;
                }
                console.log(`Server running at: ${server.info.uri}`);
            });
        });
});









