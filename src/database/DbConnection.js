const mysql = require('mysql');

class DbConnection {
  #connection;

  constructor() {
    this.#connection = this.#connect();
  }

  #connect() {
    const { HOST, USER, PASSWORD, DATABASE } = process.env;
    return mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
    });
  }

  getConnection() {
    return this.#connection;
  }
}

module.exports = DbConnection;
