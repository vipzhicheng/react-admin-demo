'use strict'

const Page = use('App/Models/Page')
const Template = use('App/Models/Template')
const Media = use('App/Models/Media')
const PageNotFoundException = use('App/Exceptions/PageNotFoundException')
const Helpers = use('Helpers')
const fs = require('fs')
const path = require('path')

class PageController {
  async edit({ request, params, view, response, auth }) {
    const debug = request.input('debug')
    try {
      await auth.check()
    } catch (error) {
      response.redirect('/admin#/login')
    }

    const page = await Page.find(params.id)
    if (!page) {
      throw new PageNotFoundException()
    }

    if (page.template_id) {
      page.template = await Template.find(page.template_id)
    }

    page.mediaLoaded = await page
      .media()
      .where('reference_type', 'page')
      .fetch()

    if (typeof debug !== 'undefined') {
      return page
    } else {
      return view.render('page.edit', { page })
    }
  }

  async editStore({ request, params, view, response }) {
    const page = await Page.find(params.id)
    const body = request.post()
    page.json = body
    return await page.save()
  }

  async editLoad({ request, params, view, response }) {
    const page = await Page.find(params.id)

    if (page.template_id) {
      page.template = await Template.find(page.template_id)

      if (!page.json && page.template.json) {
        page.json = page.template.json
      }
    }

    if (page.json) {
      delete page.json['gjs-assets']
    }

    return page.json || {}
  }

  async upload({ request, params, response }) {
    const page = await Page.find(params.id)
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

    await Media.createMany(uploadedData)

    return { data: uploadedFiles }
    // console.log(files.movedList())

    // const profilePic = request.file('files', {
    //   types: ['image'],
    //   size: '2mb'
    // })

    // await profilePic.move(Helpers.tmpPath('uploads'), {
    //   name: 'custom-name.jpg'
    // })

    // if (!profilePic.moved()) {
    //   return profilePic.error()
    // }
    // return 'File moved'
  }

  async show({ request, params, view, response }) {
    const { slug } = params
    const page = await Page.findBy('slug', slug)
    if (!page) {
      throw new PageNotFoundException()
    }

    if (page.template_id) {
      page.template = await Template.find(page.template_id)
    }

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
      'template_id',
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
      'template_id',
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

    // TODO: also delete attachments
    await page
      .media()
      .where('reference_type', 'page')
      .delete()
    await page.delete()
    return page
  }

  async destroy({ params, request, response }) {
    const { id } = JSON.parse(request.input('filter'))
    const deletedPages = await Page.query()
      .whereIn('id', id)
      .fetch()

    // TODO: also delete attachments
    await Promise.all(
      deletedPages.rows.map(page => {
        return page
          .media()
          .where('reference_type', 'page')
          .delete()
      })
    )

    await Page.query()
      .whereIn('id', id)
      .delete()

    return deletedPages
  }
}

module.exports = PageController
