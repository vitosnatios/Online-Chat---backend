const PostModel = require('../models/PostModel');

class PostController extends PostModel {
  #table = this.getTable();
  #connection = this.getConnection();

  getPosts(req, res) {
    try {
      this.#connection.connect(() => {
        const query = 'SELECT * FROM ' + this.#table;
        this.#connection.query(query, (erro, result, fields) => {
          if (!(result.length > 3500)) {
            res.json({
              data: result,
            });
          }
          const numToRemove = result.length - 3500;
          for (let i = numToRemove; i > 1; i--) {
            const toRemove = result[i - 2];
            const removeQuery = `DELETE FROM ${this.#table} WHERE username = '${
              toRemove.username
            }'
            AND imgurl = '${toRemove.imgurl}' 
            AND content = '${toRemove.content}'
            `;
            this.#connection.query(removeQuery, (err, remResult) => {
              res.json({
                data: result,
              });
            });
          }
        });
      });
    } catch (err) {
      console.log(err);
      res.json({
        data: err,
      });
    }
  }

  addPost(req, res) {
    try {
      const { username, imgurl, content } = req.body;
      this.#connection.connect((erro) => {
        const create = `INSERT INTO posts(username,imgurl,content)
              VALUES('${username}','${imgurl}','${content}')`;
        this.#connection.query(create);
        return res.json({
          status: 'ok',
        });
      });
    } catch (err) {
      return res.json({
        status: err,
      });
    }
  }

  health(req, res) {
    res.sendStatus(200);
  }
}

module.exports = PostController;
