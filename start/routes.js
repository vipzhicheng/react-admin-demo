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

Route.on('/admin').render('admin')

Route.group(() => {
  Route.post('signin', 'UserController.signin')
  Route.get('posts', 'PostController.index').middleware(['auth'])
}).prefix('api')
