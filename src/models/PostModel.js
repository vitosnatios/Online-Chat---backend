const DbConnection = require('../database/DbConnection');

class PostModel extends DbConnection {
  #table = 'posts';

  getTable() {
    return this.#table;
  }
}

module.exports = PostModel;
