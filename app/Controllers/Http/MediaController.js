'use strict'

const Media = use('App/Models/Media')

/**
 * Resourceful controller for interacting with media
 */
class MediaController {
  async index({ request, response, params }) {
    const [offset, limit] = JSON.parse(request.input('range'))
    const [field, order] = JSON.parse(request.input('sort'))
    const { reference_id, file_name } = JSON.parse(request.input('filter'))

    let query = Media.query()

    if (reference_id) {
      query = query.where('reference_id', reference_id)
    }

    if (file_name) {
      query = query.where('file_name', 'like', `%${file_name}%`)
    }

    query = query.orderBy(field, order).paginate(offset / limit + 1, limit)

    return await query
  }

  /**
   * Render a form to be used for creating a new media.
   * GET media/create
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new media.
   * POST media
   */
  async store({ request, response }) {}

  /**
   * Display a single media.
   * GET media/:id
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing media.
   * GET media/:id/edit
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update media details.
   * PUT or PATCH media/:id
   */
  async update({ params, request, response }) {}

  /**
   * Delete a media with id.
   * DELETE media/:id
   */
  async destroy({ params, request, response }) {}
}

module.exports = MediaController
