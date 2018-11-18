/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';

const moment = require('moment');

module.exports = function AuthCodeModel(sequelize, DataTypes) {
    const AuthorizationCode = sequelize.define('AuthorizationCode', {
        idAuthorizationCode: {
            type: DataTypes.INTEGER(14),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field:'id_authorization_code'
        },
        dsAuthorizationCode: {
            type:DataTypes.STRING(256),
            field: 'ds_authorization_code'
        },
        dsDataExpiracao: {
            type:DataTypes.DATE,
            field:'ds_data_expiracao'
        },
        dsRedirectUri: {
            type:DataTypes.STRING(2000),
            field:'ds_redirect_uri'
        },
        dsScope: {
            type: DataTypes.STRING,
            field:'ds_scope'
        }
    }, {
        tableName: 'tb_authorization_codes',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'autenticacao',
        classMethods: {
            associate: function associate(models) {
                AuthorizationCode.belongsTo(models.Cliente, {
                    foreignKey: 'id_cliente',
                });

                AuthorizationCode.belongsTo(models.Usuario, {
                    foreignKey: 'id_usuario',
                });
            },
        },
    });

    return AuthorizationCode;
};
