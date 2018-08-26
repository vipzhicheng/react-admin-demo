'use strict'

const Page = use('App/Models/Page')

/**
 * Resourceful controller for interacting with pages
 */
class PageController {
  /**
   * Show a list of all pages.
   * GET pages
   */
  async index({ request, response, params }) {
    const [offset, limit] = JSON.parse(request.input('range'))
    return await Page.query().paginate(offset / limit + 1, limit)
  }

  /**
   * Render a form to be used for creating a new page.
   * GET pages/create
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new page.
   * POST pages
   */
  async store({ request, response }) {}

  /**
   * Display a single page.
   * GET pages/:id
   */
  async show({ params, request, response, view }) {
    return await Page.find(params.id)
  }

  /**
   * Render a form to update an existing page.
   * GET pages/:id/edit
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update page details.
   * PUT or PATCH pages/:id
   */
  async update({ params, request, response }) {
    const page = await Page.find(params.id)
    const body = request.only([
      'admin_title',
      'title',
      'description',
      'keywords'
    ])
    page.merge(body)
    await page.save()
    return page
  }

  /**
   * Delete a page with id.
   * DELETE pages/:id
   */

  async delete({ params, request, response }) {
    const page = await Page.find(params.id)
    await page.delete()
    return page
  }

  async destroy({ params, request, response }) {
    const { id } = JSON.parse(request.input('filter'))
    console.log(id)
    console.log([1])
    const deletedPages = await Page.query()
      .whereIn('id', id)
      .fetch()

    await Page.query()
      .whereIn('id', id)
      .delete()

    return deletedPages
  }
}

module.exports = PageController
