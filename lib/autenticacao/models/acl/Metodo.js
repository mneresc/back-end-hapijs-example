/**
 * Created by Manjesh on 14-05-2016.
 */
'use strict';


module.exports = function (sequelize, DataTypes) {
    const Metodo = sequelize.define('Metodo', {
        idMetodo: {
            type: DataTypes.INTEGER(14),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
            field: 'id_metodo'
        },
        noMetodo: {
            type: DataTypes.STRING(7),
            field: 'no_metodo'
        }
    }, {
        tableName: 'tb_metodo',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        schema: 'autenticacao',
        underscored: true
    });

    return Metodo;
};
