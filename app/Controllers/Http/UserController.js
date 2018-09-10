'use strict'

const User = use('App/Models/User')

class UserController {
  async login({ request, response, auth }) {
    const { username, password } = request.all()

    try {
      await auth.check()
      return 'Already logged in'
    } catch (e) {
      await auth.attempt(username, password)
      return 'Logged in successfully'
    }
  }

  async check({ auth }) {
    await auth.check()
    return 'Logged in'
  }

  async logout({ auth }) {
    await auth.logout()
    return 'Logged out successfully'
  }

  async index({ request, response, params }) {
    const [offset, limit] = JSON.parse(request.input('range'))
    const [field, order] = JSON.parse(request.input('sort'))
    const { username } = JSON.parse(request.input('filter'))

    let query = User.query()

    if (username) {
      query = query.where('username', 'like', `%${username}%`)
    }
    query = query.orderBy(field, order).paginate(offset / limit + 1, limit)

    return await query
  }
}

module.exports = UserController
