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
    latitude: DataTypes.STRING,
    latitude_server: DataTypes.STRING,
    longitude: DataTypes.STRING,
    longitude_server: DataTypes.STRING,
    is_late: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Presence',
  });
  return Presence;
};