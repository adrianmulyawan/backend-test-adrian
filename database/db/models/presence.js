'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Presence.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Presence.init({
    user_id: DataTypes.INTEGER,
    presance_date: DataTypes.DATE,
    clock_in_at: DataTypes.TIME,
    clock_out_at: DataTypes.TIME,
    ip_address: DataTypes.STRING,
    latitude_in: DataTypes.STRING,
    latitude_out: DataTypes.STRING,
    latitude_server_in: DataTypes.STRING,
    latitude_server_out: DataTypes.STRING,
    longitude_in: DataTypes.STRING,
    longitude_out: DataTypes.STRING,
    longitude_server_in: DataTypes.STRING,
    longitude_server_out: DataTypes.STRING,
    is_late: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Presence',
  });
  return Presence;
};