'use strict'

const Template = use('App/Models/Template')
const TemplateNotFoundException = use(
  'App/Exceptions/TemplateNotFoundException'
)

class TemplateController {
  async edit({ request, params, view, response, auth }) {
    const debug = request.input('debug')
    try {
      await auth.check()
    } catch (error) {
      response.redirect('/admin#/login')
    }

    const template = await Template.find(params.id)
    if (!template) {
      throw new TemplateNotFoundException()
    }

    if (typeof debug !== 'undefined') {
      return page
    } else {
      return view.render('template.edit', { template })
    }
  }

  async editStore({ request, params, view, response }) {
    const template = await Template.find(params.id)
    const body = request.post()
    template.json = body
    return await template.save()
  }

  async editLoad({ request, params, view, response }) {
    const template = await Template.find(params.id)
    return template.json
  }

  async show({ request, params, view, response }) {
    const { id } = params
    const template = await Template.findBy('id', id)
    if (!template) {
      throw new TemplateNotFoundException()
    }
    return view.render('template.view', { template })
  }

  async index({ request, response, params }) {
    const [offset, limit] = JSON.parse(request.input('range'))
    const [field, order] = JSON.parse(request.input('sort'))
    const { status, name } = JSON.parse(request.input('filter'))

    let query = Template.query()

    if (status) {
      query = query.where('status', status)
    }

    if (name) {
      query = query.where('name', 'like', `%${name}%`)
    }
    query = query.orderBy(field, order).paginate(offset / limit + 1, limit)

    return await query
  }

  async store({ request, response }) {
    const template = new Template()
    const body = request.only(['name', 'status', 'json'])

    template.merge(body)
    await template.save()
    return template
  }

  async fetch({ params, request, response, view }) {
    return await Template.find(params.id)
  }

  async update({ params, request, response }) {
    const template = await Template.find(params.id)
    const body = request.only(['name', 'status'])

    template.merge(body)
    await template.save()
    return template
  }

  async delete({ params, request, response }) {
    const template = await Template.find(params.id)
    await template.delete()
    return template
  }

  async destroy({ params, request, response }) {
    const { id } = JSON.parse(request.input('filter'))
    const deletedTemplates = await Template.query()
      .whereIn('id', id)
      .fetch()

    await Template.query()
      .whereIn('id', id)
      .delete()

    return deletedTemplates
  }
}

module.exports = TemplateController
