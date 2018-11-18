/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';
const modelsComuns = require('../../../../models/v1/comum');
module.exports = function (sequelize, DataTypes) {
    var Usuario = sequelize.define('Usuario', {
        idUsuario: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field:'id_usuario'
        },
        dsUsuario: {
            type:DataTypes.STRING(150),
            allowNull: false,
            field:'ds_usuario'
        },
        dsSenha: {
            type: DataTypes.STRING(32),
            allowNull: false,
            field:'ds_senha'
        },
        dsScope: {
            type:DataTypes.STRING,
            field:'ds_scope'
        }
    }, {
        tableName: 'tb_usuario', // oauth_users
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'autenticacao',
        classMethods: {
            associate: function associate(models) {
                Usuario.belongsTo(modelsComuns.Pessoa, {foreignKey: 'id_pessoa'});
                Usuario.belongsToMany(models.Perfil, {through: models.PerfilUsuario, foreignKey: 'id_usuario', otherKey: 'id_perfil'});
            },
        },
    });

    return Usuario;
}

