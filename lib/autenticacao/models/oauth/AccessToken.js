/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';


module.exports = function (sequelize, DataTypes) {
    const AccessToken = sequelize.define('AccessToken', {
        idAccessToken: {
            type: DataTypes.INTEGER(14),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field:'id_access_token'
        },
        dsAccessToken:{
            type: DataTypes.STRING(256),
            field:'ds_access_token'
        },
        dtExpiracao:{
            type: DataTypes.DATE,
            field:'dt_expiracao'
        },
        dsScope: {
            type:DataTypes.STRING,
            field:'ds_scope'

        }
    }, {
        tableName: 'tb_access_tokens',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'autenticacao',
        classMethods: {
            associate: function (models) {
                AccessToken.belongsTo(models.Cliente, {
                    foreignKey: 'id_cliente',
                });

                AccessToken.belongsTo(models.Usuario, {
                    foreignKey: 'id_usuario',
                });
            },
        },
    });

    return AccessToken;
};
