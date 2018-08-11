const Mock = require('mockjs')

module.exports = {
  index({ request }) {
    const total = 100
    let id = 1
    return {
      data: [...Array(total).keys()].map(() => {
        return {
          id: Mock.mock(function() {
            return id++
          }),
          title: Mock.mock('@sentence(5)'),
          body: Mock.mock('@paragraph')
        }
      }),
      total
    }
  }
}
