'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserTask extends sequelize.Sequelize.Model {
    static associate (models) {
      UserTask.belongsTo(models.User)
      UserTask.belongsTo(models.Task)
    }
  }
  UserTask.init({
    UserId: DataTypes.INTEGER,
    TaskId: DataTypes.INTEGER
  }, {
    sequelize
  });

  return UserTask;
};