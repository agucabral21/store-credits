function addModelRelations(sequelize) {
  const { Client, Credits, Store } = sequelize.models;
  Client.belongsToMany(Store, { as: 'regularStore', through: Credits, foreignKey: 'clientId' });
  Store.belongsToMany(Store, { as: 'regularClient', through: Credits, foreignKey: 'storeId' });
}
module.exports = { addModelRelations };
