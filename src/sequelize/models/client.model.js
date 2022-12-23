//Export a function that defines the model
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mail: {
        type: DataTypes.CHAR,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    { timestamps: false }
  );
};
