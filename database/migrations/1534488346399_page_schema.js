'use strict'

const Schema = use('Schema')

class PageSchema extends Schema {
  up () {
    this.create('pages', (table) => {
      table.increments()

      // 页面后台标题
      table.string('admin_title', 100)

      // 分类
      table.integer('type', 1)

      // TDK
      table.string('title', 100) // 默认和页面后台标题一致
      table.string('description')
      table.string('keywords')

      // Time
      table.dateTime('start_time')
      table.dateTime('end_time')

      // data
      table.string('json')

      table.timestamps()
    })
  }

  down () {
    this.drop('pages')
  }
}

module.exports = PageSchema
