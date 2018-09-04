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
    const { slug } = params
    const page = await Page.findBy('slug', slug)
    if (!page) {
      throw new PageNotFoundException()
    }
    console.log(page)
    return view.render('page.view', { page })
  }

  async index({ request, response, params }) {
    const [offset, limit] = JSON.parse(request.input('range'))
    const [field, order] = JSON.parse(request.input('sort'))
    const { status, type, admin_title } = JSON.parse(request.input('filter'))

    let query = Page.query()

    if (type) {
      query = query.where('type', type)
    }

    if (status) {
      query = query.where('status', status)
    }

    if (admin_title) {
      query = query.where('admin_title', 'like', `%${admin_title}%`)
    }
    query = query.orderBy(field, order).paginate(offset / limit + 1, limit)

    return await query
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
      'end_time',
      'json',
      'enable_meiqia',
      'enable_sensor_analytics',
      'enable_baidu_analytics',
      'enable_growingio_analytics',
      'enable_cps'
    ])

    body.enable_meiqia = body.enable_meiqia ? 1 : 0
    body.enable_sensor_analytics = body.enable_sensor_analytics ? 1 : 0
    body.enable_baidu_analytics = body.enable_baidu_analytics ? 1 : 0
    body.enable_growingio_analytics = body.enable_growingio_analytics ? 1 : 0
    body.enable_cps = body.enable_cps ? 1 : 0

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
      'end_time',
      'enable_meiqia',
      'enable_sensor_analytics',
      'enable_baidu_analytics',
      'enable_growingio_analytics',
      'enable_cps'
    ])

    console.log(body)

    body.enable_meiqia = body.enable_meiqia ? 1 : 0
    body.enable_sensor_analytics = body.enable_sensor_analytics ? 1 : 0
    body.enable_baidu_analytics = body.enable_baidu_analytics ? 1 : 0
    body.enable_growingio_analytics = body.enable_growingio_analytics ? 1 : 0
    body.enable_cps = body.enable_cps ? 1 : 0

    console.log(body)

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
