'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const { validate } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

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

  async store({ request, response }) {
    const user = new User()
    const body = request.only(['username', 'email', 'password', 'status'])
    user.merge(body)
    await user.save()
    return user
  }

  async update({ params, request, response }) {
    // const rules = {
    //   email: `required|email|unique:users,email,id,${params.id}`,
    //   password: 'required'
    // }

    // const validation = await validate(request.all(), rules)

    // if (validation.fails()) {
    //   throw new ValidationException(validation.messages())
    // }

    const user = await User.find(params.id)
    const body = request.only(['email', 'status', 'password'])

    const isSame = await Hash.verify(body.password, user.password)
    if (isSame) {
      throw new ValidationException()
    }

    user.merge(body)
    await user.save()
    return user
  }

  async fetch({ params, request, response, view }) {
    return await User.find(params.id)
  }
}

module.exports = UserController
