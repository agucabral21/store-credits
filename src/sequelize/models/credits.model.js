//Export a function that defines the model
module.exports = (sequelize, DataTypes) => {
  sequelize.define('Credits', {
    amount: {
      type: DataTypes.INTEGER,
    },
  });
};
