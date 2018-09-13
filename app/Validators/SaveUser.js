'use strict'
const ValidationException = use('App/Exceptions/ValidationException')

class SaveUser {
  get rules() {
    const params = this.ctx.params
    return {
      email: `required|email|unique:users,email,id,${params.id}`,
      password: 'required'
    }
  }

  async fails(errorMessages) {
    throw new ValidationException(errorMessages)
    // return this.ctx.response.status(500).send(errorMessages)
  }
}

module.exports = SaveUser
