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
  async index ({ request, response, params }) {
    const [ offset, limit ] = JSON.parse(request.input('range'))
    return await Page.query().paginate(offset / limit + 1, limit)

  }

  /**
   * Render a form to be used for creating a new page.
   * GET pages/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new page.
   * POST pages
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single page.
   * GET pages/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing page.
   * GET pages/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update page details.
   * PUT or PATCH pages/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a page with id.
   * DELETE pages/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PageController
