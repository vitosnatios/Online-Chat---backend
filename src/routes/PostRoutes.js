const express = require('express');
const PostController = require('../controllers/PostController');

class PostRoutes {
  #router = express.Router();
  #controller = new PostController();

  constructor() {
    this.#initializeRoutes();
  }

  #initializeRoutes() {
    this.#router.get(
      '/getPosts',
      this.#controller.getPosts.bind(this.#controller)
    );
    this.#router.post(
      '/addPost',
      this.#controller.addPost.bind(this.#controller)
    );
    this.#router.get('/health', this.#controller.health.bind(this.#controller));
  }

  getRouter() {
    return this.#router;
  }
}

module.exports = PostRoutes;
