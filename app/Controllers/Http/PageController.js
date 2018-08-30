'use strict'

const Page = use('App/Models/Page')
const PageNotFoundException = use('App/Exceptions/PageNotFoundException')

class PageController {
  async edit({ request, params, view, response, auth }) {
    try {
      await auth.check()
    } catch (error) {
      response.redirect('/admin#/login')
    }

    const page = await Page.find(params.id)
    if (!page) {
      throw new PageNotFoundException()
    }
    return view.render('page.edit', { page })
  }

  async editStore({ request, params, view, response }) {
    const page = await Page.find(params.id)
    const body = request.post()
    page.json = body
    return await page.save()
  }

  async editLoad({ request, params, view, response }) {
    const page = await Page.find(params.id)
    return page.json
  }

  async show({ request, params, view, response }) {
    const { path } = params
    const page = await Page.findBy('path', path)
    if (!page) {
      throw new PageNotFoundException()
    }
    console.log(page)
    return view.render('page.view', { page })
  }

  async index({ request, response, params }) {
    const [offset, limit] = JSON.parse(request.input('range'))
    const [field, order] = JSON.parse(request.input('sort'))
    return await Page.query()
      .orderBy(field, order)
      .paginate(offset / limit + 1, limit)
  }

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

  async fetch({ params, request, response, view }) {
    return await Page.find(params.id)
  }

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

  async delete({ params, request, response }) {
    const page = await Page.find(params.id)
    await page.delete()
    return page
  }

  async destroy({ params, request, response }) {
    const { id } = JSON.parse(request.input('filter'))
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
