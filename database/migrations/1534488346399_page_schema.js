'use strict'

const Schema = use('Schema')

class PageSchema extends Schema {
  up() {
    this.create('pages', table => {
      table.increments()

      // 页面后台标题
      table.string('admin_title', 100)
      table.string('path') // 统一到访/page/段下

      // 分类
      table.integer('type', 1)
      table.integer('status', 1) // 0 未发布， 1 已发布 2 待审核

      // TDK
      table.string('title', 100) // 默认和页面后台标题一致
      table.string('description')
      table.string('keywords')

      // Time
      table.dateTime('start_time')
      table.dateTime('end_time')

      // data
      table.jsonb('json')
      table.text('output')

      table.timestamps()
    })
  }

  down() {
    this.drop('pages')
  }
}

module.exports = PageSchema
