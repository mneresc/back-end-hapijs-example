/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';


module.exports = function (sequelize, DataTypes) {
    const PerfilRecurso = sequelize.define('PerfilRecurso', {
        idPerfilRecurso: {
            type: DataTypes.INTEGER(14),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field:'id_perfil_recurso'
        },
        noProfile: {
            type: DataTypes.STRING(100),
            field: 'no_profile'
        },
        stPerfil: {
            type:DataTypes.BOOLEAN,
            field:'st_perfil'
        }
    }, {
        tableName: 'tb_perfil_recurso',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'autenticacao',
        /*classMethods: {
         associate: function (models) {
         PerfilRecurso.belongsTo(models.Recurso, {
         foreignKey: 'id_recurso',
         });
         PerfilRecurso.belongsTo(models.Perfil, {
         foreignKey: 'id_perfil',
         });

         },
         },*/
    });

    return PerfilRecurso;
};
