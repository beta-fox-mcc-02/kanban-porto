'use strict';
module.exports = (sequelize, DataTypes) => {

  class Task extends sequelize.Sequelize.Model {
    static associate (models) {
      Task.hasMany(models.UserTask)
      Task.belongsTo(models.Category)
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `title can't be empty`
        }      
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `title can't be empty`
        }        
      }
    }
  }, {
    sequelize
  });

  return Task;
};