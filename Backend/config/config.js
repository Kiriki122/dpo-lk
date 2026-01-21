module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "dev_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "username",
    password: "password",
    database: "db123_test",
    host: "db",
    port: 5432,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER ||"username",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "db123_prod",
    host: process.env.DB_HOST ||"db",
    port: 5432,
    dialect: "postgres",
  },
};
