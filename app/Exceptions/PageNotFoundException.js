'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class PageNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = PageNotFoundException
