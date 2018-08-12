'use strict'

class PostController {
  index({ request, response, params }) {
    return use('App/Mocks/Post').index({ request, response, params })
  }
}

module.exports = PostController
