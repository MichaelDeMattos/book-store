const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
