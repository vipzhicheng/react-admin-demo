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

class UserSeeder {
  async run() {
    await use('App/Models/User').truncate()
    await User.create({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      status: '1'
    })
    await Factory.model('App/Models/User').createMany(100)
  }
}

module.exports = UserSeeder
