const Mock = require('mockjs')

module.exports = {
  index({ request, response, params }) {
    const total = 100
    const [field, sort] = request.input('sort')
    const [offset, limit] = request.input('range')
    let id = sort == 'DESC' ? 100 : 1
    return {
      data: [...Array(total).keys()].map(() => {
        return {
          id: Mock.mock(function() {
            return sort == 'DESC' ? id-- : id++
          }),
          title: Mock.mock('@sentence(5)'),
          body: Mock.mock('@paragraph')
        }
      }),
      total
    }
  }
}
