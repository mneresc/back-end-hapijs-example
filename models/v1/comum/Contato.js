/* jshint indent: 2 */
'use strict';
module.exports = function (sequelize, DataTypes) {
    var Contato =  sequelize.define('Contato', {
        idContato: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            field: 'id_contato'
        },
        dsContato: {
            type: DataTypes.STRING(300),
            allowNull: false,
            field: 'ds_contato'
        },
        stContato: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'st_contato'
        }
    }, {
        tableName: 'tb_contato',
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'comum',
        classMethods: {
            associate: function associate(models) {
                Contato.belongsTo(models.Pessoa, {foreignKey: 'idPessoa'});
                Contato.belongsTo(models.TipoContato, {foreignKey: 'id_tipo_contato'});
            },
        },
    });
    return Contato;
};
