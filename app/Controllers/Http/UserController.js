'use strict'

class UserController {
  async login({ request, response, auth }) {
    const { username, password } = request.all()

    try {
      await auth.check()
      return 'Already logged in'
    } catch(e) {
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
}

module.exports = UserController
