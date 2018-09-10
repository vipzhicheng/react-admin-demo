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
      table.string('reference_id') // 关联ID
      table.string('reference_type') // 关联类型，page or template
      table.timestamps()
    })
  }

  down() {
    this.drop('media')
  }
}

module.exports = MediaSchema
