/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';

module.exports = function RefreshTokenModel(sequelize, DataTypes) {
    const RefreshToken = sequelize.define('RefreshToken', {
        idRefreshToken: {
            type: DataTypes.INTEGER(14),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field:'id_refresh_token'
        },
        dsRefreshToken: {
            type: DataTypes.STRING(256),
            field: 'ds_refresh_token'
        },
        dtExpiracao: {
            type: DataTypes.DATE,
            field: 'dt_expiracao'
        },
        dsScope: {
            type: DataTypes.STRING,
            field: 'ds_scope'
        }
    }, {
        tableName: 'tb_refresh_tokens',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'autenticacao',
        classMethods: {
            associate: function associate(models) {
                RefreshToken.belongsTo(models.Cliente, {
                    foreignKey: 'id_cliente',
                });

                RefreshToken.belongsTo(models.Usuario, {
                    foreignKey: 'id_usuario',
                });
            },
        },
    });

    return RefreshToken;
};
