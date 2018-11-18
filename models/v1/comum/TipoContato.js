/* jshint indent: 2 */
'use strict';
module.exports = function (sequelize, DataTypes) {
    var TipoContato = sequelize.define('TipoContato', {
        idTipoContato: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_tipo_contato'
        },
        noTipoContato: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'no_tipo_contato'
        },
        stTipoContato: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'st_tipo_contato'
        }
    }, {
        tableName: 'tb_tipo_contato',
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'comum'
    });
    return TipoContato;
};
