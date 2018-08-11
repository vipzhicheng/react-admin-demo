'use strict'

class PostController {
  index({ request }) {
    return use('App/Mocks/Post').index({ request })
  }
}

module.exports = PostController
