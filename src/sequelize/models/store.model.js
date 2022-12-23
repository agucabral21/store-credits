//Export a function that defines the model
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    'Store',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.CHAR,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
