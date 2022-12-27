//Export a function that defines the model
module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    'Credits',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
    },
    { timestamps: false }
  );
};
