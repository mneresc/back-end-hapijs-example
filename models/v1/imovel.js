'use strict';
module.exports = function (sequelize, DataTypes) {
    var Imovel = sequelize.define('Imovel', {
        id_imovel: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ds_endereco_imovel: DataTypes.STRING
    }, {
        tableName: 'tb_imovel',
        createdAt: false,
        updatedAt: false,
        schema: 'imovel',
        name: {
            singular: 'Imovel',
            plural: 'Imoveis'
        },
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                Imovel.belongsTo(models.TipoImovel, {foreignKey: 'id_tipo_imovel'});
            }
        }
    });
    return Imovel;
};