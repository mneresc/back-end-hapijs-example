/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';


module.exports = function (sequelize, DataTypes) {
    const Perfil = sequelize.define('Perfil', {
        idPerfil: {
            type: DataTypes.INTEGER(14),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field: 'id_perfil'
        },
        noProfile: {
            type:DataTypes.STRING(100),
            field: 'no_profile'
        },
        stPerfil: {
            type:DataTypes.BOOLEAN,
            field: 'st_perfil'

        }
    }, {
        tableName: 'tb_perfil',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'autenticacao',
        classMethods: {
            associate: function (models) {
                /*Perfil.hasMany(models.PerfilRecurso, {
                    foreignKey: 'id_perfil',
                });*/
                Perfil.belongsToMany(models.Usuario, {through: models.PerfilUsuario,  foreignKey: 'id_perfil', otherKey: 'id_usuario'})
                Perfil.belongsToMany(models.Recurso, {through: models.PerfilRecurso, foreignKey: 'id_perfil', otherKey: 'id_recurso'})
            },
        },
    });

    return Perfil;
};
