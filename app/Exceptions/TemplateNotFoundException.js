'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class TemplateNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = TemplateNotFoundException
