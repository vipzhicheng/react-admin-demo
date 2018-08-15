'use strict'

class UserController {
  async signin({ request, response, auth }) {
    const { username, password } = request.all()
    console.log(auth.remember)
    // const ret = await auth.attempt(username, password)
    response.redirect('/admin')
    // console.log(ret)
    // return ret
  }
}

module.exports = UserController
