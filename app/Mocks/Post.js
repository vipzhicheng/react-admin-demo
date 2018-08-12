const Mock = require('mockjs')
const _ = require('lodash')

module.exports = {
  index({ request, response, params }) {
    const total = 100
    const [field, sort] = request.input('sort')
      ? JSON.parse(request.input('sort'))
      : []
    let [offset, perPage] = request.input('range')
      ? JSON.parse(request.input('range'))
      : []
    let id = sort == 'DESC' ? 100 : 1

    return {
      data: [...Array(total).keys()]
        .map(() => {
          return {
            id: Mock.mock(function() {
              return sort == 'DESC' ? id-- : id++
            }),
            title: Mock.mock('@sentence(3)'),
            body: Mock.mock('@paragraph(2)')
          }
        })
        .slice(offset, offset + perPage),
      total
    }
  }
}
