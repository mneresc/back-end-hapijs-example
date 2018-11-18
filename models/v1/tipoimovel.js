'use strict';
module.exports = function (sequelize, DataTypes) {
    var TipoImovel = sequelize.define('TipoImovel', {
        id_tipo_imovel: {type: DataTypes.INTEGER, primaryKey: true},
        ds_tipo_imovel: DataTypes.STRING
    }, {
        tableName: 'tb_tipo_imovel',
        createdAt: false,
        updatedAt: false,
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                TipoImovel.hasMany(models.Imovel,  { foreignKey: 'id_tipo_imovel' })
            }
        }
    });
    return TipoImovel;
};