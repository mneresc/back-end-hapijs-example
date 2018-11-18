/**
 * Created by Manjesh on 14-05-2016.
 */

module.exports = function(sequelize, DataTypes) {
  var Scope = sequelize.define('Scope',  {
    idScope: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      field:'id_scope'
    },
    dsScope:{
      type:  DataTypes.STRING(80),
      field:'ds_scope'
    },
    stDefault: {
      type:DataTypes.BOOLEAN,
      field:'st_default'
    }
  }, {
    tableName: 'tb_scopes',
    timestamps: false,
    underscored: true,
      createdAt: false,
      updatedAt: false,
      schema: 'autenticacao'
  })

  return Scope;
}