'use strict'

class UserController {
  async login({ request, response, auth }) {
    const { username, password } = request.all()
    console.log({ username, password })
    await auth.attempt(username, password)
    return 'Logged in successfully'
  }

  async check({ auth }) {
    return await auth.check()
  }

  async logout({ auth }) {
    return await auth.logout()
  }
}

module.exports = UserController
