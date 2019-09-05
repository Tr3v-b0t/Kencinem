module.exports = {
  development: {
    username: "root",
    password: '',
    database: "cinema",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: 'bendeh911',
    database: "test-cinema",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "cinema",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
