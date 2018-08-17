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

Factory.blueprint('App/Models/Page', (faker) => {
  return {
    admin_title: Mock.mock('@sentence(3)'),

    title: Mock.mock('@sentence(2)'),
    description: Mock.mock('@paragraph(2)'),
    keywords: Mock.mock('@sentence(2)'),

    type: Mock.mock('@integer(1, 3)'),

    start_time: Mock.mock('@datetime()'),
    end_time: Mock.mock('@datetime()'),
  }
})
