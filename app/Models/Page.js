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

  media() {
    return this.hasMany('App/Models/Media')
  }
}

module.exports = Page
