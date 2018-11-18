/* jshint indent: 2 */
'use strict';
module.exports = function (sequelize, DataTypes) {
    var Pessoa = sequelize.define('Pessoa', {
        idPessoa: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            field: 'id_pessoa'
        },
        noPessoa: {
            type: DataTypes.STRING(150),
            allowNull: false,
            field: 'no_pessoa'
        },
        stPessoa: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'st_pessoa'
        }
    }, {
        tableName: 'tb_pessoa',
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'comum',
        classMethods: {
            associate: function associate(models) {
                Pessoa.hasMany(models.Contato, {foreignKey: 'id_pessoa', sourceKey: 'id_pessoa'});
            },
        },
    });
    return Pessoa;
};
