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
const { PAGE_TYPE_OPTIONS } = use('App/Constants')

Route.on('/admin').render('admin')

Route.group(() => {
  Route.get('/', () => {
    return 'ok'
  })

  // 常量接口
  Route.get('/options', () => {
    return { PAGE_TYPE_OPTIONS }
  })

  // 用户相关
  Route.post('user/login', 'UserController.login')
  Route.get('user/check', 'UserController.check')
  Route.get('user/logout', 'UserController.logout')

  // 演示接口
  Route.get('posts', 'PostController.index').middleware('auth')

  // 页面接口
  Route.get('pages', 'PageController.index').middleware('auth')


}).prefix('api')
