const app = require('./app');
const { db_connect } = require('./sequelize');
const port = process.env.PORT || 3000;

db_connect()
  .then(() => {
    app.listen(port, () => console.log(`Express listening on port ${port}`));
  })
  .catch((error) => {
    console.log('Unable to connect to the database');
    console.log(error.message);
  });
