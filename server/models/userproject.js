'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define('UserProject', {
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {});
  UserProject.associate = function(models) {
    // associations can be defined here
  };
  return UserProject;
};