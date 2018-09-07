'use strict'

const Schema = use('Schema')

class MediaSchema extends Schema {
  up() {
    this.create('media', table => {
      table.increments()
      table.string('client_name')
      table.string('extname')
      table.string('file_name')
      table.integer('size')
      table.string('type')
      table.string('subtype')
      table.string('page_id')
      table.timestamps()
    })
  }

  down() {
    this.drop('media')
  }
}

module.exports = MediaSchema
