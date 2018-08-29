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
    // const password = await Hash.make('admin')
    // console.log(password)
    // await User.truncate()
    await User.create({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin'
    })
  }
}

module.exports = DatabaseSeeder
