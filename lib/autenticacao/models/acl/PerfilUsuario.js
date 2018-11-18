/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';


module.exports = function (sequelize, DataTypes) {
    const PerfilUsuario = sequelize.define('PerfilUsuario', {
        idPerfilUsuario: {
            type: DataTypes.INTEGER(14),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field: 'id_perfil_usuario'
        },
        noProfile: {
            type: DataTypes.STRING(100),
            field: 'no_profile'
        },
        stPerfil: {
            type: DataTypes.BOOLEAN,
            field: 'st_perfil'
        }
    }, {
        tableName: 'tb_perfil_usuario',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'autenticacao',
    });

    return PerfilUsuario;
};
