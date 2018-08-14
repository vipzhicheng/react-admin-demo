'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')
const Hash = use('Hash')

class DatabaseSeeder {
  async run() {
    await User.create({
      username: 'admin',
      email: 'admin@admin.com',
      password: await Hash.make('admin')
    })
  }
}

module.exports = DatabaseSeeder
