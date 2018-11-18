/**
 * Esse arquivo executa a funcao de modelo para o template do oauth
 * implementa as funcoes solicitadas para geracao e manutencao do token oauth
 */
const models = require('../models');
const Boom = require('boom');

/*function generateAccessToken(cliente, Usuario, scope) {

 }

 function generateRefreshToken(cliente, Usuario, scope) {
 }*/

function getClient(idCliente, dsClienteSegredo) {
    const options = {
        where: {dsIdCliente: idCliente},
        attributes: ['idCliente', 'dsIdCliente', 'dsRedirectUri', 'dsScope', 'dsGrantTypes'],
    };
    if (dsClienteSegredo) {
        options.where.dsClienteSegredo = dsClienteSegredo;
    }

    return models.Cliente
        .findOne(options)
        .then(function (cliente) {
            if (!cliente) {
                return new Error(Boom.forbidden(), 400);
            }
            var clientWithGrants = cliente.toJSON();
            clientWithGrants.grants = ['authorization_code', 'password', 'refresh_token', 'client_credentials'];
            // Todo: need to create another table for redirect URIs
            clientWithGrants.redirectUris = [clientWithGrants.redirect_uri];
            delete clientWithGrants.redirect_uri;

            return clientWithGrants;
        }).catch(function (err) {
            console.log("getClient - Err: ", err)
        });
}

function getUser(dsUsuario, dsSenha) {
    return models.Usuario
        .findOne({
            where: {dsUsuario: dsUsuario},
            attributes: ['idUsuario', 'dsUsuario', 'dsSenha', 'dsScope'],
        })
        .then(function (usuario) {
            if (!usuario) {
                return false;
            }

            return usuario.dsSenha == dsSenha ? usuario.toJSON() : false;
        })
        .catch(function (err) {
            console.log("getUser - Err: ", err)
        });
}

function saveToken(token, cliente, usuario) {

    return Promise.all([
        models.AccessToken.create({
            dsAccessToken: token.accessToken,
            dtExpiracao: token.accessTokenExpiresAt,
            idCliente: cliente.idCliente,
            idUsuario: usuario.idUsuario,
            dsScope: token.scope
        }),
        token.refreshToken ? models.RefreshToken.create({ // no refresh token for client_credentials
                ds_refresh_token: token.refreshToken,
                dtExpiracao: token.refreshTokenExpiresAt,
                idCliente: cliente.idCliente,
                idUsuario: usuario.idUsuario,
                dsScope: token.scope
            }) : [],

    ])
        .then(function (resultsArray) {
            return Object.assign(  // expected to return cliente and Usuario, but not returning
                {
                    client: mountClientObject(cliente),
                    user: mountUserObject(usuario),
                    access_token: token.accessToken, // proxy
                    refresh_token: token.refreshToken, // proxy
                },
                token
            )
        })
        .catch(function (err) {
            console.log("revokeToken - Err: ", err)
        });
}

function validateScope(usuario, cliente, scope) {
    return true;
    // return (Usuario.scope === scope && cliente.scope === scope && scope !== null) ? scope : false
}

function getAccessToken(bearerToken) {
    return models.AccessToken
        .findOne({
            where: {dsAccessToken: bearerToken},
            attributes: [['dsAccessToken', 'accessToken'], ['dtExpiracao', 'accessTokenExpiresAt'], 'dsScope',['idAccessToken', 'id']],
            include: [
                {
                    model: models.Usuario,
                    attributes: ['idUsuario', 'dsUsuario', 'dsScope'],
                },
                models.Cliente
            ],
        })
        .then(function (accessToken) {
            if (!accessToken) {
                return false;
            }

            var token = accessToken.toJSON();
            token.user = mountUserObject(token.Usuario);
            token.client = mountClientObject(token.Cliente);
            token.scope = token.scope;
            return token;
        })
        .catch(function (err) {
            console.log("getAccessToken - Err: ")
        });
}

/**
 * Monta o objeto de Usuario conforme o oauth driver entende
 * */
function mountUserObject(usuario) {
    return {
        id: usuario.idUsuario,
        username: usuario.dsUsuario,
        password: usuario.dsSenha,
        scope: usuario.dsScope,
    }
}

/**
 * Monta o objeto de cliente conforme o oauth driver entende
 * */
function mountClientObject(cliente) {
    return {
        id: cliente.idCliente,
        name: cliente.no_cliente,
        client_id: cliente.ds_idCliente,
        client_secret: cliente.dsClienteSegredo,
        redirect_uri: cliente.ds_redirect_uri,
        grant_types: cliente.ds_grant_types,
        scope: cliente.dsScope,
    }
}

module.exports = {
    // generateAccessToken,
    // generateRefreshToken,
    getClient,
    getUser,
    saveToken,
    validateScope,
    getAccessToken
};