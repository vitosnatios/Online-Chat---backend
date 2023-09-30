const mysql = require('mysql');

class DbConnection {
  #connection;

  constructor() {
    this.#connection = this.#connect();
  }

  #connect() {
    const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE } = process.env;
    return mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DATABASE,
    });
  }

  getConnection() {
    return this.#connection;
  }
}

module.exports = DbConnection;
