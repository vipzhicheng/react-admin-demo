'use strict'

const Media = use('App/Models/Media')
const Page = use('App/Models/Page')
const PageNotFoundException = use('App/Exceptions/PageNotFoundException')
const Helpers = use('Helpers')
const fs = require('fs')
const path = require('path')

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
  async store({ request, response }) {
    const reference_id = request.input('reference_id')
    const page = await Page.find(reference_id)
    const removeFile = Helpers.promisify(fs.unlink)
    if (!page) {
      throw new PageNotFoundException()
    }

    const files = request.file('files', {
      types: ['image'],
      size: '2mb'
    })

    await files.moveAll(Helpers.publicPath(`uploads/pages/${page.id}`))

    if (!files.movedAll()) {
      const movedFiles = files.movedList()

      await Promise.all(
        movedFiles.map(file => {
          return removeFile(path.join(Helpers.publicPath(`uploads/pages/${page.id}`), file.fileName))
        })
      )

      return files.errors()
    }
    const uploadedFiles = []
    const uploadedData = []
    files.movedList().map(async file => {
      uploadedData.push({
        reference_id: page.id,
        reference_type: 'page',
        client_name: file.clientName,
        extname: file.extname,
        file_name: file.fileName,
        size: file.size,
        type: file.type,
        subtype: file.subtype
      })

      uploadedFiles.push(path.join(`/uploads/pages/${page.id}`, file.fileName))
    })

    const media = await Media.createMany(uploadedData)
    console.log(media)

    return { id: media[0].id }
  }

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
