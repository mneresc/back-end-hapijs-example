/* jshint indent: 2 */
'use strict';
module.exports = function (sequelize, DataTypes) {
    var PessoaFisica = sequelize.define('PessoaFisica', {
        idPessoaFisica: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            field: 'id_pessoa_fisica'
        },
        nuCpf: {
            type: DataTypes.CHAR(11),
            allowNull: true,
            field: 'nu_cpf'
        }
    }, {
        tableName: 'tb_pessoa_fisica',
        underscored: true,
        createdAt: false,
        updatedAt: false,
        schema: 'comum',
        classMethods: {
            associate: function associate(models) {
                PessoaFisica.belongsTo(models.Pessoa, {foreignKey: 'idPessoa'});
            },
        },
    });

    return PessoaFisica;
};
