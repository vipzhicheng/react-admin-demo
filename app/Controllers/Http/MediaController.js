'use strict'

/**
 * Resourceful controller for interacting with media
 */
class MediaController {
  /**
   * Show a list of all media.
   * GET media
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new media.
   * GET media/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new media.
   * POST media
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single media.
   * GET media/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing media.
   * GET media/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update media details.
   * PUT or PATCH media/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a media with id.
   * DELETE media/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MediaController
