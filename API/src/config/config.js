require('dotenv').config();

module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: process.env.t_username,
    password: process.env.t_password || '',
    database: process.env.t_database,
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: 'root',
    password: null,
    database: 'cinema',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
};
