'use strict'

const Model = use('Model')

class Page extends Model {
  static boot() {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'path' },
      strategy: 'dbIncrement',
      disableUpdates: false
    })
  }
}

module.exports = Page
