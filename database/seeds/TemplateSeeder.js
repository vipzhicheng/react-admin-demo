'use strict'

/*
|--------------------------------------------------------------------------
| TemplateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class TemplateSeeder {
  async run() {
    await use('App/Models/Template').truncate()
    await Factory.model('App/Models/Template').createMany(2)
  }
}

module.exports = TemplateSeeder
