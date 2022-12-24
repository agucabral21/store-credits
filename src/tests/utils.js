const db_truncate = async (sequelize) => {
  await sequelize.models.Credits.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
  await sequelize.models.Client.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
  await sequelize.models.Store.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
};

module.exports = { db_truncate };
