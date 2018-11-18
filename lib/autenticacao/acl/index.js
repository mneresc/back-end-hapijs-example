const modelsAcl = require('./../models/index');

function initAclModels() {
    return modelsAcl.sequelize.sync({force:true});
}


function getAccessToken(userId, resource, method) {
  return models.modelsAcl
    .findOne({
      where: {
          access_token: resource,
          access_token: bearerToken,
          access_token: bearerToken
      },
      attributes: [['access_token', 'accessToken'], ['expires', 'accessTokenExpiresAt'],'scope'],
      include: [
        {
          model: models.User,
          attributes: ['id', 'username'],
        }, models.OAuthClient
      ],
    })
    .then(function (accessToken) {
      if (!accessToken) return false;
      var token = accessToken.toJSON();
      token.user = token.User;
      token.client = token.OAuthClient;
      token.scope = token.scope
      return token;
    })
    .catch(function (err) {
      console.log("getAccessToken - Err: ")
    });
}

module.exports = {
    initAclModels
};