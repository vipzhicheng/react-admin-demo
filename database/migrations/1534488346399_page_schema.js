'use strict'

const Schema = use('Schema')

class PageSchema extends Schema {
  up() {
    this.create('pages', table => {
      table.increments()

      // 页面后台标题
      table.string('admin_title', 100)
      table.string('path') // 统一到访/page/段下
      table.string('slug')

      // 分类
      table.string('type', 1)
      table.string('status', 1) // 0 未发布， 1 已发布 2 待审核
      table.string('is_template', 1) // 0 不是 1 是

      // TDK
      table.string('title', 100) // 默认和页面后台标题一致
      table.string('description')
      table.string('keywords')

      // Time
      table.dateTime('start_time')
      table.dateTime('end_time')

      // data
      table.jsonb('json')
      table.integer('template_id')

      // Switches
      table.integer('enable_meiqia', 1) // 美洽
      table.integer('enable_sensor_analytics', 1) // 神策打点
      table.integer('enable_baidu_analytics', 1) // 百度统计
      table.integer('enable_growingio_analytics', 1) // 百度统计
      table.integer('enable_cps', 1) // 百度统计

      table.timestamps()
    })
  }

  down() {
    this.drop('pages')
  }
}

module.exports = PageSchema
