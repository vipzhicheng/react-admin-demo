'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Mock = require('mockjs')
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/Page', faker => {
  const row = {
    admin_title: Mock.mock('@sentence(3)'),
    path: Mock.mock('@string("lower", 5)'),

    title: Mock.mock('@sentence(2)'),
    description: Mock.mock('@paragraph(1)'),
    keywords: Mock.mock('@sentence(2)'),

    type: `${Mock.mock('@integer(1, 3)')}`,
    status: `${Mock.mock('@integer(0, 2)')}`,
    is_template: `${Mock.mock('@integer(0, 1)')}`,

    start_time: Mock.mock('@datetime()'),
    end_time: Mock.mock('@datetime()'),

    enable_meiqia: `${Mock.mock('@integer(0, 1)')}`,
    enable_sensor_analytics: `${Mock.mock('@integer(0, 1)')}`,
    enable_baidu_analytics: `${Mock.mock('@integer(0, 1)')}`,
    enable_growingio_analytics: `${Mock.mock('@integer(0, 1)')}`,
    enable_cps: `${Mock.mock('@integer(0, 1)')}`
  }
  return row
})

Factory.blueprint('App/Models/Template', faker => {
  const row = {
    name: Mock.mock('@sentence(3)'),
    status: `${Mock.mock('@integer(0, 1)')}`
  }
  return row
})

const password = Hash.make(Mock.mock('@sentence(1)'))
Factory.blueprint('App/Models/User', faker => {
  const row = {
    username: Mock.mock('@sentence(1)'),
    email: Mock.mock('@email'),
    password,
    status: `${Mock.mock('@integer(0, 1)')}`
  }
  return row
})
