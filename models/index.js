const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  });
  const db = {};

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.measurements = require('./measurements-model')(sequelize, Sequelize.DataTypes);
  db.user = require('./user-model')(sequelize, Sequelize.DataTypes);
  module.exports = db