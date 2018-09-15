'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')
const { PAGE_TYPE_OPTIONS, PAGE_STATUS_OPTIONS, TEMPLATE_STATUS_OPTIONS, USER_STATUS_OPTIONS } = use('App/Constants')

Route.get('/', () => 'tbd')
Route.on('/admin').render('admin')
Route.get('/page/:id/edit', 'PageController.edit')
Route.get('/page/:slug', 'PageController.show')
Route.get('/template/:id/edit', 'TemplateController.edit')
Route.get('/template/:id', 'TemplateController.show')

Route.group(() => {
  Route.get('/', () => {
    return 'ok'
  })

  // 常量接口
  Route.get('/options', () => {
    return { PAGE_TYPE_OPTIONS, PAGE_STATUS_OPTIONS, TEMPLATE_STATUS_OPTIONS, USER_STATUS_OPTIONS }
  })

  // 用户相关
  Route.post('user/login', 'UserController.login')
  Route.get('user/check', 'UserController.check')
  Route.get('user/logout', 'UserController.logout')
  Route.get('users', 'UserController.index').middleware('auth')
  Route.post('users', 'UserController.store').middleware('auth')
  Route.put('users/:id', 'UserController.update')
    .middleware('auth')
    .validator('SaveUser')
  Route.get('users/:id', 'UserController.fetch')

  // 演示接口
  Route.get('posts', 'PostController.index').middleware('auth')

  // 页面接口
  Route.get('pages', 'PageController.index').middleware('auth')
  Route.delete('pages', 'PageController.destroy').middleware('auth')
  Route.post('pages', 'PageController.store').middleware('auth')
  Route.get('pages/:id', 'PageController.fetch')
  Route.put('pages/:id', 'PageController.update').middleware('auth')
  Route.delete('pages/:id', 'PageController.delete').middleware('auth')

  Route.post('pages/:id/edit/store', 'PageController.editStore').middleware('auth')
  Route.get('pages/:id/edit/load', 'PageController.editLoad').middleware('auth')
  Route.post('pages/:id/upload/assets', 'PageController.upload').middleware('auth')

  // 模板接口
  Route.get('templates', 'TemplateController.index').middleware('auth')
  Route.delete('templates', 'TemplateController.destroy').middleware('auth')
  Route.post('templates', 'TemplateController.store').middleware('auth')
  Route.get('templates/:id', 'TemplateController.fetch')
  Route.put('templates/:id', 'TemplateController.update').middleware('auth')
  Route.delete('templates/:id', 'TemplateController.delete').middleware('auth')

  Route.post('templates/:id/edit/store', 'TemplateController.editStore').middleware('auth') // 只用于编辑器
  Route.get('templates/:id/edit/load', 'TemplateController.editLoad').middleware('auth') // 只用于编辑器

  Route.get('media', 'MediaController.index').middleware('auth')
}).prefix('api')
