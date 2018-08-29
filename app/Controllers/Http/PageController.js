'use strict'

const Page = use('App/Models/Page')
const PageNotFoundException = use('App/Exceptions/PageNotFoundException')
/**
 * Resourceful controller for interacting with pages
 */
class PageController {
  async edit({ request, params, view, response }) {
    const page = await Page.find(params.id)
    if (!page) {
      throw new PageNotFoundException()
    }
    return view.render('page.edit1', { page })
  }

  async editStore({ request, params, view, response }) {
    const page = await Page.find(params.id)
    const body = request.post()
    page.json = body
    return await page.save()
  }

  async show({ request, params, view, response }) {
    const { path } = params
    const page = await Page.findBy('path', path)
    if (!page) {
      throw new PageNotFoundException()
    }
    return view.render('page.view', { page })
  }

  /**
   * Show a list of all pages.
   * GET pages
   */
  async index({ request, response, params }) {
    const [offset, limit] = JSON.parse(request.input('range'))
    const [field, order] = JSON.parse(request.input('sort'))
    return await Page.query()
      .orderBy(field, order)
      .paginate(offset / limit + 1, limit)
  }

  /**
   * Create/save a new page.
   * POST pages
   */
  async store({ request, response }) {
    const page = new Page()
    const body = request.only([
      'admin_title',
      'path',
      'title',
      'description',
      'keywords',
      'type',
      'status',
      'start_time',
      'end_time'
    ])
    page.merge(body)
    await page.save()
    return page
  }

  /**
   * Display a single page.
   * GET pages/:id
   */
  async fetch({ params, request, response, view }) {
    return await Page.find(params.id)
  }

  /**
   * Update page details.
   * PUT or PATCH pages/:id
   */
  async update({ params, request, response }) {
    const page = await Page.find(params.id)
    const body = request.only([
      'admin_title',
      'path',
      'title',
      'description',
      'keywords',
      'type',
      'status',
      'start_time',
      'end_time'
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
