'use strict'

/*
|--------------------------------------------------------------------------
| PageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class PageSeeder {
  async run () {
    await Factory
      .model('App/Models/Page')
      .createMany(100)
  }
}

module.exports = PageSeeder
