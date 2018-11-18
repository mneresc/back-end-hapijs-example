/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';


module.exports = function (sequelize, DataTypes) {
    const Recurso = sequelize.define('Recurso', {
        idRecurso: {
            type: DataTypes.INTEGER(14),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field: 'id_recurso'
        },
        noRecurso: {
            type: DataTypes.STRING(100),
            field:'no_recurso'
        },
        dsUrlRecurso: {
            type:DataTypes.STRING,
            field:'ds_url_recurso'
        },
        noMetodo: {
            type: DataTypes.BOOLEAN,
            field:'no_metodo'
        }
    }, {
        tableName: 'tb_recurso',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'autenticacao',
        classMethods: {
            associate: function (models) {
                Recurso.belongsTo(models.Metodo, {
                    foreignKey: 'id_metodo',
                });
                Recurso.belongsToMany(models.Perfil, {
                    through: models.PerfilRecurso,
                    foreignKey: 'id_recurso',
                    otherKey: 'id_perfil'
                })

            },
        },
    });

    return Recurso;
};
