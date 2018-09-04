'use strict'

const Schema = use('Schema')

class TemplateSchema extends Schema {
  up() {
    this.create('templates', table => {
      table.increments()

      // 页面后台标题
      table.string('name', 100) // 模板名称
      table.string('status', 1) // 0 未发布， 1 已发布

      // data
      table.jsonb('json')

      table.timestamps()
    })
  }

  down() {
    this.drop('templates')
  }
}

module.exports = TemplateSchema
