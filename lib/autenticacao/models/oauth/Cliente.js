/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';

module.exports = function AppModel(sequelize, DataTypes) {
    const Cliente = sequelize.define('Cliente', {
        idCliente: {
            type: DataTypes.INTEGER(14),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field: 'id_cliente'
        },
        noCliente: {
            type: DataTypes.STRING(255),
            field: 'no_cliente'
        },
        dsIdCliente: {
            type: DataTypes.STRING(80),
            field: 'ds_id_cliente'
        },
        dsClienteSegredo: {
            type: DataTypes.STRING(80),
            field: 'ds_cliente_segredo'
        },
        dsRedirectUri: {
            type: DataTypes.STRING(2000),
            field: 'ds_redirect_uri'
        },
        dsGrantTypes: {
            type: DataTypes.STRING(80),
            field: 'ds_grant_types'
        },
        dsScope: {
            type: DataTypes.STRING,
            field: 'ds_scope'
        }
    }, {
        tableName: 'tb_cliente',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'autenticacao',
        classMethods: {
            associate: function associate(models) {
                Cliente.belongsTo(models.Usuario, {
                    foreignKey: 'id_usuario',
                });
            },
        },
    });

    return Cliente;
};
